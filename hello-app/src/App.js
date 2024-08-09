// src/App.js
import React from 'react';
import { Route, Routes  } from 'react-router-dom';
import Login from './Component/Login';
import Home from './Component/Home';
import Upload from './Component/Upload';
import Register from './Component/Register';
import EditDocument from './Component/EditDocument';
import HomeStatus from './Component/HomeStatus';
import UserCreate from './Component/UserCreate';
import UserUpdate from './Component/UserUpdate';
import './App.css';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path="/edit/:id" element={<EditDocument />} />
        <Route path='/home1' element={<HomeStatus />} />
        <Route path='/create' element={<UserCreate />} />
        <Route path='/update/:id' element={<UserUpdate />} />

      </Routes>
    </div>
  );
}

export default App;
