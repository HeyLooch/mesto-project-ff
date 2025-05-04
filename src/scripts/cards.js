import {deleteCardApi, toggleLikeApi} from './api.js';

export function createCard(cardData, parameters) {
  const {likeCardFunc, handleImageFunc, currentId} = parameters;
  const cardTemplate = document.querySelector('#card-template');
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');  
  let isLike = cardData.likes.some(like => like._id === currentId);

  cardImage.src = cardData.link;
  cardImage.alt = `Фото ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id === currentId) {
    deleteButton.classList.add('card__delete-button');
    // deleteButton.addEventListener('click', () => deleteCardFunc(card, cardData._id));
    deleteButton.addEventListener('click', () => {
      deleteCardApi(cardData._id) 
      .then(res => {
        card.remove();
      });
    });
  }

  if (isLike) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', (evt) => likeCardFunc(evt, currentId, cardData._id, likeCounter, isLike)
    //тут закомменчен рабочий способ
    // toggleLikeApi(cardData._id, isLike)
    // .then(data => {
    //   evt.target.classList.toggle('card__like-button_is-active');
    //   likeCounter.textContent = data.likes.length;
    //   isLike = data.likes.some(like => like._id === currentId);
    // })
  );

  cardImage.addEventListener('click', () => handleImageFunc(cardImage.src, cardImage.alt));

  return card;
}


export function likeCard(evt, currId, cardId, likeCounterElement, isLike) {
  console.log(evt.target);
  console.log(isLike);
  
  toggleLikeApi(cardId, isLike)
  .then(data => {
    evt.target.classList.toggle('card__like-button_is-active');
    likeCounterElement.textContent = data.likes.length;
    isLike = data.likes.some(like => like._id === currId);
    
    console.log(evt.target);
    console.log(isLike);
    console.log(data);
  });
  }

  // export function deleteCard(card, cardId) {
  //   deleteCardApi(cardId)
  //   .then(res => {
  //     card.remove();
  //   });
  // }