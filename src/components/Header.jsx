import React, { useState, useEffect, useRef } from 'react';

const Header = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const helpDropdownRef = useRef(null);
  const helpTriggerRef = useRef(null);

  // Handle scroll for sticky nav condensing
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close help dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target) &&
          helpTriggerRef.current && !helpTriggerRef.current.contains(event.target)) {
        setIsHelpOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsMenuOpen(false);
      setIsHelpOpen(false);
      setIsSearchExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const primaryLinks = [
    { id: 'home', label: 'Search', path: '/' },
    { id: 'watchlist', label: 'Watchlist', path: '/watchlist', badge: 3 },
    { id: 'search-results', label: 'Results', path: '/results' },
    { id: 'flight-details', label: 'Details', path: '/details' }
  ];

  const helpItems = [
    { label: 'FAQ', description: 'Common questions answered' },
    { label: 'Methodology', description: 'How our predictions work' },
    { label: 'Contact', description: 'Get in touch with support' },
    { label: 'Coverage', description: 'Airlines and routes we track' }
  ];

  return (
    <nav 
      aria-label="Main navigation"
      className={`sticky top-0 bg-white border-b border-gray-200 z-50 transition-all duration-200 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="container">
        <div className={`flex items-center justify-between transition-all duration-200 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}>
          
          {/* Left Zone: Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2 rounded-lg p-1"
              aria-label="FlyWise home"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary-blue rounded-lg group-hover:bg-light-blue transition-colors duration-200">
                <div className="w-3 h-3 bg-accent-yellow rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-primary-blue group-hover:text-light-blue transition-colors duration-200">
                FlyWise
              </span>
            </button>
          </div>
          
          {/* Center Zone: Primary Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            {primaryLinks.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2 rounded-md ${
                  currentPage === item.id
                    ? 'text-primary-blue font-bold'
                    : 'text-gray-700 hover:text-primary-blue'
                }`}
                style={{ minHeight: '44px' }}
              >
                <span className="relative">
                  {item.label}
                  {item.badge && (
                    <span className="absolute -top-2 -right-3 bg-accent-yellow text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </span>
                
                {/* Active page indicator */}
                {currentPage === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-yellow rounded-full"></div>
                )}
                
                {/* Hover underline */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-light-blue transform origin-left transition-transform duration-200 ${
                  currentPage !== item.id ? 'scale-x-0 hover:scale-x-100' : 'scale-x-0'
                }`}></div>
              </button>
            ))}
            
            {/* Help Dropdown */}
            <div className="relative">
              <button
                ref={helpTriggerRef}
                onClick={() => setIsHelpOpen(!isHelpOpen)}
                onMouseEnter={() => setIsHelpOpen(true)}
                className="px-4 py-3 font-medium text-gray-700 hover:text-primary-blue transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2 rounded-md flex items-center gap-1"
                aria-expanded={isHelpOpen}
                aria-controls="help-dropdown"
                style={{ minHeight: '44px' }}
              >
                Help
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className={`transition-transform duration-200 ${isHelpOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
              
              {/* Help Dropdown Menu */}
              {isHelpOpen && (
                <div
                  ref={helpDropdownRef}
                  id="help-dropdown"
                  role="menu"
                  onMouseLeave={() => setIsHelpOpen(false)}
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                >
                  {helpItems.map((item, index) => (
                    <button
                      key={index}
                      role="menuitem"
                      className="w-full text-left px-4 py-3 hover:bg-ultra-light-blue transition-colors duration-200 focus:outline-none focus:bg-ultra-light-blue"
                      onClick={() => {
                        setIsHelpOpen(false);
                      }}
                    >
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Zone: Search & Utility */}
          <div className="flex items-center gap-4">
            {/* Expandable Search (Desktop) */}
            <div className="hidden md:flex items-center">
              {!isSearchExpanded ? (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-3 text-gray-600 hover:text-primary-blue hover:bg-ultra-light-blue rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2"
                  aria-label="Open search"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </button>
              ) : (
                <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 border-2 border-light-blue transition-all duration-300">
                  <input
                    type="text"
                    placeholder="From"
                    className="bg-transparent border-none outline-none w-20 text-sm"
                    autoFocus
                    onBlur={() => setIsSearchExpanded(false)}
                  />
                  <span className="text-gray-400 mx-2">→</span>
                  <input
                    type="text"
                    placeholder="To"
                    className="bg-transparent border-none outline-none w-20 text-sm"
                  />
                  <input
                    type="date"
                    className="bg-transparent border-none outline-none w-32 text-sm ml-2"
                  />
                  <button 
                    onClick={() => setIsSearchExpanded(false)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    aria-label="Close search"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            
            {/* Notifications */}
            <button 
              onClick={() => onNavigate('watchlist')}
              className="relative p-3 text-gray-600 hover:text-primary-blue hover:bg-ultra-light-blue rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2"
              aria-label="View alerts (3 new)"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
              <span className="absolute -top-1 -right-1 bg-accent-yellow text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>
            
            {/* CTA Button */}
            <button className="hidden md:flex btn btn-primary items-center gap-2 px-6 py-3 font-semibold transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-deep-yellow focus:ring-offset-2">
              Track Route
            </button>
            
            {/* User Avatar */}
            <button className="w-10 h-10 bg-light-blue rounded-full flex items-center justify-center text-white font-bold hover:bg-primary-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2">
              T
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-600 hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-200">
                {isMenuOpen ? (
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                ) : (
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            
            {/* Drawer */}
            <div className="fixed top-0 left-0 w-80 h-full bg-white z-50 lg:hidden">
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary-blue rounded-lg">
                      <div className="w-2 h-2 bg-accent-yellow rounded-full"></div>
                    </div>
                    <span className="text-lg font-bold text-primary-blue">FlyWise</span>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-600 hover:text-primary-blue rounded-md"
                    aria-label="Close menu"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
                
                {/* Mobile Search */}
                <div className="p-6 border-b border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="From"
                        className="form-input text-sm"
                      />
                      <input
                        type="text"
                        placeholder="To"
                        className="form-input text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="date"
                        className="form-input text-sm"
                      />
                      <select className="form-input text-sm">
                        <option>1 passenger</option>
                        <option>2 passengers</option>
                        <option>3+ passengers</option>
                      </select>
                    </div>
                    <button className="btn btn-primary w-full text-sm">
                      Search Flights
                    </button>
                  </div>
                </div>
                
                {/* Navigation Links */}
                <nav className="flex-1 py-6">
                  <div className="space-y-2 px-6">
                    {primaryLinks.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-blue ${
                          currentPage === item.id
                            ? 'bg-ultra-light-blue text-primary-blue font-semibold'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary-blue'
                        }`}
                        style={{ minHeight: '44px' }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.label}</span>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="bg-accent-yellow text-gray-900 text-xs rounded-full px-2 py-1 font-bold">
                                {item.badge}
                              </span>
                            )}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                    
                    {/* Help Items */}
                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <div className="text-sm font-semibold text-gray-500 px-4 mb-2">Help & Support</div>
                      {helpItems.map((item, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary-blue transition-colors duration-200 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>
                
                {/* CTA at Bottom */}
                <div className="p-6 border-t border-gray-200">
                  <button className="btn btn-primary w-full py-4 font-semibold text-center">
                    Track a Route
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
