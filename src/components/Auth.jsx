// src/components/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.email || !formData.password || (isSignUp && !formData.name)) {
      alert("Please fill in all required fields.");
      return;
    }
    // For demonstration, we simply navigate to the employee registration page.
    // In a real project, you would authenticate the user with a backend.
    navigate('/register-employee');
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your name"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <div className="mt-4 text-center">
        {isSignUp ? (
          <p>
            Already have an account?{' '}
            <button className="text-blue-500" onClick={() => setIsSignUp(false)}>
              Sign In
            </button>
          </p>
        ) : (
          <p>
            New user?{' '}
            <button className="text-blue-500" onClick={() => setIsSignUp(true)}>
              Sign Up
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
