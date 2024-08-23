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
import Login1 from './Component/Login1';
import File from './Component/File';
import Navbar from './AppBar/Navbar';
import Appbar from './AppBar/Appbar';
import './App.css';
import AdminLogin from './LoginFrom/AdminLogin';
import UserLogin from './LoginFrom/UserLogin';
import LoginPage from './LoginFrom/LoginPage';
import HomePage from './LoginFrom/HomePage';
import RegisterFrom from './LoginFrom/RegisterFrom';
import FileUpload from './LoginFrom/FileUpload';
import TrackDocuments from './LoginFrom/TrackDocuments';



function App() {
  return (
    <div className='App'>
      <Appbar></Appbar>
      <Navbar></Navbar>
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
        <Route path='/file' element={<File />} />
        <Route path='/login1' element={<Login1 />} />
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/Admin' element={<AdminLogin />} />
        <Route path='/user' element={<UserLogin />} />
        <Route path='/registerfrom' element={<RegisterFrom />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/fileupload' element={<FileUpload />} />
        <Route path='/track' element={<TrackDocuments />} />
  
       

      </Routes>
      
    </div>
  );
}

export default App;
