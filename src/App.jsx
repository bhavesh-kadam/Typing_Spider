import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Pages/LoginPage';
import FreqAskQues from './Pages/FreqAskQues';
import { ToastContainer } from 'react-toastify';
import HistoryPage from './Pages/HistoryPage'

function App() {

  return (
    <>
    <ToastContainer />
    
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/FreqAskQues' element={<FreqAskQues/>} />
      <Route path='/Login' element={<Login/>} />
      <Route path='/History' element={<HistoryPage/>} />
    </Routes>
    </>

  );
}

export default App;
