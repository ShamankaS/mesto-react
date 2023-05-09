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
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup.js';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoadingEditProfileStart, setIsLoadingEditProfileStart] = useState(false);
  const [isLoadingAddPlaceStart, setIsLoadingAddPlaceStart] = useState(false);
  const [isLoadingEditAvatarStart, setIsLoadingEditAvatarStart] = useState(false);
  const [isConfirmDeleteCardPopupopen, setIsConfirmDeleteCardPopupopen] = useState(false);
  const [isLoadingDeleteCardStart, setIsLoadingDeleteCardStart] = useState(false);

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

  function handleConfirmDeleleCardClick(data) {
    setSelectedCard(data);
    setIsConfirmDeleteCardPopupopen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardPopupOpen(false);
    setIsConfirmDeleteCardPopupopen(false);
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

  const anyPopupOpen = isAddPlacePopupOpen || isCardPopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isConfirmDeleteCardPopupopen;

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
    setIsLoadingDeleteCardStart(true);
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter(item => item._id !== card._id));
      closeAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDeleteCardStart(false);
    }
  };

  const handleUpdateUser = async (data) => {
    setIsLoadingEditProfileStart(true);
    try {
      const res = await api.setUserInfo(data);
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoadingEditProfileStart(false);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      setIsLoadingEditAvatarStart(true);
      const res = await api.changeAvatar(data);
      setCurrentUser(res);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoadingEditAvatarStart(false);
    }
  };

  const handleAddPlaceSubmit = async (data) => {
    setIsLoadingAddPlaceStart(true);
    try {
      const res = await api.addNewCard(data);
      setCards([res, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoadingAddPlaceStart(false);
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
          onCardDelete={handleConfirmDeleleCardClick} />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoadingEditProfileStart} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoadingAddPlaceStart} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoadingEditAvatarStart} />
        <ImagePopup
          card={selectedCard}
          isOpen={isCardPopupOpen}
          onClose={closeAllPopups} />
        <ConfirmDeleteCardPopup
          name={'card-delete'}
          isOpen={isConfirmDeleteCardPopupopen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isLoadingDeleteCardStart}
          card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}