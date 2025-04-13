// import React, { useEffect, useState } from 'react';
// import { ArrowRight, RefreshCcw, AlertCircle } from 'lucide-react';

// const SmartUnitConverter = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [units, setUnits] = useState([]);
//   const [fromUnit, setFromUnit] = useState('');
//   const [toUnit, setToUnit] = useState('');
//   const [inputValue, setInputValue] = useState('');
//   const [convertedValue, setConvertedValue] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [recentConversions, setRecentConversions] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch('http://localhost:5000/api/converter/categories');
//         const data = await res.json();
//         setCategories(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load categories');
//         setLoading(false);
//       }
//     };
    
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchUnits = async () => {
//       if (selectedCategory) {
//         try {
//           setLoading(true);
//           const res = await fetch(`http://localhost:5000/api/converter/units/${selectedCategory}`);
//           const data = await res.json();
//           setUnits(data);
//           setFromUnit(data[0]);
//           setToUnit(data.length > 1 ? data[1] : data[0]);
//           setLoading(false);
//         } catch (err) {
//           setError('Failed to load units');
//           setLoading(false);
//         }
//       }
//     };
    
//     fetchUnits();
//   }, [selectedCategory]);

//   const handleConvert = async () => {
//     if (!inputValue) {
//       setError('Please enter a value');
//       return;
//     }
    
//     try {
//       setLoading(true);
//       setError(null);
      
//       const res = await fetch('http://localhost:5000/api/converter/convert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           category: selectedCategory,
//           from: fromUnit,
//           to: toUnit,
//           value: parseFloat(inputValue)
//         })
//       });
      
//       const data = await res.json();
//       setConvertedValue(data.result.toFixed(4));
      
//       // Add to recent conversions
//       const newConversion = {
//         id: Date.now(),
//         from: fromUnit,
//         to: toUnit,
//         inputValue,
//         result: data.result.toFixed(4),
//         category: selectedCategory
//       };
      
//       setRecentConversions(prev => [newConversion, ...prev.slice(0, 4)]);
//       setLoading(false);
//     } catch (error) {
//       setError('Conversion failed');
//       setLoading(false);
//     }
//   };

//   const swapUnits = () => {
//     setFromUnit(toUnit);
//     setToUnit(fromUnit);
//     setConvertedValue(null);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleConvert();
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
//       <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Smart Unit Converter</h2>
      
//       {/* Category Selection */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Conversion Category
//         </label>
//         <select 
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           value={selectedCategory} 
//           onChange={(e) => {
//             setSelectedCategory(e.target.value);
//             setConvertedValue(null);
//           }}
//         >
//           <option value="">-- Select Category --</option>
//           {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
//         </select>
//       </div>

//       {/* Conversion Form */}
//       {units.length > 0 && (
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Value to Convert
//             </label>
//             <input
//               type="number"
//               placeholder="Enter value"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 From
//               </label>
//               <select 
//                 value={fromUnit} 
//                 onChange={(e) => {
//                   setFromUnit(e.target.value);
//                   setConvertedValue(null);
//                 }}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
//               </select>
//             </div>
            
//             <button 
//               onClick={swapUnits} 
//               className="mt-6 p-2 rounded-full hover:bg-gray-100"
//               aria-label="Swap units"
//             >
//               <RefreshCcw size={24} className="text-blue-600" />
//             </button>
            
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 To
//               </label>
//               <select 
//                 value={toUnit} 
//                 onChange={(e) => {
//                   setToUnit(e.target.value);
//                   setConvertedValue(null);
//                 }}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
//               </select>
//             </div>
//           </div>
          
//           <button 
//             onClick={handleConvert} 
//             disabled={loading}
//             className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
//           >
//             {loading ? (
//               <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2" />
//             ) : null}
//             Convert
//           </button>
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
//           <AlertCircle size={20} className="mr-2" />
//           <span>{error}</span>
//         </div>
//       )}

//       {/* Conversion Result */}
//       {convertedValue !== null && (
//         <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//           <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
//             <span>{inputValue} {fromUnit}</span>
//             <ArrowRight size={16} />
//             <span>{convertedValue} {toUnit}</span>
//           </div>
//           <p className="text-2xl font-bold text-center text-gray-800">
//             {convertedValue} <span className="text-gray-600">{toUnit}</span>
//           </p>
//         </div>
//       )}

//       {/* Recent Conversions */}
//       {recentConversions.length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-lg font-medium text-gray-700 mb-3">Recent Conversions</h3>
//           <div className="space-y-2">
//             {recentConversions.map(conv => (
//               <div 
//                 key={conv.id} 
//                 className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between"
//               >
//                 <div className="text-sm">
//                   <span className="font-medium">{conv.category}:</span> {conv.inputValue} {conv.from} → {conv.result} {conv.to}
//                 </div>
//                 <button 
//                   onClick={() => {
//                     setSelectedCategory(conv.category);
//                     setFromUnit(conv.from);
//                     setToUnit(conv.to);
//                     setInputValue(conv.inputValue);
//                     setConvertedValue(conv.result);
//                   }}
//                   className="text-xs text-blue-600 hover:text-blue-800"
//                 >
//                   Use again
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SmartUnitConverter;

import React, { useEffect, useState } from 'react';
import './SmartUnitConverter.css';

const SmartUnitConverter = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [units, setUnits] = useState([]);
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [convertedValue, setConvertedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentConversions, setRecentConversions] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
const [filterFrom, setFilterFrom] = useState('');
const [filterTo, setFilterTo] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/converter/categories');
        const data = await res.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      if (selectedCategory) {
        try {
          setLoading(true);
          const res = await fetch(`http://localhost:5000/api/converter/units/${selectedCategory}`);
          const data = await res.json();
          setUnits(data);
          setFromUnit(data[0]);
          setToUnit(data.length > 1 ? data[1] : data[0]);
          setLoading(false);
        } catch (err) {
          setError('Failed to load units');
          setLoading(false);
        }
      }
    };
    
    fetchUnits();
  }, [selectedCategory]);

  const handleConvert = async () => {
    if (!inputValue) {
      setError('Please enter a value');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch('http://localhost:5000/api/converter/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          from: fromUnit,
          to: toUnit,
          value: parseFloat(inputValue)
        })
      });
      
      const data = await res.json();
      setConvertedValue(data.result.toFixed(4));
      
      // Add to recent conversions
      const newConversion = {
        id: Date.now(),
        from: fromUnit,
        to: toUnit,
        inputValue,
        result: data.result.toFixed(4),
        category: selectedCategory
      };
      
      setRecentConversions(prev => [newConversion, ...prev.slice(0, 4)]);
      setLoading(false);
    } catch (error) {
      setError('Conversion failed');
      setLoading(false);
    }
  };

  const filteredConversions = recentConversions.filter(conv => {
    return (
      (filterCategory === '' || conv.category === filterCategory) &&
      (filterFrom === '' || conv.from === filterFrom) &&
      (filterTo === '' || conv.to === filterTo)
    );
  });

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setConvertedValue(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };

  // SVG Icons
  const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v6h6"></path>
      <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
      <path d="M21 22v-6h-6"></path>
      <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );

  const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" x2="12" y1="8" y2="12"></line>
      <line x1="12" x2="12.01" y1="16" y2="16"></line>
    </svg>
  );

  return (
    <div className="converter-container">
      <h2 className="converter-title">Smart Unit Converter</h2>
      
      {/* Category Selection */}
      <div className="form-group">
        <label className="form-label">
          Conversion Category
        </label>
        <select 
          className="form-select"
          value={selectedCategory} 
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setConvertedValue(null);
          }}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Conversion Form */}
      {units.length > 0 && (
        <>
          <div className="form-group">
            <label className="form-label">
              Value to Convert
            </label>
            <input
              type="number"
              placeholder="Enter value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-input"
            />
          </div>
          
          <div className="unit-row">
            <div className="unit-col">
              <label className="form-label">
                From
              </label>
              <select 
                value={fromUnit} 
                onChange={(e) => {
                  setFromUnit(e.target.value);
                  setConvertedValue(null);
                }}
                className="form-select"
              >
                {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
              </select>
            </div>
            
            <button 
              onClick={swapUnits} 
              className="swap-button"
              aria-label="Swap units"
            >
              <RefreshIcon />
            </button>
            
            <div className="unit-col">
              <label className="form-label">
                To
              </label>
              <select 
                value={toUnit} 
                onChange={(e) => {
                  setToUnit(e.target.value);
                  setConvertedValue(null);
                }}
                className="form-select"
              >
                {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleConvert} 
            disabled={loading}
            className="btn btn-primary"
          >
            {loading && <span className="spinner"></span>}
            Convert
          </button>
        </>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-box">
          <AlertIcon />
          <span>{error}</span>
        </div>
      )}

      {/* Conversion Result */}
      {convertedValue !== null && (
        <div className="result-box">
          <div className="flex-row">
            <span>{inputValue} {fromUnit}</span>
            <ArrowRightIcon />
            <span>{convertedValue} {toUnit}</span>
          </div>
          <p className="result-text">
            {convertedValue} <span className="result-unit">{toUnit}</span>
          </p>
        </div>
      )}

      {/* Recent Conversions */}
      {/* {recentConversions.length > 0 && (
        <div className="recent-section">
          <h3 className="recent-title">Recent Conversions</h3>
          {recentConversions.map(conv => (
            <div key={conv.id} className="recent-item">
              <div>
                <span style={{fontWeight: '500'}}>{conv.category}:</span> {conv.inputValue} {conv.from} → {conv.result} {conv.to}
              </div>
              <button 
                onClick={() => {
                  setSelectedCategory(conv.category);
                  setFromUnit(conv.from);
                  setToUnit(conv.to);
                  setInputValue(conv.inputValue);
                  setConvertedValue(conv.result);
                }}
                className="use-again-button"
              >
                Use again
              </button>
            </div>
          ))}
        </div>
      )} */}

{recentConversions.length > 0 && (
  <div className="recent-section">
    <div className="recent-header">
      <h3 className="recent-title">Recent Conversions</h3>
      <div className="filter-controls">
        <select 
          className="filter-select"
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
        >
          <option value="">All Categories</option>
          {[...new Set(recentConversions.map(conv => conv.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <select 
          className="filter-select"
          onChange={(e) => setFilterFrom(e.target.value)}
          value={filterFrom}
        >
          <option value="">All From Units</option>
          {[...new Set(recentConversions.map(conv => conv.from))].map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
        
        <select 
          className="filter-select"
          onChange={(e) => setFilterTo(e.target.value)}
          value={filterTo}
        >
          <option value="">All To Units</option>
          {[...new Set(recentConversions.map(conv => conv.to))].map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
        
        {(filterCategory || filterFrom || filterTo) && (
          <button 
            className="clear-filters-button"
            onClick={() => {
              setFilterCategory('');
              setFilterFrom('');
              setFilterTo('');
            }}
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
    
    {filteredConversions.length > 0 ? (
      filteredConversions.map(conv => (
        <div key={conv.id} className="recent-item">
          <div>
            <span style={{fontWeight: '500'}}>{conv.category}:</span> {conv.inputValue} {conv.from} → {conv.result} {conv.to}
          </div>
          <button 
            onClick={() => {
              setSelectedCategory(conv.category);
              setFromUnit(conv.from);
              setToUnit(conv.to);
              setInputValue(conv.inputValue);
              setConvertedValue(conv.result);
            }}
            className="use-again-button"
          >
            Use again
          </button>
        </div>
      ))
    ) : (
      <div className="no-results">No conversions match your filters</div>
    )}
  </div>
)}


    </div>
  );
};

export default SmartUnitConverter;