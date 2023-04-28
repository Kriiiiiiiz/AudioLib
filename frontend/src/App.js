import React from 'react';
import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/profile' element={<Profile />} />
    </Routes>
    </Router>   
  );
}

export default App;
