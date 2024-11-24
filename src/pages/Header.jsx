import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-main text-white py-4 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-center justify-evenly">
        <Link to="/about" className="hover:text-secondary">О проекте</Link>
        <Link to="/services" className="hover:text-secondary">Услуги</Link>
        <Link to="/Forum" className="hover:text-secondary">Форум</Link>
        <Link to="/chat" className="hover:text-secondary">Чат</Link>
      </nav>
    </header>
  );
};

export default Header;