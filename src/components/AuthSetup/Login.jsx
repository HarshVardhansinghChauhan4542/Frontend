import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="left-panel">
        <img
          src="https://images.unsplash.com/photo-1538943186303-104afadcbb16?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNoZXJyeSUyMGJsb3Nzb218ZW58MHx8MHx8fDA%3D"
          alt="Purple flower artwork"
          className="art-image"
        />
      </div>

      <div className="right-panel">
        <form className="login-form">
          <h2>Login</h2>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="you@example.com" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required />

          <button type="submit">Login</button>

          <p className="register-text">
            Not registered? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
