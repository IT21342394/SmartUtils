// import { useState, useEffect } from 'react';
// import './AdvancedBMICalculator.css'; // Assuming you have a CSS file for styles

// function AdvancedBMICalculator() {
//   // Use object destructuring in state initialization
//   const [measurements, setMeasurements] = useState({
//     weight: '',
//     height: '',
//     age: '',
//     gender: 'male',
//     unit: 'metric'
//   });
  
//   const [results, setResults] = useState({
//     bmi: null,
//     category: '',
//     idealWeight: null,
//     bodyFat: null,
//     bmiPrime: null,
//     healthRisk: '',
//     dailyCalories: null
//   });
  
//   const [history, setHistory] = useState([]);
//   const [error, setError] = useState('');
//   const [showHistory, setShowHistory] = useState(false);

//   // Use arrow functions throughout
//   useEffect(() => {
//     // No action needed - the original useEffect already has minimal code
//   }, [measurements.unit, measurements.height]);

//   // Use object destructuring in function parameters
//   const handleInputChange = ({ target: { name, value } }) => {
//     setMeasurements(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const calculateBMI = () => {
//     setError('');
    
//     // Destructure all needed values at once
//     const { weight, height, age, gender, unit } = measurements;
    
//     if (!weight || !height || !age) {
//       setError('Please enter weight, height, and age');
//       return;
//     }

//     const weightValue = parseFloat(weight);
//     const heightValue = parseFloat(height);
//     const ageValue = parseInt(age);

//     if (isNaN(weightValue) || isNaN(heightValue) || isNaN(ageValue) || 
//         weightValue <= 0 || heightValue <= 0 || ageValue <= 0) {
//       setError('Please enter valid positive numbers');
//       return;
//     }

//     // Use template literals for complex string construction
//     // Use let only for variables that will be reassigned
//     let bmiValue, heightInMeters;

//     // Use ternary operator for conditional assignment
//     if (unit === 'metric') {
//       heightInMeters = heightValue / 100;
//       bmiValue = weightValue / (heightInMeters ** 2); // Use exponentiation operator
//     } else {
//       bmiValue = (703 * weightValue) / (heightValue ** 2); // Use exponentiation operator
//       heightInMeters = heightValue * 0.0254; 
//     }

//     const roundedBMI = parseFloat(bmiValue.toFixed(2));
//     const bmiPrime = parseFloat((bmiValue / 25).toFixed(2));
    
//     // Use ternary operator for conditional calculation
//     const bodyFat = gender === 'male' 
//       ? parseFloat((1.20 * bmiValue + 0.23 * ageValue - 16.2).toFixed(2))
//       : parseFloat((1.20 * bmiValue + 0.23 * ageValue - 5.4).toFixed(2));
    
//     // Determine BMI category
//     // Default values (can be reassigned)
//     let category = '';
//     let healthRisk = '';
    
//     // Could use a Map or object lookup instead of if/else chains
//     const bmiCategories = [
//       { min: 0, max: 16, category: 'Severe Thinness', risk: 'Very Severe' },
//       { min: 16, max: 17, category: 'Moderate Thinness', risk: 'Severe' },
//       { min: 17, max: 18.5, category: 'Mild Thinness', risk: 'Moderate' },
//       { min: 18.5, max: 25, category: 'Normal', risk: 'Low' },
//       { min: 25, max: 30, category: 'Overweight', risk: 'Enhanced' },
//       { min: 30, max: 35, category: 'Obese Class I', risk: 'High' },
//       { min: 35, max: 40, category: 'Obese Class II', risk: 'Very High' },
//       { min: 40, max: Infinity, category: 'Obese Class III', risk: 'Extremely High' }
//     ];
    
//     // Find the matching category
//     const bmiCategoryData = bmiCategories.find(cat => 
//       bmiValue >= cat.min && bmiValue < cat.max
//     ) || bmiCategories[bmiCategories.length - 1];
    
//     // Destructure values from the found category
//     ({ category, risk: healthRisk } = bmiCategoryData);
    
//     // Calculate ideal weight using const where possible and ternary expressions
//     const baseHeightInches = 60; // 5 feet in inches
//     const heightInInches = unit === 'metric' ? heightValue / 2.54 : heightValue;
    
//     const idealWeight = gender === 'male'
//       ? heightInInches > baseHeightInches
//         ? 48 + 2.7 * (heightInInches - baseHeightInches)
//         : 48 * (heightInInches / baseHeightInches)
//       : heightInInches > baseHeightInches
//         ? 45.5 + 2.2 * (heightInInches - baseHeightInches)
//         : 45.5 * (heightInInches / baseHeightInches);
    
//     const formattedIdealWeight = parseFloat(idealWeight.toFixed(1));
    
//     // Basal Metabolic Rate calculation using template literals and ternary operators
//     const weightInKg = unit === 'metric' ? weightValue : weightValue * 0.453592;
//     const heightInCm = unit === 'metric' ? heightValue : heightValue * 2.54;
    
//     const bmr = gender === 'male'
//       ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * ageValue)
//       : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * ageValue);
    
//     const dailyCalories = Math.round(bmr * 1.2);
    
//     const newResults = {
//       bmi: roundedBMI,
//       category,
//       idealWeight: formattedIdealWeight,
//       bodyFat,
//       bmiPrime,
//       healthRisk,
//       dailyCalories
//     };
    
//     setResults(newResults);
    
//     // Add to history using spread operator and object shorthand
//     const timestamp = new Date().toLocaleString();
//     setHistory(prev => [
//       { timestamp, measurements: { ...measurements }, results: { ...newResults } },
//       ...prev
//     ]);
//   };

//   const resetForm = () => {
//     setMeasurements({
//       weight: '',
//       height: '',
//       age: '',
//       gender: 'male',
//       unit: 'metric'
//     });
//     setResults({
//       bmi: null,
//       category: '',
//       idealWeight: null,
//       bodyFat: null,
//       bmiPrime: null,
//       healthRisk: '',
//       dailyCalories: null
//     });
//     setError('');
//   };

//   // Use arrow functions for conciseness
//   const toggleHistory = () => setShowHistory(!showHistory);
//   const clearHistory = () => {
//     setHistory([]);
//     setShowHistory(false);
//   };

//   // Use arrow functions with implicit returns for simple logic
//   const getBMIColor = bmi => {
//     if (!bmi) return 'bg-gray-200';
//     if (bmi < 18.5) return 'bg-blue-400';
//     if (bmi < 25) return 'bg-green-400';
//     if (bmi < 30) return 'bg-yellow-400';
//     if (bmi < 35) return 'bg-orange-400';
//     return 'bg-red-400';
//   };

//   // Use arrow functions with ternary operators
//   const getWeightLabel = () => 
//     measurements.unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)';

//   const getHeightLabel = () => 
//     measurements.unit === 'metric' ? 'Height (cm)' : 'Height (inches)';

//   const getIdealWeightLabel = () => 
//     measurements.unit === 'metric' ? 'kg' : 'lbs';

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold text-center mb-6">Advanced BMI Calculator</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Measurements</h2>
          
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Unit System
//             </label>
//             <div className="flex space-x-4">
//               {['metric', 'imperial'].map(unitType => (
//                 <label key={unitType} className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     name="unit"
//                     value={unitType}
//                     checked={measurements.unit === unitType}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600"
//                     data-testid={`${unitType}-radio`}
//                   />
//                   <span className="ml-2">
//                     {unitType === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/in)'}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
//               {getWeightLabel()}
//             </label>
//             <input
//               id="weight"
//               name="weight"
//               type="number"
//               value={measurements.weight}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder={`Enter ${measurements.unit === 'metric' ? 'kg' : 'lbs'}`}
//               data-testid="weight-input"
//             />
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
//               {getHeightLabel()}
//             </label>
//             <input
//               id="height"
//               name="height"
//               type="number"
//               value={measurements.height}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder={`Enter ${measurements.unit === 'metric' ? 'cm' : 'inches'}`}
//               data-testid="height-input"
//             />
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
//               Age (years)
//             </label>
//             <input
//               id="age"
//               name="age"
//               type="number"
//               value={measurements.age}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter age"
//               data-testid="age-input"
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Gender
//             </label>
//             <div className="flex space-x-4">
//               {['male', 'female'].map(genderType => (
//                 <label key={genderType} className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value={genderType}
//                     checked={measurements.gender === genderType}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600"
//                     data-testid={`${genderType}-radio`}
//                   />
//                   <span className="ml-2">{genderType.charAt(0).toUpperCase() + genderType.slice(1)}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
          
//           <div className="flex space-x-4">
//             <button
//               onClick={calculateBMI}
//               className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               data-testid="calculate-button"
//             >
//               Calculate
//             </button>
//             <button
//               onClick={resetForm}
//               className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
//               data-testid="reset-button"
//             >
//               Reset
//             </button>
//           </div>
          
//           {error && (
//             <div className="text-red-500 text-sm mt-4" data-testid="error-message">
//               {error}
//             </div>
//           )}
//         </div>
        
//         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Results</h2>
          
//           {results.bmi ? (
//             <div data-testid="result-section">
//               <div className="flex items-center mb-4">
//                 <div className="text-4xl font-bold mr-4" data-testid="bmi-value">{results.bmi}</div>
//                 <div className={`px-3 py-1 rounded text-white font-semibold ${getBMIColor(results.bmi)}`} data-testid="bmi-category">
//                   {results.category}
//                 </div>
//               </div>
              
//               <div className="mb-4">
//                 <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
//                   <div 
//                     className={`h-full ${getBMIColor(results.bmi)}`} 
//                     style={{ width: `${Math.min((results.bmi / 50) * 100, 100)}%` }}
//                   ></div>
//                 </div>
//                 <div className="flex justify-between text-xs mt-1">
//                   {['15', '18.5', '25', '30', '35', '40+'].map(value => (
//                     <span key={value}>{value}</span>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 {[
//                   { label: 'BMI Prime', value: results.bmiPrime, testId: 'bmi-prime' },
//                   { label: 'Body Fat %', value: `${results.bodyFat}%`, testId: 'body-fat' },
//                   { 
//                     label: 'Ideal Weight', 
//                     value: `${results.idealWeight} ${getIdealWeightLabel()}`, 
//                     testId: 'ideal-weight' 
//                   },
//                   { label: 'Health Risk', value: results.healthRisk, testId: 'health-risk' }
//                 ].map(({ label, value, testId }) => (
//                   <div key={testId} className="bg-white p-3 rounded shadow-sm">
//                     <div className="text-sm text-gray-600">{label}</div>
//                     <div className="font-semibold" data-testid={testId}>{value}</div>
//                   </div>
//                 ))}
//                 <div className="bg-white p-3 rounded shadow-sm col-span-2">
//                   <div className="text-sm text-gray-600">Est. Daily Calories (BMR × 1.2)</div>
//                   <div className="font-semibold" data-testid="daily-calories">{results.dailyCalories} kcal</div>
//                 </div>
//               </div>
              
//               <div className="mt-4 text-sm text-gray-600">
//                 <p>BMI = Body Mass Index</p>
//                 <p>BMI Prime = BMI / 25 (1.0 = optimal)</p>
//                 <p>Body fat percentage is estimated using a formula based on BMI and age</p>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-10 text-gray-500">
//               Enter your measurements and click calculate to see your results.
//             </div>
//           )}
//         </div>
//       </div>
      
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-xl font-semibold">Measurement History</h2>
//           <div>
//             <button
//               onClick={toggleHistory}
//               className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               data-testid="toggle-history-button"
//             >
//               {showHistory ? 'Hide History' : 'Show History'}
//             </button>
//             {history.length > 0 && (
//               <button
//                 onClick={clearHistory}
//                 className="bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//                 data-testid="clear-history-button"
//               >
//                 Clear History
//               </button>
//             )}
//           </div>
//         </div>
        
//         {showHistory && (
//           <div className="bg-gray-50 p-4 rounded-lg shadow-sm" data-testid="history-section">
//             {history.length === 0 ? (
//               <div className="text-center py-4 text-gray-500">
//                 No history yet. Your BMI calculations will appear here.
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       {['Date & Time', 'Weight', 'Height', 'Age', 'BMI', 'Category'].map(header => (
//                         <th key={header} className="px-4 py-2 text-left">{header}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {history.map((entry, index) => (
//                       <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                         <td className="px-4 py-2">{entry.timestamp}</td>
//                         <td className="px-4 py-2">
//                           {`${entry.measurements.weight} ${entry.measurements.unit === 'metric' ? 'kg' : 'lbs'}`}
//                         </td>
//                         <td className="px-4 py-2">
//                           {`${entry.measurements.height} ${entry.measurements.unit === 'metric' ? 'cm' : 'in'}`}
//                         </td>
//                         <td className="px-4 py-2">{entry.measurements.age}</td>
//                         <td className="px-4 py-2">{entry.results.bmi}</td>
//                         <td className="px-4 py-2">
//                           <span className={`px-2 py-0.5 rounded text-white text-sm ${getBMIColor(entry.results.bmi)}`}>
//                             {entry.results.category}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
      
//       <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//         <h2 className="text-xl font-semibold mb-2">BMI Categories</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
//           {[
//             { color: 'blue', range: '< 18.5', label: 'Underweight' },
//             { color: 'green', range: '18.5 - 24.9', label: 'Normal' },
//             { color: 'yellow', range: '25 - 29.9', label: 'Overweight' },
//             { color: 'red', range: '≥ 30', label: 'Obese' }
//           ].map(({ color, range, label }) => (
//             <div key={label} className={`p-2 rounded bg-${color}-400 text-white text-center text-sm`}>
//               {`${range}: ${label}`}
//             </div>
//           ))}
//         </div>
//         <p className="text-sm text-gray-600 mt-2">
//           Note: BMI is a screening tool, but it does not diagnose body fatness or health. 
//           BMI calculations may be less accurate for athletes, elderly people, and pregnant women.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default AdvancedBMICalculator;

import { useState, useEffect } from 'react';
import './AdvancedBMICalculator.css'; // Assuming you have a CSS file for styles

function AdvancedBMICalculator() {
  // Use object destructuring in state initialization
  const [measurements, setMeasurements] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    unit: 'metric'
  });
  
  const [results, setResults] = useState({
    bmi: null,
    category: '',
    idealWeight: null,
    bodyFat: null,
    bmiPrime: null,
    healthRisk: '',
    dailyCalories: null
  });
  
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  
  // New state for filter options
  const [filters, setFilters] = useState({
    minAge: '',
    maxAge: '',
    category: '',
    gender: ''
  });

  // Use arrow functions throughout
  useEffect(() => {
    // No action needed - the original useEffect already has minimal code
  }, [measurements.unit, measurements.height]);

  // Use object destructuring in function parameters
  const handleInputChange = ({ target: { name, value } }) => {
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle filter input changes
  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateBMI = () => {
    setError('');
    
    // Destructure all needed values at once
    const { weight, height, age, gender, unit } = measurements;
    
    if (!weight || !height || !age) {
      setError('Please enter weight, height, and age');
      return;
    }

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    const ageValue = parseInt(age);

    if (isNaN(weightValue) || isNaN(heightValue) || isNaN(ageValue) || 
        weightValue <= 0 || heightValue <= 0 || ageValue <= 0) {
      setError('Please enter valid positive numbers');
      return;
    }

    // Use template literals for complex string construction
    // Use let only for variables that will be reassigned
    let bmiValue, heightInMeters;

    // Use ternary operator for conditional assignment
    if (unit === 'metric') {
      heightInMeters = heightValue / 100;
      bmiValue = weightValue / (heightInMeters ** 2); // Use exponentiation operator
    } else {
      bmiValue = (703 * weightValue) / (heightValue ** 2); // Use exponentiation operator
      heightInMeters = heightValue * 0.0254; 
    }

    const roundedBMI = parseFloat(bmiValue.toFixed(2));
    const bmiPrime = parseFloat((bmiValue / 25).toFixed(2));
    
    // Use ternary operator for conditional calculation
    const bodyFat = gender === 'male' 
      ? parseFloat((1.20 * bmiValue + 0.23 * ageValue - 16.2).toFixed(2))
      : parseFloat((1.20 * bmiValue + 0.23 * ageValue - 5.4).toFixed(2));
    
    // Determine BMI category
    // Default values (can be reassigned)
    let category = '';
    let healthRisk = '';
    
    // Could use a Map or object lookup instead of if/else chains
    const bmiCategories = [
      { min: 0, max: 16, category: 'Severe Thinness', risk: 'Very Severe' },
      { min: 16, max: 17, category: 'Moderate Thinness', risk: 'Severe' },
      { min: 17, max: 18.5, category: 'Mild Thinness', risk: 'Moderate' },
      { min: 18.5, max: 25, category: 'Normal', risk: 'Low' },
      { min: 25, max: 30, category: 'Overweight', risk: 'Enhanced' },
      { min: 30, max: 35, category: 'Obese Class I', risk: 'High' },
      { min: 35, max: 40, category: 'Obese Class II', risk: 'Very High' },
      { min: 40, max: Infinity, category: 'Obese Class III', risk: 'Extremely High' }
    ];
    
    // Find the matching category
    const bmiCategoryData = bmiCategories.find(cat => 
      bmiValue >= cat.min && bmiValue < cat.max
    ) || bmiCategories[bmiCategories.length - 1];
    
    // Destructure values from the found category
    ({ category, risk: healthRisk } = bmiCategoryData);
    
    // Calculate ideal weight using const where possible and ternary expressions
    const baseHeightInches = 60; // 5 feet in inches
    const heightInInches = unit === 'metric' ? heightValue / 2.54 : heightValue;
    
    const idealWeight = gender === 'male'
      ? heightInInches > baseHeightInches
        ? 48 + 2.7 * (heightInInches - baseHeightInches)
        : 48 * (heightInInches / baseHeightInches)
      : heightInInches > baseHeightInches
        ? 45.5 + 2.2 * (heightInInches - baseHeightInches)
        : 45.5 * (heightInInches / baseHeightInches);
    
    const formattedIdealWeight = parseFloat(idealWeight.toFixed(1));
    
    // Basal Metabolic Rate calculation using template literals and ternary operators
    const weightInKg = unit === 'metric' ? weightValue : weightValue * 0.453592;
    const heightInCm = unit === 'metric' ? heightValue : heightValue * 2.54;
    
    const bmr = gender === 'male'
      ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * ageValue)
      : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * ageValue);
    
    const dailyCalories = Math.round(bmr * 1.2);
    
    const newResults = {
      bmi: roundedBMI,
      category,
      idealWeight: formattedIdealWeight,
      bodyFat,
      bmiPrime,
      healthRisk,
      dailyCalories
    };
    
    setResults(newResults);
    
    // Add to history using spread operator and object shorthand
    const timestamp = new Date().toLocaleString();
    setHistory(prev => [
      { timestamp, measurements: { ...measurements }, results: { ...newResults } },
      ...prev
    ]);
  };

  const resetForm = () => {
    setMeasurements({
      weight: '',
      height: '',
      age: '',
      gender: 'male',
      unit: 'metric'
    });
    setResults({
      bmi: null,
      category: '',
      idealWeight: null,
      bodyFat: null,
      bmiPrime: null,
      healthRisk: '',
      dailyCalories: null
    });
    setError('');
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      minAge: '',
      maxAge: '',
      category: '',
      gender: ''
    });
  };

  // Use arrow functions for conciseness
  const toggleHistory = () => setShowHistory(!showHistory);
  const clearHistory = () => {
    setHistory([]);
    setShowHistory(false);
  };

  // Use arrow functions with implicit returns for simple logic
  const getBMIColor = bmi => {
    if (!bmi) return 'bg-gray-200';
    if (bmi < 18.5) return 'bg-blue-400';
    if (bmi < 25) return 'bg-green-400';
    if (bmi < 30) return 'bg-yellow-400';
    if (bmi < 35) return 'bg-orange-400';
    return 'bg-red-400';
  };

  // Use arrow functions with ternary operators
  const getWeightLabel = () => 
    measurements.unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)';

  const getHeightLabel = () => 
    measurements.unit === 'metric' ? 'Height (cm)' : 'Height (inches)';

  const getIdealWeightLabel = () => 
    measurements.unit === 'metric' ? 'kg' : 'lbs';
    
  // Filter history based on selected filters
  const filteredHistory = history.filter(entry => {
    const ageMatch = 
      (filters.minAge === '' || parseInt(entry.measurements.age) >= parseInt(filters.minAge)) &&
      (filters.maxAge === '' || parseInt(entry.measurements.age) <= parseInt(filters.maxAge));
    
    const categoryMatch = 
      filters.category === '' || 
      entry.results.category.toLowerCase().includes(filters.category.toLowerCase());
    
    const genderMatch = 
      filters.gender === '' || 
      entry.measurements.gender === filters.gender;
    
    return ageMatch && categoryMatch && genderMatch;
  });

  // Get unique categories from history for the dropdown
  const uniqueCategories = [...new Set(history.map(entry => entry.results.category))];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Advanced BMI Calculator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Measurements</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit System
            </label>
            <div className="flex space-x-4">
              {['metric', 'imperial'].map(unitType => (
                <label key={unitType} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="unit"
                    value={unitType}
                    checked={measurements.unit === unitType}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600"
                    data-testid={`${unitType}-radio`}
                  />
                  <span className="ml-2">
                    {unitType === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/in)'}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              {getWeightLabel()}
            </label>
            <input
              id="weight"
              name="weight"
              type="number"
              value={measurements.weight}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${measurements.unit === 'metric' ? 'kg' : 'lbs'}`}
              data-testid="weight-input"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
              {getHeightLabel()}
            </label>
            <input
              id="height"
              name="height"
              type="number"
              value={measurements.height}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${measurements.unit === 'metric' ? 'cm' : 'inches'}`}
              data-testid="height-input"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age (years)
            </label>
            <input
              id="age"
              name="age"
              type="number"
              value={measurements.age}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
              data-testid="age-input"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <div className="flex space-x-4">
              {['male', 'female'].map(genderType => (
                <label key={genderType} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={genderType}
                    checked={measurements.gender === genderType}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600"
                    data-testid={`${genderType}-radio`}
                  />
                  <span className="ml-2">{genderType.charAt(0).toUpperCase() + genderType.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={calculateBMI}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="calculate-button"
            >
              Calculate
            </button>
            <button
              onClick={resetForm}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              data-testid="reset-button"
            >
              Reset
            </button>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm mt-4" data-testid="error-message">
              {error}
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          {results.bmi ? (
            <div data-testid="result-section">
              <div className="flex items-center mb-4">
                <div className="text-4xl font-bold mr-4" data-testid="bmi-value">{results.bmi}</div>
                <div className={`px-3 py-1 rounded text-white font-semibold ${getBMIColor(results.bmi)}`} data-testid="bmi-category">
                  {results.category}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getBMIColor(results.bmi)}`} 
                    style={{ width: `${Math.min((results.bmi / 50) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  {['15', '18.5', '25', '30', '35', '40+'].map(value => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'BMI Prime', value: results.bmiPrime, testId: 'bmi-prime' },
                  { label: 'Body Fat %', value: `${results.bodyFat}%`, testId: 'body-fat' },
                  { 
                    label: 'Ideal Weight', 
                    value: `${results.idealWeight} ${getIdealWeightLabel()}`, 
                    testId: 'ideal-weight' 
                  },
                  { label: 'Health Risk', value: results.healthRisk, testId: 'health-risk' }
                ].map(({ label, value, testId }) => (
                  <div key={testId} className="bg-white p-3 rounded shadow-sm">
                    <div className="text-sm text-gray-600">{label}</div>
                    <div className="font-semibold" data-testid={testId}>{value}</div>
                  </div>
                ))}
                <div className="bg-white p-3 rounded shadow-sm col-span-2">
                  <div className="text-sm text-gray-600">Est. Daily Calories (BMR × 1.2)</div>
                  <div className="font-semibold" data-testid="daily-calories">{results.dailyCalories} kcal</div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>BMI = Body Mass Index</p>
                <p>BMI Prime = BMI / 25 (1.0 = optimal)</p>
                <p>Body fat percentage is estimated using a formula based on BMI and age</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Enter your measurements and click calculate to see your results.
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Measurement History</h2>
          <div>
            <button
              onClick={toggleHistory}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="toggle-history-button"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                data-testid="clear-history-button"
              >
                Clear History
              </button>
            )}
          </div>
        </div>
        
        {showHistory && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm" data-testid="history-section">
            {history.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No history yet. Your BMI calculations will appear here.
              </div>
            ) : (
              <>
                {/* Filter section */}
                <div className="mb-4 bg-white p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-medium mb-3">Filter History</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="minAge" className="block text-sm font-medium text-gray-700 mb-1">
                        Min Age
                      </label>
                      <input
                        id="minAge"
                        name="minAge"
                        type="number"
                        value={filters.minAge}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Min age"
                        data-testid="min-age-filter"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="maxAge" className="block text-sm font-medium text-gray-700 mb-1">
                        Max Age
                      </label>
                      <input
                        id="maxAge"
                        name="maxAge"
                        type="number"
                        value={filters.maxAge}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Max age"
                        data-testid="max-age-filter"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        BMI Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        data-testid="category-filter"
                      >
                        <option value="">All Categories</option>
                        {uniqueCategories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={filters.gender}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        data-testid="gender-filter"
                      >
                        <option value="">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={resetFilters}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                      data-testid="reset-filters-button"
                    >
                      Reset Filters
                    </button>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    Showing {filteredHistory.length} of {history.length} records
                  </div>
                </div>
                
                {/* History table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        {['Date & Time', 'Weight', 'Height', 'Age', 'Gender', 'BMI', 'Category'].map(header => (
                          <th key={header} className="px-4 py-2 text-left">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                            No records match your filter criteria
                          </td>
                        </tr>
                      ) : (
                        filteredHistory.map((entry, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2">{entry.timestamp}</td>
                            <td className="px-4 py-2">
                              {`${entry.measurements.weight} ${entry.measurements.unit === 'metric' ? 'kg' : 'lbs'}`}
                            </td>
                            <td className="px-4 py-2">
                              {`${entry.measurements.height} ${entry.measurements.unit === 'metric' ? 'cm' : 'in'}`}
                            </td>
                            <td className="px-4 py-2">{entry.measurements.age}</td>
                            <td className="px-4 py-2">
                              {entry.measurements.gender.charAt(0).toUpperCase() + entry.measurements.gender.slice(1)}
                            </td>
                            <td className="px-4 py-2">{entry.results.bmi}</td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-0.5 rounded text-white text-sm ${getBMIColor(entry.results.bmi)}`}>
                                {entry.results.category}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">BMI Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { color: 'blue', range: '< 18.5', label: 'Underweight' },
            { color: 'green', range: '18.5 - 24.9', label: 'Normal' },
            { color: 'yellow', range: '25 - 29.9', label: 'Overweight' },
            { color: 'red', range: '≥ 30', label: 'Obese' }
          ].map(({ color, range, label }) => (
            <div key={label} className={`p-2 rounded bg-${color}-400 text-white text-center text-sm`}>
              {`${range}: ${label}`}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Note: BMI is a screening tool, but it does not diagnose body fatness or health. 
          BMI calculations may be less accurate for athletes, elderly people, and pregnant women.
        </p>
      </div>
    </div>
  );
}

export default AdvancedBMICalculator;