import React, { useState } from 'react';
import { toast } from 'react-toastify';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = 'http://localhost:5001/api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
        toast.success('Login successful!');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (testEmail) => {
    setEmail(testEmail);
    setPassword('password');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Notes App</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '1rem', padding: '0.8rem', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <h4 style={{ marginBottom: '0.6rem', color: '#333', fontSize: '0.9rem' }}>Test Accounts:</h4>
          <div style={{ display: 'grid', gap: '0.3rem', fontSize: '0.75rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              onClick={() => quickLogin('admin@acme.test')}
            >
              admin@acme.test (Admin)
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              onClick={() => quickLogin('user@acme.test')}
            >
              user@acme.test (Member)
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              onClick={() => quickLogin('admin@globex.test')}
            >
              admin@globex.test (Admin)
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              onClick={() => quickLogin('user@globex.test')}
            >
              user@globex.test (Member)
            </button>
          </div>
          <p style={{ marginTop: '0.3rem', fontSize: '0.7rem', color: '#666' }}>
            Password: "password"
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;