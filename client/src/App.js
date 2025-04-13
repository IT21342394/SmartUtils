import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import SmartUnitConverter from './Screens/UnitConverter/SmartUnitConverter';
import AdvancedBMICalculator from './Screens/BMICalculator/AdvancedBMICalculator';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SmartUnitConverter/>} />
        <Route path="/BmiCal" element={<AdvancedBMICalculator/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
