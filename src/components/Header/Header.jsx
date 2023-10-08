import { Link } from 'react-router-dom';
import './Header.scss';
import { useEffect, useState } from 'react';

export const Header = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  
    if (isBurgerOpen) {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    } else {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = () => {
    if (window.innerWidth >= 500 && isBurgerOpen) {
      setIsBurgerOpen(false);
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  };
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, isBurgerOpen]);
  
  const closeBurgerMenu = () => {
    if (isBurgerOpen) {
      toggleBurgerMenu();
    }
  };

  return (
    <header>
      <div className="burger-button" onClick={toggleBurgerMenu}>
        {!isBurgerOpen ? (
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18L20 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 12L20 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 6L20 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="30px" height="30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
        )}
        
      </div>
      <nav className={`${isBurgerOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={closeBurgerMenu}>Home</Link>
          </li>
          <li>
            <Link to="task1" onClick={closeBurgerMenu}>Task1</Link>
          </li>
          <li>
            <Link to="task2" onClick={closeBurgerMenu}>Task2</Link>
          </li>
          <li>
            <Link to="task3" onClick={closeBurgerMenu}>Task3</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}