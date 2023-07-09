import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Insights from './pages/insights';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/insights" element={<Insights/>} />
      </Routes>
    </Router>
  );
}

export default App;
