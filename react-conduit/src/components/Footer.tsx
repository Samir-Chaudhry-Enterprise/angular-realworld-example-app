import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <Link className="logo-font" to="/">
          conduit
        </Link>
        <span className="attribution">
          &copy; {currentYear}. An interactive learning project from{' '}
          <a href="https://github.com/gothinkster/realworld">
            RealWorld OSS Project
          </a>
          . Code licensed under MIT.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
