import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SmartUnitConverter = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [units, setUnits] = useState([]);
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [convertedValue, setConvertedValue] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/converter/categories').then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`http://localhost:5000/api/converter/units/${selectedCategory}`).then(res => {
        setUnits(res.data);
        setFromUnit(res.data[0]);
        setToUnit(res.data[1]);
      });
    }
  }, [selectedCategory]);

  const handleConvert = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/converter/convert', {
        category: selectedCategory,
        from: fromUnit,
        to: toUnit,
        value: parseFloat(inputValue)
      });
      setConvertedValue(res.data.result.toFixed(2));
    } catch (error) {
      console.error('Conversion failed', error);
    }
  };

  return (
    <div className="converter">
      <h2>Smart Unit Converter</h2>

      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">-- Select Category --</option>
        {categories.map((cat) => <option key={cat}>{cat}</option>)}
      </select>

      {units.length > 0 && (
        <>
          <input
            type="number"
            placeholder="Enter value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {units.map((unit) => <option key={unit}>{unit}</option>)}
          </select>

          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {units.map((unit) => <option key={unit}>{unit}</option>)}
          </select>

          <button onClick={handleConvert}>Convert</button>
        </>
      )}

      {convertedValue !== null && (
        <p><strong>Converted Value:</strong> {convertedValue}</p>
      )}
    </div>
  );
};

export default SmartUnitConverter;
