
import React, { useState } from 'react';
import './header.css';
import './footer.css';
import './main-page.css';
import SmartUnitConverter from './Screens/UnitConverter/SmartUnitConverter';
import AdvancedBMICalculator from './Screens/BMICalculator/AdvancedBMICalculator';
import AdvancedPasswordGenerator from './Screens/PasswordGenerator/AdvancedPasswordGenerator';


const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Components for each utility
  const renderContent = () => {
    switch (activeTab) {
      case 'bmi':
        return <AdvancedBMICalculator />;
      case 'converter':
        return <SmartUnitConverter />;
      case 'interest':
        return <SmartUnitConverter />;
      case 'password':
        return <AdvancedPasswordGenerator/>;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-layout">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section" onClick={() => setActiveTab('home')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <h1 className="app-title">SmartUtils</h1>
          </div>
          
          <nav className="desktop-nav">
            <button 
              className={`nav-item ${activeTab === 'bmi' ? 'active' : ''}`}
              onClick={() => setActiveTab('bmi')}
            >
              BMI Calculator
            </button>
            <button 
              className={`nav-item ${activeTab === 'converter' ? 'active' : ''}`}
              onClick={() => setActiveTab('converter')}
            >
              Unit Converter
            </button>
            <button 
              className={`nav-item ${activeTab === 'interest' ? 'active' : ''}`}
              onClick={() => setActiveTab('interest')}
            >
              Interest Calculator
            </button>
            <button 
              className={`nav-item ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              Password Generator
            </button>
          </nav>
          
          <button className="mobile-menu-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

    

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-section-title">About SmartUtils</h3>
              <p className="footer-text">
                SmartUtils offers a collection of useful calculators and tools to help with everyday tasks.
                From health monitoring to unit conversion, financial planning, and security, we've got you covered.
              </p>
            </div>
            <div>
              <h3 className="footer-section-title">Quick Links</h3>
              <div className="footer-links">
                <button className="footer-link" onClick={() => setActiveTab('bmi')}>BMI & Health Indicator</button>
                <button className="footer-link" onClick={() => setActiveTab('converter')}>Smart Unit Converter</button>
                <button className="footer-link" onClick={() => setActiveTab('interest')}>Interest & Loan Calculator</button>
                <button className="footer-link" onClick={() => setActiveTab('password')}>Password Generator</button>
              </div>
            </div>
            <div>
              <h3 className="footer-section-title">Contact Us</h3>
              <p className="footer-text">
                Have suggestions or feedback? We'd love to hear from you!
              </p>
              <p className="footer-text" style={{ marginTop: '0.5rem' }}>
                Email: support@smartutils.com
              </p>
            </div>
          </div>
          <div className="footer-divider">
            <div className="footer-copyright">
              &copy; {new Date().getFullYear()} SmartUtils. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// HomePage Component
const HomePage = ({ setActiveTab }) => {
  const tools = [
    {
      id: 'bmi',
      name: 'BMI & Health Indicator',
      description: 'Calculate your BMI and get personalized health recommendations based on your age and gender.',
      iconClass: 'bmi'
    },
    {
      id: 'converter',
      name: 'Smart Unit Converter',
      description: 'Convert between different units of measurement including length and weight',
      iconClass: 'converter'
    },
    {
      id: 'interest',
      name: 'Interest & Loan Calculator',
      description: 'Calculate simple and compound interest, or determine monthly EMI payments for your loans.',
      iconClass: 'interest'
    },
    {
      id: 'password',
      name: 'Password Generator',
      description: 'Generate strong passwords and evaluate the strength of existing ones to enhance your online security.',
      iconClass: 'password'
    }
  ];

  const renderIcon = (iconClass) => {
    switch (iconClass) {
      case 'bmi':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`tool-icon ${iconClass}`} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'converter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`tool-icon ${iconClass}`} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case 'interest':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`tool-icon ${iconClass}`} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'password':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`tool-icon ${iconClass}`} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="homepage-header">
        <h1 className="homepage-title">Welcome to SmartUtils</h1>
        <p className="homepage-subtitle">
          Your all-in-one toolkit for everyday calculations and utilities. Choose from our selection of tools below:
        </p>
      </div>
      
      <div className="tools-grid">
        {tools.map(tool => (
          <div 
            key={tool.id}
            className="tool-card"
            onClick={() => setActiveTab(tool.id)}
          >
            {renderIcon(tool.iconClass)}
            <h2 className="tool-title">{tool.name}</h2>
            <p className="tool-description">{tool.description}</p>
            <button 
              className="tool-button"
              onClick={() => setActiveTab(tool.id)}
            >
              Open Tool
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default App;