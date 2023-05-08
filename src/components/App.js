import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

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
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await api.getInitialCards();
      setCards(res);
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

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter(item => item._id !== card._id));
      closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async (data) => {
    try {
      const res = await api.setUserInfo(data);
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const res = await api.changeAvatar(data);
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    }
  };

  const handleAddPlaceSubmit = async (data) => {
    try {
      const res = await api.addNewCard(data);
      setCards([res, ...cards]);
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
          onCardLike={handleCardLikeClick}
          onCardDelete={handleCardDelete} />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup
          card={selectedCard}
          isOpen={isCardPopupOpen}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}