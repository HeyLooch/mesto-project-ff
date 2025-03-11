const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

function createCard(cardData, deleteCardFunc) {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = `Фото ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => deleteCardFunc(card));

  return card;
}

function deleteCard(pickedCard) {
  pickedCard.remove();
 }

 initialCards.forEach(card => {
  placesList.append(createCard(card, deleteCard));
 });
