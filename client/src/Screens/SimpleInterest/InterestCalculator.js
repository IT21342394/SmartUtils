import { useState } from 'react';
import './InterestCalculator.css';

function InterestCalculator() {
  // State management using object destructuring
  const [loanDetails, setLoanDetails] = useState({
    principal: '',
    rate: '',
    time: '',
    compoundingFrequency: 'annually',
    calculationType: 'simple'
  });
  
  const [results, setResults] = useState({
    simpleInterest: null,
    totalAmount: null,
    compoundInterest: null,
    effectiveRate: null,
    monthlyPayment: null
  });
  
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  
  // State for filter options
  const [filters, setFilters] = useState({
    minPrincipal: '',
    maxPrincipal: '',
    minRate: '',
    maxRate: '',
    calculationType: ''
  });

  // Input change handler using destructuring
  const handleInputChange = ({ target: { name, value } }) => {
    setLoanDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter change handler
  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateInterest = () => {
    setError('');
    
    // Destructure all needed values
    const { principal, rate, time, compoundingFrequency, calculationType } = loanDetails;
    
    if (!principal || !rate || !time) {
      setError('Please enter principal amount, interest rate, and time period');
      return;
    }

    const principalValue = parseFloat(principal);
    const rateValue = parseFloat(rate);
    const timeValue = parseFloat(time);

    if (isNaN(principalValue) || isNaN(rateValue) || isNaN(timeValue) || 
        principalValue <= 0 || rateValue <= 0 || timeValue <= 0) {
      setError('Please enter valid positive numbers');
      return;
    }

    // Convert annual rate to decimal
    const rateDecimal = rateValue / 100;
    
    // Calculate simple interest
    const simpleInterest = principalValue * rateDecimal * timeValue;
    const simpleTotalAmount = principalValue + simpleInterest;
    
    // Calculate compound interest
    let compoundTotalAmount, compoundInterest, effectiveRate, monthlyPayment;
    
    // Define compounding periods based on frequency
    const compoundingPeriodsMap = {
      'annually': 1,
      'semi-annually': 2,
      'quarterly': 4,
      'monthly': 12,
      'daily': 365
    };
    
    const periodsPerYear = compoundingPeriodsMap[compoundingFrequency];
    const totalPeriods = timeValue * periodsPerYear;
    
    compoundTotalAmount = principalValue * Math.pow(1 + (rateDecimal / periodsPerYear), totalPeriods);
    compoundInterest = compoundTotalAmount - principalValue;
    
    // Calculate effective annual rate
    effectiveRate = (Math.pow(1 + (rateDecimal / periodsPerYear), periodsPerYear) - 1) * 100;
    
    // Calculate approximate monthly payment (for loan amortization)
    const monthlyRate = rateDecimal / 12;
    const totalMonths = timeValue * 12;
    monthlyPayment = principalValue * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
                     (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const newResults = {
      simpleInterest: parseFloat(simpleInterest.toFixed(2)),
      totalAmount: calculationType === 'simple' ? 
                   parseFloat(simpleTotalAmount.toFixed(2)) : 
                   parseFloat(compoundTotalAmount.toFixed(2)),
      compoundInterest: parseFloat(compoundInterest.toFixed(2)),
      effectiveRate: parseFloat(effectiveRate.toFixed(2)),
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2))
    };
    
    setResults(newResults);
    
    // Add to history
    const timestamp = new Date().toLocaleString();
    setHistory(prev => [
      { timestamp, loanDetails: { ...loanDetails }, results: { ...newResults } },
      ...prev
    ]);
  };

  const resetForm = () => {
    setLoanDetails({
      principal: '',
      rate: '',
      time: '',
      compoundingFrequency: 'annually',
      calculationType: 'simple'
    });
    setResults({
      simpleInterest: null,
      totalAmount: null,
      compoundInterest: null,
      effectiveRate: null,
      monthlyPayment: null
    });
    setError('');
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      minPrincipal: '',
      maxPrincipal: '',
      minRate: '',
      maxRate: '',
      calculationType: ''
    });
  };

  // Toggle history display
  const toggleHistory = () => setShowHistory(!showHistory);
  
  // Clear history
  const clearHistory = () => {
    setHistory([]);
    setShowHistory(false);
  };

  // Get color based on interest rate
  const getRateColor = rate => {
    if (!rate) return 'bg-gray-200';
    if (rate < 5) return 'bg-green-400';
    if (rate < 10) return 'bg-blue-400';
    if (rate < 15) return 'bg-yellow-400';
    if (rate < 20) return 'bg-orange-400';
    return 'bg-red-400';
  };

  // Filter history based on selected filters
  const filteredHistory = history.filter(entry => {
    const principalMatch = 
      (filters.minPrincipal === '' || parseFloat(entry.loanDetails.principal) >= parseFloat(filters.minPrincipal)) &&
      (filters.maxPrincipal === '' || parseFloat(entry.loanDetails.principal) <= parseFloat(filters.maxPrincipal));
    
    const rateMatch = 
      (filters.minRate === '' || parseFloat(entry.loanDetails.rate) >= parseFloat(filters.minRate)) &&
      (filters.maxRate === '' || parseFloat(entry.loanDetails.rate) <= parseFloat(filters.maxRate));
    
    const calculationTypeMatch = 
      filters.calculationType === '' || 
      entry.loanDetails.calculationType === filters.calculationType;
    
    return principalMatch && rateMatch && calculationTypeMatch;
  });

  // Get unique calculation types from history for dropdown
  const uniqueCalculationTypes = [...new Set(history.map(entry => entry.loanDetails.calculationType))];

  // Define result items for rendering
  const getResultItems = () => {
    if (loanDetails.calculationType === 'simple') {
      return [
        { label: 'Principal Amount', value: `$${loanDetails.principal}`, testId: 'principal-result' },
        { label: 'Simple Interest', value: `$${results.simpleInterest}`, testId: 'simple-interest' },
        { label: 'Total Amount', value: `$${results.totalAmount}`, testId: 'total-amount' },
        { label: 'Annual Rate', value: `${loanDetails.rate}%`, testId: 'annual-rate' }
      ];
    } else {
      return [
        { label: 'Principal Amount', value: `$${loanDetails.principal}`, testId: 'principal-result' },
        { label: 'Compound Interest', value: `$${results.compoundInterest}`, testId: 'compound-interest' },
        { label: 'Total Amount', value: `$${results.totalAmount}`, testId: 'total-amount' },
        { label: 'Effective Annual Rate', value: `${results.effectiveRate}%`, testId: 'effective-rate' }
      ];
    }
  };

  return (
    <div className="calculator-container">
      <h1 className="calculator-title">Interest Calculator</h1>
      
      <div className="calculator-grid">
        <div className="card">
          <h2 className="card-title">Loan Details</h2>
          
          <div className="form-group">
            <label className="form-label">
              Calculation Type
            </label>
            <div className="radio-group">
              {['simple', 'compound'].map(type => (
                <label key={type} className="radio-label">
                  <input
                    type="radio"
                    name="calculationType"
                    value={type}
                    checked={loanDetails.calculationType === type}
                    onChange={handleInputChange}
                    className="radio-input"
                    data-testid={`${type}-radio`}
                  />
                  <span className="radio-text">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="principal" className="form-label">
              Principal Amount ($)
            </label>
            <input
              id="principal"
              name="principal"
              type="number"
              value={loanDetails.principal}
              onChange={handleInputChange}
              className="text-input"
              placeholder="Enter principal amount"
              data-testid="principal-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rate" className="form-label">
              Interest Rate (% per year)
            </label>
            <input
              id="rate"
              name="rate"
              type="number"
              value={loanDetails.rate}
              onChange={handleInputChange}
              className="text-input"
              placeholder="Enter annual interest rate"
              data-testid="rate-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="time" className="form-label">
              Time Period (years)
            </label>
            <input
              id="time"
              name="time"
              type="number"
              value={loanDetails.time}
              onChange={handleInputChange}
              className="text-input"
              placeholder="Enter time period"
              data-testid="time-input"
            />
          </div>
          
          {loanDetails.calculationType === 'compound' && (
            <div className="form-group">
              <label htmlFor="compoundingFrequency" className="form-label">
                Compounding Frequency
              </label>
              <select
                id="compoundingFrequency"
                name="compoundingFrequency"
                value={loanDetails.compoundingFrequency}
                onChange={handleInputChange}
                className="select-input"
                data-testid="frequency-select"
              >
                {['annually', 'semi-annually', 'quarterly', 'monthly', 'daily'].map(frequency => (
                  <option key={frequency} value={frequency}>
                    {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="button-group">
            <button
              onClick={calculateInterest}
              className="button button-primary"
              data-testid="calculate-button"
            >
              Calculate
            </button>
            <button
              onClick={resetForm}
              className="button button-secondary"
              data-testid="reset-button"
            >
              Reset
            </button>
          </div>
          
          {error && (
            <div className="error-message" data-testid="error-message">
              {error}
            </div>
          )}
        </div>
        
        <div className="card">
          <h2 className="card-title">Results</h2>
          
          {results.totalAmount ? (
            <div data-testid="result-section">
              <div className="result-header">
                <div className="result-amount" data-testid="total-amount-value">
                  ${results.totalAmount}
                </div>
                <div className={`rate-indicator ${getRateColor(loanDetails.rate)}`} data-testid="rate-indicator">
                  {loanDetails.rate}% Rate
                </div>
              </div>
              
              <div className="form-group">
                <div className="progress-container">
                  <div 
                    className={`progress-bar ${getRateColor(loanDetails.rate)}`} 
                    style={{ width: `${Math.min((parseFloat(loanDetails.rate) / 30) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="progress-labels">
                  {['0%', '5%', '10%', '15%', '20%', '25%+'].map(value => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
              </div>
              
              <div className="result-details">
                {getResultItems().map(({ label, value, testId }) => (
                  <div key={testId} className="result-item">
                    <div className="result-label">{label}</div>
                    <div className="result-value" data-testid={testId}>{value}</div>
                  </div>
                ))}
                <div className="result-item result-item-full">
                  <div className="result-label">Estimated Monthly Payment (Amortized)</div>
                  <div className="result-value" data-testid="monthly-payment">${results.monthlyPayment}</div>
                </div>
              </div>
              
              <div className="result-footer">
                <p>Interest Calculation: {loanDetails.calculationType === 'simple' ? 'Simple' : 'Compound'}</p>
                {loanDetails.calculationType === 'compound' && (
                  <p>Compounding Frequency: {loanDetails.compoundingFrequency.charAt(0).toUpperCase() + loanDetails.compoundingFrequency.slice(1)}</p>
                )}
                <p>Time Period: {loanDetails.time} years</p>
              </div>
            </div>
          ) : (
            <div className="results-container">
              Enter loan details and click calculate to see your results.
            </div>
          )}
        </div>
      </div>
      
      <div className="form-group">
        <div className="history-header">
          <h2 className="history-title">Calculation History</h2>
          <div>
            <button
              onClick={toggleHistory}
              className="button button-blue-light"
              data-testid="toggle-history-button"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="button button-red-light"
                data-testid="clear-history-button"
              >
                Clear History
              </button>
            )}
          </div>
        </div>
        
        {showHistory && (
          <div className="history-container" data-testid="history-section">
            {history.length === 0 ? (
              <div className="history-empty">
                No history yet. Your interest calculations will appear here.
              </div>
            ) : (
              <>
                {/* Filter section */}
                <div className="filter-container">
                  <h3 className="filter-title">Filter History</h3>
                  <div className="filter-grid">
                    <div>
                      <label htmlFor="minPrincipal" className="form-label">
                        Min Principal
                      </label>
                      <input
                        id="minPrincipal"
                        name="minPrincipal"
                        type="number"
                        value={filters.minPrincipal}
                        onChange={handleFilterChange}
                        className="text-input"
                        placeholder="Min principal"
                        data-testid="min-principal-filter"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="maxPrincipal" className="form-label">
                        Max Principal
                      </label>
                      <input
                        id="maxPrincipal"
                        name="maxPrincipal"
                        type="number"
                        value={filters.maxPrincipal}
                        onChange={handleFilterChange}
                        className="text-input"
                        placeholder="Max principal"
                        data-testid="max-principal-filter"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="minRate" className="form-label">
                        Min Rate (%)
                      </label>
                      <input
                        id="minRate"
                        name="minRate"
                        type="number"
                        value={filters.minRate}
                        onChange={handleFilterChange}
                        className="text-input"
                        placeholder="Min rate"
                        data-testid="min-rate-filter"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="maxRate" className="form-label">
                        Max Rate (%)
                      </label>
                      <input
                        id="maxRate"
                        name="maxRate"
                        type="number"
                        value={filters.maxRate}
                        onChange={handleFilterChange}
                        className="text-input"
                        placeholder="Max rate"
                        data-testid="max-rate-filter"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="calculationType" className="form-label">
                        Calculation Type
                      </label>
                      <select
                        id="calculationType"
                        name="calculationType"
                        value={filters.calculationType}
                        onChange={handleFilterChange}
                        className="select-input"
                        data-testid="calculation-type-filter"
                      >
                        <option value="">All Types</option>
                        {uniqueCalculationTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="filter-footer">
                    <button
                      onClick={resetFilters}
                      className="button button-secondary"
                      data-testid="reset-filters-button"
                    >
                      Reset Filters
                    </button>
                  </div>
                  
                  <div className="filter-summary">
                    Showing {filteredHistory.length} of {history.length} records
                  </div>
                </div>
                
                {/* History table */}
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr className="bg-gray-100">
                        {['Date & Time', 'Principal', 'Rate', 'Time', 'Type', 'Interest', 'Total Amount'].map(header => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="table-empty">
                            No records match your filter criteria
                          </td>
                        </tr>
                      ) : (
                        filteredHistory.map((entry, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                            <td>{entry.timestamp}</td>
                            <td>${entry.loanDetails.principal}</td>
                            <td>{entry.loanDetails.rate}%</td>
                            <td>{entry.loanDetails.time} years</td>
                            <td>
                              {entry.loanDetails.calculationType === 'simple' ? 'Simple' : 
                                `Compound (${entry.loanDetails.compoundingFrequency})`}
                            </td>
                            <td>
                              ${entry.loanDetails.calculationType === 'simple' ? 
                                entry.results.simpleInterest : 
                                entry.results.compoundInterest}
                            </td>
                            <td>
                              <span className={`rate-indicator ${getRateColor(entry.loanDetails.rate)}`}>
                                ${entry.results.totalAmount}
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
      
      <div className="rate-categories">
        <h2 className="rate-categories-title">Interest Rate Categories</h2>
        <div className="rate-categories-grid">
          {[
            { color: 'bg-green-400', range: '< 5%', label: 'Very Low' },
            { color: 'bg-blue-400', range: '5% - 9.9%', label: 'Low' },
            { color: 'bg-yellow-400', range: '10% - 14.9%', label: 'Moderate' },
            { color: 'bg-orange-400', range: '15% - 19.9%', label: 'High' },
            { color: 'bg-red-400', range: '≥ 20%', label: 'Very High' }
          ].map(({ color, range, label }) => (
            <div key={label} className={`rate-category ${color}`}>
              {`${range}: ${label}`}
            </div>
          ))}
        </div>
        <p className="rate-categories-note">
          Note: Interest rates vary by loan type, credit score, economic conditions, and lending institution.
          The monthly payment calculation assumes a standard amortized loan with equal payments.
        </p>
      </div>
    </div>
  );
}

export default InterestCalculator;