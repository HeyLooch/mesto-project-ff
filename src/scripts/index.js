import '../pages/index.css';
import {initialCards} from './initialCards.js'
import {createCard, deleteCard, likeCard} from './cards.js';
import {openModal, closeModal} from './modal.js';
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const formProfile = document.forms["edit-profile"];
const formProfileName = formProfile.querySelector('.popup__input_type_name');
const formProfileDescription = formProfile.querySelector('.popup__input_type_description');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formPlace = document.forms["new-place"];
const formPlaceName = formPlace.querySelector('.popup__input_type_card-name');
const formPlaceUrl = formPlace.querySelector('.popup__input_type_url');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');

const cardCreateArgs = {
  deleteCardFunc: deleteCard,
  likeCardFunc: likeCard,
  handleImageFunc: hendlerPopupImage
};

//рендерим карточки
initialCards.forEach(card => {
  renderCard(card);
});

//Слушаем кнопки
profileEditButton.addEventListener('click', () => {
  fillFormProfile();
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard);
});

//Вешаем обработчики закрытия и класс анимации на все попапы
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  })
});

//вешаем обработчики на формы
formProfile.addEventListener('submit', handleFormProfileSubmit);
formPlace.addEventListener('submit', handleFormCardSubmit);

//объявляем функцию рендера карточки
function renderCard(cardData, method = 'append') {
  const cardElement = createCard(cardData, cardCreateArgs);
  placesList[method](cardElement);
}

//объявляем функцию заполнения профиля
function fillFormProfile() {
  formProfileName.value = profileTitle.textContent;
  formProfileDescription.value = profileDescription.textContent;
}

//Объявляем обработчики сабмитов
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formProfileName.value;
  profileDescription.textContent = formProfileDescription.value;
  closeModal(popupTypeEdit);
}

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: formPlaceName.value,
    link: formPlaceUrl.value
  }
  renderCard(newCard, 'prepend');
  closeModal(popupTypeNewCard);
  formPlace.reset();
}

function hendlerPopupImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}