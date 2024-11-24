import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white text-black py-4 sticky top-0 ">
      <nav className="container mx-auto flex justify-center justify-evenly">
        <Link to="/" className="hover:text-secondary"><img src="public/kubiki.png" alt="Logo" className="mx-auto  w-6 h-7" /></Link>
        <Link to="/about" className="hover:text-secondary lato">О проекте</Link>
        <Link to="/services" className="hover:text-secondary lato">Услуги</Link>
        <Link to="/Forum" className="hover:text-secondary lato">Форум</Link>
        <Link to="/chat" className="hover:text-secondary lato">Чат</Link>
        <Link to="/account" className=""><img src="/user.svg" alt="Logo" className="  w-6 h-7" /></Link>
        
      </nav>
    </header>
  );
};

export default Header;