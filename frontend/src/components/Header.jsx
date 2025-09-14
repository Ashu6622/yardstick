import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function Header({ user, onLogout }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <>
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
                onClick={handleLogoutClick}
                className="btn btn-secondary btn-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}

export default Header;