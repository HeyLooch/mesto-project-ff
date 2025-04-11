export function createCard(cardData, parameters) {
  const {deleteCardFunc, likeCardFunc, handleImageFunc} = parameters;
  const cardTemplate = document.querySelector('#card-template');
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
  cardImage.addEventListener('click', () => handleImageFunc(cardImage.src, cardImage.alt));

  return card;
}

export function deleteCard(evt) {
  evt.remove();
 }

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}