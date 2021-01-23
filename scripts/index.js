const profile = document.querySelector('.profile');
const editInfoButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const profileEdit = document.querySelector('.popup_type_edit-profile');
const profileForm = profileEdit.querySelector('.popup_type_edit-profile-form');
const infoPopupCloseButton = profileEdit.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__text_type_name');
const aboutInput = document.querySelector('.popup__text_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addCardButton = profile.querySelector('.profile__add-button');
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const cardPopup = document.querySelector('.popup_type_add-card');
const cardForm = cardPopup.querySelector('.popup__form_type_add-card');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button_type_add-card');
const cardHeading = cardPopup.querySelector('.popup__text_type_heading');
const cardImageLink = cardPopup.querySelector('.popup__text_type_link');
const image = document.querySelector('.popup_type_full-image');
const imagePopup = image.querySelector('.popup__full-image');
const imagePopupCloseButton = image.querySelector('.popup__close-button_type_full-image');
const imagePopupHeading = image.querySelector('.popup__full-image-heading');


//редактирование информации о пользователе.
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(popup);
};



// //Закрытие попапа нажатием на Esc
// document.addEventListener('keydown', (evt) => {
//     if(evt.keyCode == 27) {
//         closePopup(cardPopup);                      //es funqcia davamate 
//         closePopup(popup);
//         closePopup(image);
//     } 
//   }); 
//добавляем модификатор для открытие попапа карточки
function openPopup(cardPopup) {
    cardPopup.classList.add('popup_opened');
};




//добавляем модификатор для открытие попапа карточки
function openPopup(cardPopup) {
    cardPopup.classList.add('popup_opened');
};

//удаляем модификатор для закрытие попапа профиля
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

initialCards.forEach((cardElement) => {
    renderCard(cardElement, cards);
});

//добавляем карточки в index.html  
function renderCard(cardElement, cards) {
    cards.prepend(createCard(cardElement));
}

//создаем карточки из шаблона template
function createCard(element) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardImage.addEventListener('click', () => handlePreviewPicture(element));

    cardElement.querySelector('.card__delete').addEventListener('click', handleDeleteCard);

    cardElement.querySelector('.card__like').addEventListener('click', handleLikeButton);

    cardElement.querySelector('.card__heading').textContent = element.name;

    return cardElement;
};

// Удаление карточки
function handleDeleteCard(evt) {
    evt.target.closest('.card').remove();
};

//лайк карточек
function handleLikeButton(evt) {
    evt.target.classList.toggle('card__like_active');
};

//открытие картинки в большом размере(попап картинки)
function handlePreviewPicture(element) {
    imagePopup.src = element.link;
    imagePopup.alt = element.name;
    imagePopupHeading.textContent = element.name;
    openPopup(image);
};

//Добавляем в массив новые свойство новыми значениями
function cardFormSubmitHandler(evt) {
    evt.preventDefault();

    const newCardTitle = cardHeading.value;
    const newCardLink = cardImageLink.value;
    const newElement = {
        name: newCardTitle,
        link: newCardLink,
    };

    renderCard(newElement, cards);
    cardForm.reset();
    closePopup(cardPopup);
};

//открытие попапа редактирование профиля
editInfoButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    openPopup(popup);
});

//закрытие попапа профиля
infoPopupCloseButton.addEventListener('click', () => {
    closePopup(popup);
});

//отправка формы профиля
profileForm.addEventListener('submit', formSubmitHandler);

//отправка формы карточки
cardForm.addEventListener('submit', cardFormSubmitHandler);

//открытие попапа добавление карточки
addCardButton.addEventListener('click', () => {
    openPopup(cardPopup);
});

//закрытие попапа карточки
cardPopupCloseButton.addEventListener('click', () => {
    closePopup(cardPopup);
});

//закрытие попапа картинки
imagePopupCloseButton.addEventListener('click', () => {
    closePopup(image);
});