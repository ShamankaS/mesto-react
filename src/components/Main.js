import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.getUserInfo();
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    } catch (evt) {
      console.warn(evt);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await api.getInitialCards();
      setCards(res);
    } catch (evt) {
      console.warn(evt);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCards();
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-block">
            <img className="profile__avatar" src={userAvatar} alt="Аватар" />
            <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__about">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__items">
          {
            cards.map((item) => (
              <Card
                card={item}
                key={item._id}
                onCardClick={onCardClick}
              />
            ))
          }
        </ul>
      </section>
    </main>
  );
};