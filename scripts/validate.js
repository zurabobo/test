//конфигуратор
const formConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-text',
    submitButtonSelector: '.popup__form-btn',
    inactiveButtonClass: 'popup__form-btn_disabled',
    inputErrorClass: 'popup__form-text_type_error',
    errorClass: 'popup__form-text-error_visible'
};

const toggleButtonState = (inputList, buttonElement, formConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(formConfig.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(formConfig.inactiveButtonClass);
    }
};

const showInputError = (formElement, inputElement, errorMessage, formConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(formConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formConfig.errorClass);
};

const hideInputError = (formElement, inputElement, formConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formConfig.inputErrorClass);
    errorElement.classList.remove(formConfig.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formConfig) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formConfig);
    } else {
        hideInputError(formElement, inputElement, formConfig);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const resetErrorMessage = () => {
    const formInput = Array.from(document.querySelectorAll(formConfig.inputSelector));
    const errorElement = Array.from(document.querySelectorAll('.popup__form-text-error')); 
    formInput.forEach((inputElement) => {
        inputElement.classList.remove(formConfig.inputErrorClass);
    })
    
    errorElement.forEach((element) => {
        element.textContent = '';
    })  
}

const setEventListeners = (formElement, formConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
    const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, formConfig);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, formConfig);
            toggleButtonState(inputList, buttonElement, formConfig);
        });
    });
};

const enableValidation = (formConfig) => {
    const formList = Array.from(document.querySelectorAll(formConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, formConfig);
    });
};

enableValidation(formConfig);