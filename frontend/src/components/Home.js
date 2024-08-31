// src/components/Home.js
import React, { useContext } from 'react';
import Navbar from './Navbar';
import UploadResume from './UploadResume';
import Dashboard from './Dashboard';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const {user} = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-max">
        <h1 className="text-4xl font-bold">
        {user && user.role === 'ADMIN' ? 'Admin Dashboard' : 'Welcome to YourHR!'}
        </h1>
      </div>
      {user && user.role === 'ADMIN' ? (
          <Dashboard user={user}/>
      ) : (
        <div className="flex items-center justify-center h-max">
           <UploadResume/>
        </div>
       
      )}
    </div>
  );
}

export default Home;
