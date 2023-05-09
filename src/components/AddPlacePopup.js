import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNameAdd = (evt) => {
    setName(evt.target.value);
  };

  const handleLinkAdd = (evt) => {
    setLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
  };

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      btnTxt={'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      btnTxtLoading={'Создание...'}>
      <label className="form__field">
        <input
          className="form__input"
          id="input_type_title"
          placeholder="Название"
          name="title"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameAdd}
        />
        <span className="form__input-error" id="error-input_type_title"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input"
          id="input_type_link"
          placeholder="Ссылка на картинку"
          name="link"
          required
          type="url"
          value={link}
          onChange={handleLinkAdd} />
        <span className="form__input-error" id="error-input_type_link"></span>
      </label>
    </PopupWithForm>
  )
}