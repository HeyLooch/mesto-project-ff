import {deleteCardApi, toggleLikeApi} from './api.js';
import {hendleError} from './index.js';

export function createCard(cardData, parameters) {
  const {deleteCardFunc, likeCardFunc, handleImageFunc, currentId} = parameters;
  const cardTemplate = document.querySelector('#card-template');
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');  
  const isLike = {
    liked: cardData.likes.some(like => like._id === currentId)
  }

  cardImage.src = cardData.link;
  cardImage.alt = `Фото ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id === currentId) {
    deleteButton.classList.add('card__delete-button');
    deleteButton.addEventListener('click', () => deleteCardFunc(cardData._id, card));
  }

  if (isLike.liked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', (evt) => likeCardFunc(evt, currentId, cardData._id, likeCounter, isLike));

  cardImage.addEventListener('click', () => handleImageFunc(cardImage.src, cardImage.alt));

  return card;
}

export function deleteCard(cardId, card) {
  deleteCardApi(cardId) 
  .then(res => {
    card.remove();
  })
  .catch(hendleError);
}

export function likeCard(evt, currId, cardId, likeCounterElement, isLike) {
  toggleLikeApi(cardId, isLike.liked)
  .then(data => {
    evt.target.classList.toggle('card__like-button_is-active');
    likeCounterElement.textContent = data.likes.length;
    isLike.liked = data.likes.some(like => like._id === currId);
  })
  .catch(hendleError);
  }