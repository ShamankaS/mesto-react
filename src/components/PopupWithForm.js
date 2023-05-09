import React from 'react';

export default function PopupWithForm({ name, title, children, btnTxt, isOpen, onClose, onSubmit, isLoading, btnTxtLoading }) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_active' : null}`}>
      <div
        className="popup__container popup__container_type_form">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose} />
        <h2
          className="popup__title">
          {title}
        </h2>
        <form
          className="popup__form form"
          name={name}
          onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="form__submit">
            {isLoading ? (btnTxtLoading || 'Сохранение...') : (btnTxt || 'Сохранить')}
          </button>
        </form>
      </div>
    </div>
  )
}