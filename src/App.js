import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiProvider } from './contexts/ApiContext';
import Header from './components/Header/Header';
import HeroEquipment from './pages/HeroEquipment/HeroEquipment';
import './App.css';

function App() {
  return (
    <ApiProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HeroEquipment />} />
              <Route path="/hero-equipment" element={<HeroEquipment />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApiProvider>
  );
}

export default App;