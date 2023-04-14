import React from "react";

export default function Card({ card, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(card);
  }

  return (
    <li className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <button className="element__trash" type="button"></button>
      <div className="element__block">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-container">
          <button className="element__like" type="button"></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}