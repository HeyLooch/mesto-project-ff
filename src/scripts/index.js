import '../pages/index.css';
import {initialCards, createCard, deleteCard, likeCard, hendlerPopupImage} from './cards.js';
import {openModal, closeModal} from './modal.js';
const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const formProfile = document.querySelector('[name="edit-profile"]');
const formProfileName = formProfile.querySelector('.popup__input_type_name');
const formProfileDescription = formProfile.querySelector('.popup__input_type_description');

const formPlace = document.querySelector('[name="new-place"]');
const formPlaceName = document.querySelector('.popup__input_type_card-name');
const formPlaceUrl = document.querySelector('.popup__input_type_url');

popups.forEach((popup) => popup.classList.add('popup_is-animated'));

initialCards.forEach(card => {
  placesList.append(createCard(card, deleteCard, likeCard, hendlerPopupImage));
});

profileEditButton.addEventListener('click', () => {
  formProfileName.value = profileTitle.textContent;
  formProfileDescription.value = profileDescription.textContent;
  openModal(popupTypeEdit);
  formProfile.addEventListener('submit', handleFormProfileSubmit); 
  closeModal (popupTypeEdit);
});

profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard);
  formPlace.addEventListener('submit', handleFormProfileSubmit); 
  closeModal (popupTypeNewCard);
});

//Обработчик submit сразу для двух форм
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const isPopupEdit = evt.target.closest('[name="edit-profile"]');
  const isPopupPlace = evt.target.closest('[name="new-place"]');
  if (isPopupEdit) {
    profileTitle.textContent = formProfileName.value;
    profileDescription.textContent = formProfileDescription.value;
  }
  if (isPopupPlace) {
    const newCard = {
      name: formPlaceName.value,
      link: formPlaceUrl.value
    }
    placesList.prepend(createCard(newCard, deleteCard, likeCard, hendlerPopupImage));
  }
  closeModal (popupTypeEdit);
  formPlace.reset();
  evt.target.closest('.popup__form').removeEventListener('submit', handleFormProfileSubmit);
}