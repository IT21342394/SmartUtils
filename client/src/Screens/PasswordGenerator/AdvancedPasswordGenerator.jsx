import { useState, useEffect } from 'react';
import './PasswordGenerator.css'; // Import the CSS file

function AdvancedPasswordGenerator() {
  // State variables
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  });
  
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  
  // Filter options
  const [filters, setFilters] = useState({
    minLength: '',
    maxLength: '',
    strength: '',
    hasSymbols: ''
  });

  // Generate password on component mount and when options change
  useEffect(() => {
    generatePassword();
  }, [options.length, options.includeUppercase, options.includeLowercase, options.includeNumbers, options.includeSymbols]);

  // Handle input changes for password options
  const handleOptionChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseInt(value)
    }));
  };

  // Handle filter changes
  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate password based on selected options
  const generatePassword = () => {
    setError('');
    
    const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;
    
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_-+={}[]|:;<>,.?/~';

    // Ensure at least one character set is selected
    if (charset === '') {
      setError('Please select at least one character type');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    
    setPassword(newPassword);
    setCopied(false);
    
    // Calculate strength
    calculatePasswordStrength(newPassword);
    
    // Add to history
    const timestamp = new Date().toLocaleString();
    const hasSymbols = includeSymbols ? 'Yes' : 'No';
    
    setHistory(prev => [
      { 
        timestamp, 
        password: newPassword,
        length,
        strength: getStrengthText(passwordStrength), 
        hasSymbols
      },
      ...prev
    ]);
  };

  // Calculate password strength
  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    
    // Length factor
    if (pass.length >= 8) strength += 1;
    if (pass.length >= 12) strength += 1;
    if (pass.length >= 16) strength += 1;
    if (pass.length >= 20) strength += 1;

    // Character variety factors
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[a-z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;

    setPasswordStrength(Math.min(strength, 5));
  };

  const resetForm = () => {
    setOptions({
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
    });
    setPassword('');
    setError('');
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      minLength: '',
      maxLength: '',
      strength: '',
      hasSymbols: ''
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleHistory = () => setShowHistory(!showHistory);
  const clearHistory = () => {
    setHistory([]);
    setShowHistory(false);
  };

  const getStrengthColor = (strength) => {
    if (strength <= 1) return 'badge-red';
    if (strength <= 2) return 'badge-orange';
    if (strength <= 3) return 'badge-yellow';
    if (strength <= 4) return 'badge-blue';
    return 'badge-green';
  };

  const getStrengthText = (strength) => {
    if (strength <= 1) return 'Very Weak';
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Moderate';
    if (strength <= 4) return 'Strong';
    return 'Very Strong';
  };
  
  // Filter history based on selected filters
  const filteredHistory = history.filter(entry => {
    const lengthMatch = 
      (filters.minLength === '' || entry.length >= parseInt(filters.minLength)) &&
      (filters.maxLength === '' || entry.length <= parseInt(filters.maxLength));
    
    const strengthMatch = 
      filters.strength === '' || 
      entry.strength.toLowerCase().includes(filters.strength.toLowerCase());
    
    const symbolsMatch = 
      filters.hasSymbols === '' || 
      (filters.hasSymbols === 'yes' && entry.hasSymbols === 'Yes') ||
      (filters.hasSymbols === 'no' && entry.hasSymbols === 'No');
    
    return lengthMatch && strengthMatch && symbolsMatch;
  });

  // Get unique strength values from history for the dropdown
  const uniqueStrengths = [...new Set(history.map(entry => entry.strength))];

  return (
    <div className="container">
      <h1>Advanced Password Generator</h1>
      
      <div className="grid md-grid-cols-2">
        <div className="card">
          <h2>Password Options</h2>
          
          <div className="mb-4">
            <label htmlFor="length" className="form-label">
              Password Length: {options.length}
            </label>
            <input
              id="length"
              name="length"
              type="range"
              min="8"
              max="30"
              value={options.length}
              onChange={handleOptionChange}
              className="range-slider"
              data-testid="length-slider"
            />
            <div className="range-marks">
              <span>8</span>
              <span>30</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label">
              Character Types
            </label>
            
            <div className="checkbox-group">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="includeUppercase"
                  name="includeUppercase"
                  checked={options.includeUppercase}
                  onChange={handleOptionChange}
                  className="checkbox"
                  data-testid="uppercase-checkbox"
                />
                <label htmlFor="includeUppercase" className="checkbox-label">
                  Uppercase (A-Z)
                </label>
              </div>
              
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="includeLowercase"
                  name="includeLowercase"
                  checked={options.includeLowercase}
                  onChange={handleOptionChange}
                  className="checkbox"
                  data-testid="lowercase-checkbox"
                />
                <label htmlFor="includeLowercase" className="checkbox-label">
                  Lowercase (a-z)
                </label>
              </div>
              
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="includeNumbers"
                  name="includeNumbers"
                  checked={options.includeNumbers}
                  onChange={handleOptionChange}
                  className="checkbox"
                  data-testid="numbers-checkbox"
                />
                <label htmlFor="includeNumbers" className="checkbox-label">
                  Numbers (0-9)
                </label>
              </div>
              
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="includeSymbols"
                  name="includeSymbols"
                  checked={options.includeSymbols}
                  onChange={handleOptionChange}
                  className="checkbox"
                  data-testid="symbols-checkbox"
                />
                <label htmlFor="includeSymbols" className="checkbox-label">
                  Symbols (!@#$%)
                </label>
              </div>
            </div>
          </div>
          
          <div className="btn-group">
            <button
              onClick={generatePassword}
              className="btn btn-primary btn-flex"
              data-testid="generate-button"
            >
              Generate Password
            </button>
            <button
              onClick={resetForm}
              className="btn btn-secondary btn-flex"
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
          <h2>Generated Password</h2>
          
          {password ? (
            <div data-testid="result-section">
              <div className="input-group mb-4">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="input"
                  data-testid="password-output"
                />
                <button
                  onClick={copyToClipboard}
                  className="btn btn-primary"
                  data-testid="copy-button"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="mb-6">
                <div className="strength-header">
                  <span>Strength:</span>
                  <span className={`strength-text ${
                    passwordStrength > 3 ? 'strength-strong' : 
                    passwordStrength > 2 ? 'strength-moderate' : 'strength-weak'}`}
                    data-testid="strength-text"
                  >
                    {getStrengthText(passwordStrength)}
                  </span>
                </div>
                <div className="strength-meter" data-testid="strength-meter">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`strength-segment ${i < passwordStrength ? getStrengthColor(passwordStrength) : ''}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="analysis-box">
                <h3>Password Analysis</h3>
                <div className="analysis-grid">
                  <div>
                    <div className="analysis-item-label">Length</div>
                    <div className="analysis-item-value" data-testid="length-value">{password.length} characters</div>
                  </div>
                  <div>
                    <div className="analysis-item-label">Uppercase</div>
                    <div className="analysis-item-value" data-testid="has-uppercase">
                      {/[A-Z]/.test(password) ? 'Yes' : 'No'}
                    </div>
                  </div>
                  <div>
                    <div className="analysis-item-label">Lowercase</div>
                    <div className="analysis-item-value" data-testid="has-lowercase">
                      {/[a-z]/.test(password) ? 'Yes' : 'No'}
                    </div>
                  </div>
                  <div>
                    <div className="analysis-item-label">Numbers</div>
                    <div className="analysis-item-value" data-testid="has-numbers">
                      {/[0-9]/.test(password) ? 'Yes' : 'No'}
                    </div>
                  </div>
                  <div>
                    <div className="analysis-item-label">Symbols</div>
                    <div className="analysis-item-value" data-testid="has-symbols">
                      {/[^A-Za-z0-9]/.test(password) ? 'Yes' : 'No'}
                    </div>
                  </div>
                  <div>
                    <div className="analysis-item-label">Entropy</div>
                    <div className="analysis-item-value" data-testid="entropy-value">
                      {Math.round(Math.log2(
                        (options.includeUppercase ? 26 : 0) + 
                        (options.includeLowercase ? 26 : 0) + 
                        (options.includeNumbers ? 10 : 0) + 
                        (options.includeSymbols ? 33 : 0)
                      ) * password.length)} bits
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              Configure options and click generate to create a password.
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="history-actions">
          <h2>Password History</h2>
          <div>
            <button
              onClick={toggleHistory}
              className="btn btn-info mr-2"
              data-testid="toggle-history-button"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="btn btn-danger"
                data-testid="clear-history-button"
              >
                Clear History
              </button>
            )}
          </div>
        </div>
        
        {showHistory && (
          <div className="history-section" data-testid="history-section">
            {history.length === 0 ? (
              <div className="empty-state">
                No history yet. Your generated passwords will appear here.
              </div>
            ) : (
              <>
                {/* Filter section */}
                <div className="filter-section">
                  <h3>Filter History</h3>
                  <div className="grid md-grid-cols-4">
                    <div>
                      <label htmlFor="minLength" className="form-label">
                        Min Length
                      </label>
                      <input
                        id="minLength"
                        name="minLength"
                        type="number"
                        value={filters.minLength}
                        onChange={handleFilterChange}
                        className="form-control"
                        placeholder="Min length"
                        data-testid="min-length-filter"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="maxLength" className="form-label">
                        Max Length
                      </label>
                      <input
                        id="maxLength"
                        name="maxLength"
                        type="number"
                        value={filters.maxLength}
                        onChange={handleFilterChange}
                        className="form-control"
                        placeholder="Max length"
                        data-testid="max-length-filter"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="strength" className="form-label">
                        Password Strength
                      </label>
                      <select
                        id="strength"
                        name="strength"
                        value={filters.strength}
                        onChange={handleFilterChange}
                        className="form-control"
                        data-testid="strength-filter"
                      >
                        <option value="">All Strengths</option>
                        {uniqueStrengths.map(strength => (
                          <option key={strength} value={strength}>
                            {strength}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="hasSymbols" className="form-label">
                        Has Symbols
                      </label>
                      <select               
                        id="hasSymbols"
                        name="hasSymbols"
                        value={filters.hasSymbols}
                        onChange={handleFilterChange}
                        className="form-control"
                        data-testid="symbols-filter"
                      >
                        <option value="">All</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="filter-actions">
                    <button
                      onClick={resetFilters}
                      className="btn btn-secondary"
                      data-testid="reset-filters-button"
                    >
                      Reset Filters
                    </button>
                  </div>
                  
                  <div className="filter-status">
                    Showing {filteredHistory.length} of {history.length} records
                  </div>
                </div>
                
                {/* History table */}
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Password</th>
                        <th>Length</th>
                        <th>Strength</th>
                        <th>Has Symbols</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="table-empty">
                            No records match your filter criteria
                          </td>
                        </tr>
                      ) : (
                        filteredHistory.map((entry, index) => (
                          <tr key={index}>
                            <td>{entry.timestamp}</td>
                            <td className="mono text-sm">{entry.password.slice(0, 8)}•••••</td>
                            <td>{entry.length}</td>
                            <td>
                              <span className={`badge ${
                                entry.strength === 'Very Strong' ? 'badge-green' :
                                entry.strength === 'Strong' ? 'badge-blue' :
                                entry.strength === 'Moderate' ? 'badge-yellow' :
                                entry.strength === 'Weak' ? 'badge-orange' :
                                'badge-red'
                              }`}>
                                {entry.strength}
                              </span>
                            </td>
                            <td>{entry.hasSymbols}</td>
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
      
      <div className="card">
        <h2>Password Strength Categories</h2>
        <div className="strength-categories">
          <div className="strength-category very-weak">Very Weak</div>
          <div className="strength-category weak">Weak</div>
          <div className="strength-category moderate">Moderate</div>
          <div className="strength-category strong">Strong</div>
          <div className="strength-category very-strong">Very Strong</div>
        </div>
        <p className="helper-text mt-2">
          Note: A strong password uses a mix of character types and sufficient length. 
          For sensitive accounts, use at least 14 characters with a mix of uppercase, lowercase, numbers, and symbols.
        </p>
      </div>
      
      {copied && (
        <div className="notification">Password copied to clipboard!</div>
      )}
    </div>
  );
}

export default AdvancedPasswordGenerator;