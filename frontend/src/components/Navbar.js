// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [user, setUser] =useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Assuming you store the user's information in localStorage after login
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      }, []);
    const handleLogout = () => {
        // Clear user data from localStorage and state
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login'); // Redirect to login page after logout
      };
  return (
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">YourHR</Link>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.name}!</span>
            <button onClick={handleLogout} className="mx-2 hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mx-2 hover:underline">
              Login
            </Link>
            <Link to="/signup" className="mx-2 hover:underline">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
