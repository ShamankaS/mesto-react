import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.getUserInfo();
      setCurrentUser(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await api.getInitialCards();
      setCards(res);
      console.log(res);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCards();
  }, []);

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
  };

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
  };

  const handleCardLikeClick = async (card) => {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    try {
      const res = await api.changeLikeCardStatus(card, !isLiked);
      setCards((state) => state.map(item => item._id === card._id ? res : item));
    } catch (error) {
      console.warn(error);
    }
  };

  // const handleDeleteClick = async (card) => {
  //   try {
  //     await api.deleteCard(card._id);
  //     setCards(cards => cards.filter((c) => c._id !== card._id));
  //     closeAllPopups();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleUpdateUser = async (data) => {
    try {
      const res = await api.setUserInfo(data);
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLikeClick} />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        {/* <PopupWithForm
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
        </PopupWithForm> */}
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
    </CurrentUserContext.Provider>
  );
}