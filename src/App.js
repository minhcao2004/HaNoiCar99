// src/App.js
//Nguyen Minh Cao - 12/3/2026
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RequestPage from './pages/RequestPage';
import QuotePage from './pages/QuotePage';
import ContractPage from './pages/ContractPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">📦 Yêu cầu</Link>
          <Link to="/quotes">💰 Báo giá</Link>
          <Link to="/contracts">📄 Hợp đồng</Link>
        </nav>
        <Routes>
          <Route path="/" element={<RequestPage />} />
          <Route path="/quotes" element={<QuotePage />} />
          <Route path="/contracts" element={<ContractPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;