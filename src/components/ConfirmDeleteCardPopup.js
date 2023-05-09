import React from "react";

export default function ConfirmDeleteCardPopup({ card, isOpen, onClose, onSubmit, isLoading }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(card);
  };

  return (
    <div
      className={`popup popup_type_card-delete ${isOpen ? 'popup_active' : null}`}>
      <div
        className='popup__container popup__container_type_card-delete'>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose} />
        <h2
          className="popup__title popup__title_type_card-delete">
          Вы уверены?
        </h2>
        <form
          className="popup__form form"
          name='card-delete'
          noValidate
          onSubmit={handleSubmit}>
          <button
            type="submit"
            className="form__submit form__submit_type_card-delete">
            {isLoading ? 'Сохранение...' : 'Да'}
          </button>
        </form>
      </div>
    </div>
  )

}