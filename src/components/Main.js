import React, { useState, useEffect } from 'react';
import {api} from '../utils/Api.js';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar}) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  const fetchData = async() => {
    try {
      const res = await api.getUserInfo();
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    } catch (evt) {
      console.warn(evt);
    }
  };

  React.useEffect(() => {
    fetchData();
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
      </section>
    </main>
  );
};