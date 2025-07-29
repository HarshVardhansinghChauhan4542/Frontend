import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="register-container">
      <div className="left-panel">
        <img
          src="https://images.unsplash.com/photo-1538943186303-104afadcbb16?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNoZXJyeSUyMGJsb3Nzb218ZW58MHx8MHx8fDA%3D"
          alt="Purple flower artwork"
          className="art-image"
        />
      </div>

      <div className="right-panel">
        <form className="register-form">
          <h2>Register</h2>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="you@example.com" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required />

          <button type="submit">Sign Up</button>

          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
