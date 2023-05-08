import React from 'react';

export default function ImagePopup({ card, isOpen, onClose }) {
  const imagePopupClassName = (`popup popup_type_picture ${isOpen && 'popup_active'}`);

  return (
    <div className={imagePopupClassName}>
      <div className="popup__container popup__container_type_picture">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}