import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../App';

const Header: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        {!isAuthenticated ? (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/login') ? 'active' : ''}`} 
                to="/login"
              >
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/register') ? 'active' : ''}`} 
                to="/register"
              >
                Sign up
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/', true) ? 'active' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/editor') ? 'active' : ''}`} 
                to="/editor"
              >
                <i className="ion-compose"></i>&nbsp;New Article
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/settings') ? 'active' : ''}`} 
                to="/settings"
              >
                <i className="ion-gear-a"></i>&nbsp;Settings
              </Link>
            </li>
            {currentUser && (
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive(`/profile/${currentUser.username}`) ? 'active' : ''}`} 
                  to={`/profile/${currentUser.username}`}
                >
                  {currentUser.image && (
                    <img src={currentUser.image} className="user-pic" alt={currentUser.username} />
                  )}
                  {currentUser.username}
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
