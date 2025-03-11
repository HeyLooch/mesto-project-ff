const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

function createCard(incomingArr) {
  const card = cardTemplate.content.cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');

  card.querySelector('.card__image').src = incomingArr.link;
  card.querySelector('.card__description').querySelector('.card__title').textContent = incomingArr.name;

  deleteButton.addEventListener('click', event => deleteCard(event));

  placesList.append(card);
}

function deleteCard(pickedCard) {
  pickedCard.target.closest('.card').remove();
 }

for (let i = 0; i < initialCards.length; i++) {
  createCard(initialCards[i]);
}