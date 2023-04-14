import React from 'react';

export default function PopupWithForm({ name, title, children, btnTxt, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_active' : null}`}>
      <div className="popup__container popup__container_type_form">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form form" name={name} noValidate>
          {children}
          <button type="submit" className="form__submit" disabled>{btnTxt}</button>
        </form>
      </div>
    </div>
  )
}