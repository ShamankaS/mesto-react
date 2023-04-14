import React, { useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

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

  React.useEffect(() => {
    document.addEventListener(keyEventType, handleEscKey, true);
    return () => {
      document.removeEventListener(keyEventType, handleEscKey, true);
    }
  });

  React.useEffect(() => {
    document.addEventListener(mouseEventType, handleClickOutside, true);
    return () => {
      document.removeEventListener(mouseEventType, handleClickOutside, true);
    };
  });

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />
        <PopupWithForm
          name='profile'
          title='Редактировать профиль'
          children={
            <>
              <label className="form__field">
                <input className="form__input" id="input_type_name" placeholder="Имя" name="fullname" required
                  minLength="2" maxLength="40" />
                <span className="form__input-error" id="error-input_type_name" name="error-input_type_name"></span>
              </label>
              <label className="form__field">
                <input className="form__input" id="input_type_intro" placeholder="О себе" name="job" required
                  minLength="2" maxLength="200" />
                <span className="form__input-error" id="error-input_type_intro" name="error-input_type_intro"></span>
              </label>
            </>
          }
          btnTxt='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name='card'
          title='Новое место'
          children={
            <>
              <label className="form__field">
                <input className="form__input" id="input_type_title" placeholder="Название" name="name" required
                  minLength="2" maxLength="30" />
                <span className="form__input-error" id="error-input_type_title"></span>
              </label>
              <label className="form__field">
                <input className="form__input" id="input_type_link" placeholder="Ссылка на картинку" name="link"
                  required type="url" />
                <span className="form__input-error" id="error-input_type_link"></span>
              </label>
            </>
          }
          btnTxt='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name='avatar'
          title='Обновить аватар'
          children={
            <>
              <label className="form__field">
                <input className="form__input" id="input_type_img-link" placeholder="Ссылка на изображение"
                  name="avatar" required type="url" />
                <span className="form__input-error" id="error-input_type_img-link"></span>
              </label>
            </>
          }
          btnTxt='Сохранить'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}