import { useState, useEffect } from 'react';
import './SmartUnitConverter.css';

function SmartUnitConverter() {
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
  const [showHistory, setShowHistory] = useState(false);

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

  const resetFilters = () => {
    setFilterCategory('');
    setFilterFrom('');
    setFilterTo('');
  };

  const toggleHistory = () => setShowHistory(!showHistory);
  
  const clearHistory = () => {
    setRecentConversions([]);
    setShowHistory(false);
  };

  // Determine the strength color class for different categories
  const getCategoryColorClass = (category) => {
    const categoryMap = {
      "Length": "category-purple",
      "Weight": "category-green"
    };
    
    return categoryMap[category] || "category-default";
  };

  const getCategoryColorClass1 = (category) => {
    const categoryMap = {
      "Length": "category-purple1",
      "Weight": "category-green1"
    };
    
    return categoryMap[category] || "category-default";
  };

  return (
    <div className="converter-container">
      <h1 className="converter-title">Smart Unit Converter</h1>
      
      <div className="converter-grid">
        <div className="converter-card">
          <h2 className="section-title">Conversion Settings</h2>
          
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
              data-testid="category-select"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            {selectedCategory && (
              <div className={`category-badge ${getCategoryColorClass(selectedCategory)}`}>
                {selectedCategory}
              </div>
            )}
          </div>
          
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
                  data-testid="value-input"
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
                    data-testid="from-unit-select"
                  >
                    {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                  </select>
                </div>
                
                <div className="swap-container">
                  <button 
                    onClick={swapUnits} 
                    className="swap-button"
                    aria-label="Swap units"
                    data-testid="swap-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 16V4m0 0L3 8m4-4l4 4" />
                      <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>
                
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
                    data-testid="to-unit-select"
                  >
                    {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                  </select>
                </div>
              </div>
              
              <button 
                onClick={handleConvert} 
                disabled={loading}
                className="convert-button"
                data-testid="convert-button"
              >
                {loading ? 
                  <span className="spinner"></span> : 
                  null
                }
                Convert
              </button>
            </>
          )}
          
          {error && (
            <div className="error-message" data-testid="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" x2="12" y1="8" y2="12"></line>
                <line x1="12" x2="12.01" y1="16" y2="16"></line>
              </svg>
              {error}
            </div>
          )}
        </div>
        
        <div className="converter-card">
          <h2 className="section-title">Results</h2>
          
          {convertedValue !== null ? (
            <div className="results-section" data-testid="results-section">
              <div className="conversion-path">
                <div className="path-item">
                  <span className="path-value">{inputValue}</span>
                  <span className="path-unit">{fromUnit}</span>
                </div>
                <div className="path-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
                <div className="path-item">
                  <span className="path-value">{convertedValue}</span>
                  <span className="path-unit">{toUnit}</span>
                </div>
              </div>
              
              <div className={`result-box ${getCategoryColorClass1(selectedCategory)}`}>
                <div className="result-label">Result</div>
                <div className="result-value" data-testid="result-value">{convertedValue}</div>
                <div className="result-unit" data-testid="result-unit">{toUnit}</div>
              </div>
              
              <div className="result-note">
                <p>This conversion is based on standard conversion formulas for {selectedCategory}.</p>
              </div>
             
            </div>
          ) : (
            <div className="empty-results">
              Enter a value and select units to see your conversion results.
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Conversions / History */}
      <div className="history-section">
        <div className="history-header">
          <h2 className="section-title">Conversion History</h2>
          <div className="history-actions">
            <button
              onClick={toggleHistory}
              className="toggle-history-button"
              data-testid="toggle-history-button"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
            {recentConversions.length > 0 && (
              <button
                onClick={clearHistory}
                className="clear-history-button"
                data-testid="clear-history-button"
              >
                Clear History
              </button>
            )}
          </div>
        </div>
        
        {showHistory && (
          <div className="history-content" data-testid="history-section">
            {recentConversions.length === 0 ? (
              <div className="empty-history">
                No history yet. Your conversions will appear here.
              </div>
            ) : (
              <>
                {/* Filter section */}
                <div className="filter-box">
                  <h3 className="filter-title">Filter History</h3>
                  <div className="filter-grid">
                    <div className="filter-group">
                      <label htmlFor="filterCategory" className="form-label">
                        Category
                      </label>
                      <select
                        id="filterCategory"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="form-select"
                        data-testid="category-filter"
                      >
                        <option value="">All Categories</option>
                        {[...new Set(recentConversions.map(conv => conv.category))].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label htmlFor="filterFrom" className="form-label">
                        From Unit
                      </label>
                      <select
                        id="filterFrom"
                        value={filterFrom}
                        onChange={(e) => setFilterFrom(e.target.value)}
                        className="form-select"
                        data-testid="from-filter"
                      >
                        <option value="">All From Units</option>
                        {[...new Set(recentConversions.map(conv => conv.from))].map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label htmlFor="filterTo" className="form-label">
                        To Unit
                      </label>
                      <select
                        id="filterTo"
                        value={filterTo}
                        onChange={(e) => setFilterTo(e.target.value)}
                        className="form-select"
                        data-testid="to-filter"
                      >
                        <option value="">All To Units</option>
                        {[...new Set(recentConversions.map(conv => conv.to))].map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="filter-actions">
                    <button
                      onClick={resetFilters}
                      className="reset-filters-button"
                      data-testid="reset-filters-button"
                    >
                      Reset Filters
                    </button>
                  </div>
                  
                  <div className="filter-stats">
                    Showing {filteredConversions.length} of {recentConversions.length} records
                  </div>
                </div>
                
                {/* History table */}
                <div className="table-container">
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                        <th>Result</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredConversions.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="empty-results-row">
                            No records match your filter criteria
                          </td>
                        </tr>
                      ) : (
                        filteredConversions.map((conv, index) => (
                          <tr key={conv.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <td>
                              <span className={`category-pill ${getCategoryColorClass(conv.category)}`}>
                                {conv.category}
                              </span>
                            </td>
                            <td>{conv.from}</td>
                            <td>{conv.to}</td>
                            <td>{conv.inputValue}</td>
                            <td>{conv.result}</td>
                            <td className="action-cell">
                              <button 
                                onClick={() => {
                                  setSelectedCategory(conv.category);
                                  setFromUnit(conv.from);
                                  setToUnit(conv.to);
                                  setInputValue(conv.inputValue);
                                  setConvertedValue(conv.result);
                                }}
                                className="use-again-button"
                                data-testid="use-again-button"
                              >
                                Use again
                              </button>
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
      
<div className="info-box">
  <h2 className="section-title">Unit Categories</h2>
  <div className="category-showcase">
    <div className="category-item category-green">Weight</div>
    <div className="category-item category-purple">Length</div>
  </div>
  
  <div className="conversion-cards">
    <div className="conversion-card category-border-green">
      <div className="conversion-card-header">
        <div className="category-badge category-green">Weight</div>
        <div className="units-badge">g, kg, lb</div>
      </div>
      <div className="conversion-card-body">
        <div className="conversion-visual">
          <div className="unit-circle">1 kg</div>
          <div className="conversion-arrow">→</div>
          <div className="unit-circle">2.2 lb</div>
        </div>
        <p className="conversion-description">
          Convert between grams, kilograms and pounds with precision. Weight units are 
          essential for cooking, fitness, shipping, and scientific measurements.
        </p>
      </div>
    </div>
    
    <div className="conversion-card category-border-purple">
      <div className="conversion-card-header">
        <div className="category-badge category-purple">Length</div>
        <div className="units-badge">cm, m, ft</div>
      </div>
      <div className="conversion-card-body">
        <div className="conversion-visual">
          <div className="unit-circle">1 m</div>
          <div className="conversion-arrow">→</div>
          <div className="unit-circle">3.28 ft</div>
        </div>
        <p className="conversion-description">
          Easily convert between centimeters, meters and feet. Length conversions are 
          commonly used in construction, design, travel, and everyday measurements.
        </p>
      </div>
    </div>
  </div>
  
  <p className="helper-text">
    This unit converter provides accurate conversions across various measurement categories. 
    All conversions are based on standard conversion rates and formulas recognized internationally.
    Historical data is stored locally in your browser session.
  </p>
</div>

    </div>
  );
}

export default SmartUnitConverter;