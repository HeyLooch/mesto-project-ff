export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');

  function hendlerEscape(evt) {
    if (evt.key === 'Escape') {
      closeModal(popupElement);
    }
  }
  document.addEventListener('keydown', hendlerEscape);
  openModal.hendlerEsc = hendlerEscape;
}

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', openModal.hendlerEsc);
  delete openModal.hendlerEsc;
}