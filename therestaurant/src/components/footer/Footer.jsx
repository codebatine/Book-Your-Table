import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/booking'}>Booking</NavLink>
        <NavLink to={'/admin'}>Admin</NavLink>
        <NavLink to={'/contact'}>Contact</NavLink>
      </div>
      <div className="social-links">
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
      </div>
    </footer>
  );
};