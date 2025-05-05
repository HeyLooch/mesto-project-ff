import '../pages/index.css';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUserDataApi, updateProfileApi, getInitialCardsApi, postCardApi, updateAvatarApi} from './api.js';

const placesList = document.querySelector('.places__list');
const profileImageContainer = document.querySelector('.profile__image-container')
const profileImage = document.querySelector('.profile__image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddPlaceButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');

const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms["edit-avatar"];
const formAvatarUrl = formAvatar.querySelector('.popup__input_type_url');
const formAvatarSubmitButton = formAvatar.querySelector('.popup__button');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const formProfile = document.forms["edit-profile"];
const formProfileName = formProfile.querySelector('.popup__input_type_name');
const formProfileDescription = formProfile.querySelector('.popup__input_type_description');
const formProfileSubmitButton = formProfile.querySelector('.popup__button');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formPlace = document.forms["new-place"];
const formPlaceName = formPlace.querySelector('.popup__input_type_card-name');
const formPlaceUrl = formPlace.querySelector('.popup__input_type_url');
const formPlaceSubmitButton = formPlace.querySelector('.popup__button');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');

const cardCreateArgs = {
    deleteCardFunc: deleteCard,
    likeCardFunc: likeCard,
    handleImageFunc: hendlerPopupImage,
  };

const validationConfigClear =  {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  popupErrorClass: '.popup__error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled'
}

//заполняем профиль данными с сервера и передаем свой id в cardCreateArgs,
//рендерим карточки
Promise.all([getUserDataApi(), getInitialCardsApi()])
.then(([userData, cardArray]) => {
  const userId = userData._id;
  cardCreateArgs.currentId = userId;

  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.src = userData.avatar;

  cardArray.forEach((card) => {
    renderCard(card, cardCreateArgs);
  });
})
.catch(hendleError);

//Слушаем кнопки
profileImageContainer.addEventListener('click', (evt) => {
  clearValidation(formAvatar, validationConfigClear);
  formAvatarUrl.value = profileImage.src;
  fillSubmitButton(formAvatarSubmitButton);
  openModal(popupTypeAvatar);
});

profileEditButton.addEventListener('click', (evt) => {
  clearValidation(formProfile, validationConfigClear);
  formProfileName.value = profileTitle.textContent;
  formProfileDescription.value = profileDescription.textContent;
  fillSubmitButton(formProfileSubmitButton);
  openModal(popupTypeEdit);
});

profileAddPlaceButton.addEventListener('click', (evt) => {
  formPlace.reset();
  clearValidation(formPlace, validationConfigClear);
  fillSubmitButton(formPlaceSubmitButton);
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
formAvatar.addEventListener('submit', handleFormAvatarSubmit);
formProfile.addEventListener('submit', handleFormProfileSubmit);
formPlace.addEventListener('submit', handleFormNewCardSubmit);

//объявляем функцию-обработчик ошибки в блоке catch
export function hendleError(err) {
  return console.error('Ошибка загрузки данных:', err);
}

//объявляем функцию рендера карточки
function renderCard(cardData, cardCreateArgs, method = 'append') {
  const cardElement = createCard(cardData, cardCreateArgs);
  placesList[method](cardElement);
}

//объявляем функцию заполнения профиля
function fillSubmitButton(button) {
  button.textContent = 'Сохранить';
}

//Объявляем обработчики сабмитов
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  formAvatarSubmitButton.textContent = '...';

  updateAvatarApi(formAvatarUrl.value)
  .then(updatedProfile => {
  profileImage.src = formAvatarUrl.value;
  closeModal(popupTypeAvatar);
  })
  .catch(hendleError);
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  formProfileSubmitButton.textContent = '...';

  updateProfileApi(formProfileName.value, formProfileDescription.value)
  .then(updatedProfile => {
    profileTitle.textContent = formProfileName.value;
    profileDescription.textContent = formProfileDescription.value;
    closeModal(popupTypeEdit);
  })
  .catch(hendleError);
}

function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  formPlaceSubmitButton.textContent = '...';
  const newCard = {
    name: formPlaceName.value,
    link: formPlaceUrl.value
  }
  postCardApi(newCard)
  .then(newCard => {
    placesList.prepend(createCard(newCard, cardCreateArgs));
    closeModal(popupTypeNewCard);
    clearValidation(formPlace, validationConfigClear);
    formPlace.reset();
  })
  .catch(hendleError);
}

function hendlerPopupImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

//включаем валидацию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});