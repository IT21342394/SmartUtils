import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import SmartUnitConverter from './Screens/UnitConverter/SmartUnitConverter';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SmartUnitConverter/>} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
