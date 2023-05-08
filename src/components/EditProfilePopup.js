import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProdilePopup({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="form__field">
        <input
          className="form__input"
          id="input_type_name"
          placeholder="Имя"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="form__input-error" id="error-input_type_name" name="error-input_type_name"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input"
          id="input_type_about"
          placeholder="О себе"
          name="about"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="form__input-error" id="error-input_type_about" name="error-input_type_about"></span>
      </label>
    </PopupWithForm>
  )
}