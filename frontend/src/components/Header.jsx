import React from 'react';

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="header-title">Notes App</h1>
          <div className="header-info">
            <div className="user-info">
              <span className="user-name">{user?.email}</span>
              <span className="user-role">{user?.role} • {user?.tenant?.name}</span>
            </div>
            <button 
              onClick={onLogout}
              className="btn btn-secondary btn-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;