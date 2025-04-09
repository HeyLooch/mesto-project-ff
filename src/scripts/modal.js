export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
}

export function closeModal(popupElement) {
  popupElement.addEventListener('click', (evt) => {
    const condition = evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__button');
    if (condition) {
      popupElement.classList.remove('popup_is-opened');
    }
  });
  document.addEventListener('keyup', (evt) => {
    if (evt.key === "Escape") {
      popupElement.classList.remove('popup_is-opened');
    }
  });
}