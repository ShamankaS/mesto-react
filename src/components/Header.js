import React from 'react';
import logoPath from '../blocks/header/__logo/header__logo.svg';

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="логотип Mesto" />
    </header>
  );
};