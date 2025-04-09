const cardTemplate = document.querySelector('#card-template');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
import {openModal, closeModal} from './modal.js';

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
     name: "Челябинская область",
     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

export function createCard(cardData, deleteCardFunc, likeCardFunc, handlerImageFunc) {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = `Фото ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => deleteCardFunc(card));
  likeButton.addEventListener('click', likeCardFunc);
  cardImage.addEventListener('click', (evt) => handlerImageFunc(evt, popupImage));

  return card;
}

export function deleteCard(evt) {
  evt.remove();
 }

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function hendlerPopupImage(evt, popupImageElement) {
    popupImageElement.src = '';
    popupImageElement.alt = '';
    popupImageElement.src = evt.target.src;
    popupImageElement.alt = evt.target.alt;
    openModal(popupTypeImage);
    closeModal(popupTypeImage);
}