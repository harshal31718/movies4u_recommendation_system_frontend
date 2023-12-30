import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import MovieInfo from './pages/MovieInfo/MovieInfo';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/movieinfo/:id' element={<MovieInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
