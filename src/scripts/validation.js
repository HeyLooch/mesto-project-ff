export function clearValidation(formElement, validationConfig) {
  const inputElements = formElement.querySelectorAll(validationConfig.inputSelector);
  const errorPopups = formElement.querySelectorAll(validationConfig.popupErrorClass);
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

  inputElements.forEach((inputElement) => {
    inputElement.classList.remove(validationConfig.inputErrorClass);
  });
  errorPopups.forEach((errorPopup) => {
    errorPopup.textContent = '';
    errorPopup.classList.remove(validationConfig.errorClass);
  })
  submitButton.disabled = true;
  submitButton.classList.add(validationConfig.inactiveButtonClass);
}

export function enableValidation(validationConfig) {
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorPopup = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorPopup.textContent = errorMessage;
    errorPopup.classList.add(validationConfig.errorClass);
  }
  
  const hideInputError = (formElement, inputElement) => {
    const errorPopup = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorPopup.textContent = '';
    errorPopup.classList.remove(validationConfig.errorClass);
  }

  const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
  
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }; 

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}