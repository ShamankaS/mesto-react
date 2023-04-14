import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';


export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardPopupOpen(false);
  }

  const mouseEventType = 'click';
  const keyNameEsc = 'Escape';
  const keyEventType = 'keydown';
  const openPopupSelector = 'popup_active';

  const handleEscKey = (evt) => {
    if (evt.key === keyNameEsc) {
      closeAllPopups();
    }
  };

  const handleClickOutside = (evt) => {
    if (evt.target.classList.contains(openPopupSelector)) {
      closeAllPopups();
    }
  };

  const anyPopupOpen = isAddPlacePopupOpen || isCardPopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen;
  useEffect(() => {
    if (anyPopupOpen) {
      document.addEventListener(keyEventType, handleEscKey, true);
      document.addEventListener(mouseEventType, handleClickOutside, true);
      return () => {
        document.removeEventListener(mouseEventType, handleClickOutside, true);
        document.removeEventListener(keyEventType, handleEscKey, true);
      }
    }
  }, [anyPopupOpen]);

  const handleCardClick = (data) => {
    setIsCardPopupOpen(true);
    setSelectedCard(data);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm
        name={'profile'}
        title={'Редактировать профиль'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <label className="form__field">
          <input className="form__input" id="input_type_name" placeholder="Имя" name="name" required
            minLength="2" maxLength="40" />
          <span className="form__input-error" id="error-input_type_name" name="error-input_type_name"></span>
        </label>
        <label className="form__field">
          <input className="form__input" id="input_type_about" placeholder="О себе" name="about" required
            minLength="2" maxLength="200" />
          <span className="form__input-error" id="error-input_type_about" name="error-input_type_about"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name={'card'}
        title={'Новое место'}
        btnTxt={'Создать'}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <label className="form__field">
          <input className="form__input" id="input_type_title" placeholder="Название" name="title" required
            minLength="2" maxLength="30" />
          <span className="form__input-error" id="error-input_type_title"></span>
        </label>
        <label className="form__field">
          <input className="form__input" id="input_type_link" placeholder="Ссылка на картинку" name="link"
            required type="url" />
          <span className="form__input-error" id="error-input_type_link"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name={'avatar'}
        title={'Обновить аватар'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <label className="form__field">
          <input className="form__input" id="input_type_avatar" placeholder="Ссылка на изображение"
            name="avatar" required type="url" />
          <span className="form__input-error" id="error-input_type_avatar"></span>
        </label>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        isOpen={isCardPopupOpen}
        onClose={closeAllPopups} />
    </div>
  );
}