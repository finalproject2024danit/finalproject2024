// import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      <nav className={styles.footer__nav}>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
