import React, { useState } from 'react';

const SearchResultsPage = () => {
  const [filters, setFilters] = useState({
    maxStops: 'any',
    departTime: [0, 24],
    arriveTime: [0, 24],
    airlines: [],
    priceRange: [200, 800],
    duration: [0, 12],
    layoverMin: 30
  });

  const [sortBy, setSortBy] = useState('best');
  const [compareList, setCompareList] = useState([]);

  // Mock flight data
  const flights = [
    {
      id: 1,
      airline: 'Alaska Airlines',
      logo: '🛫',
      departure: { time: '7:30 AM', airport: 'SEA' },
      arrival: { time: '3:45 PM', airport: 'JFK' },
      duration: '5h 15m',
      stops: 0,
      price: 285,
      recommendation: 'WATCH',
      confidence: 'med',
      insight: 'Likely to drop ~$35 in 5–7 days (60% conf.)',
      fareType: 'Main Cabin'
    },
    {
      id: 2,
      airline: 'Delta',
      logo: '✈️',
      departure: { time: '9:15 AM', airport: 'SEA' },
      arrival: { time: '6:20 PM', airport: 'JFK' },
      duration: '6h 5m',
      stops: 1,
      price: 245,
      recommendation: 'BUY',
      confidence: 'high',
      insight: 'Expected to rise $50+ in 2-3 days',
      fareType: 'Basic Economy'
    },
    {
      id: 3,
      airline: 'United',
      logo: '🛩️',
      departure: { time: '2:30 PM', airport: 'SEA' },
      arrival: { time: '10:55 PM', airport: 'JFK' },
      duration: '5h 25m',
      stops: 0,
      price: 320,
      recommendation: 'WATCH',
      confidence: 'low',
      insight: 'Uncertain. If timing matters more than price, consider buying.',
      fareType: 'Economy'
    }
  ];

  const handleCompareToggle = (flightId) => {
    setCompareList(prev => 
      prev.includes(flightId) 
        ? prev.filter(id => id !== flightId)
        : prev.length < 3 ? [...prev, flightId] : prev
    );
  };

  const FlightCard = ({ flight, isExpanded, onToggleExpand }) => (
    <div className="card mb-4">
      <div className="card-body">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{flight.logo}</span>
            <div>
              <div className="font-bold text-gray-900">{flight.airline}</div>
              <div className="text-sm text-gray-500">{flight.fareType}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Flight Times */}
            <div className="text-center">
              <div className="font-bold text-lg">{flight.departure.time}</div>
              <div className="text-sm text-gray-500">{flight.departure.airport}</div>
            </div>
            
            <div className="flex flex-col items-center text-gray-400">
              <div className="text-xs">{flight.duration}</div>
              <div className="w-20 h-px bg-gray-300 my-1"></div>
              <div className="text-xs">{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</div>
            </div>
            
            <div className="text-center">
              <div className="font-bold text-lg">{flight.arrival.time}</div>
              <div className="text-sm text-gray-500">{flight.arrival.airport}</div>
            </div>
            
            {/* Price & Recommendation */}
            <div className="text-center">
              <div className="text-2xl font-bold">${flight.price}</div>
              <div className="flex gap-1 mt-1">
                <span className={`badge ${flight.recommendation === 'BUY' ? 'badge-buy' : 'badge-watch'}`}>
                  {flight.recommendation}
                </span>
                <span className={`badge badge-confidence-${flight.confidence}`}>
                  {flight.confidence} conf
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Insight Strip */}
        <div className="bg-ultra-light-blue rounded p-3 mb-4">
          <div className="text-sm">
            <strong>Insight:</strong> {flight.insight}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button 
              onClick={() => onToggleExpand(flight.id)}
              className="btn btn-outline text-sm"
            >
              {isExpanded ? 'Less Details' : 'Price Insights'}
            </button>
            <button className="btn btn-outline text-sm">
              View Details
            </button>
          </div>
          
          <div className="flex gap-3">
            <button className="btn btn-outline text-sm">
              Track Price
            </button>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={compareList.includes(flight.id)}
                onChange={() => handleCompareToggle(flight.id)}
                disabled={!compareList.includes(flight.id) && compareList.length >= 3}
                className="w-4 h-4"
              />
              Compare
            </label>
          </div>
        </div>
        
        {/* Expanded Price Insights */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-bold mb-4">Price Insights & Forecast</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mock Chart */}
              <div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="h-32 bg-ultra-light-blue rounded flex items-center justify-center relative">
                    {/* Simple line chart representation */}
                    <div className="absolute inset-4">
                      <svg className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke="var(--light-blue)"
                          strokeWidth="2"
                          points="0,80 40,70 80,60 120,75 160,65 200,85"
                        />
                        {/* Yellow confidence band */}
                        <rect 
                          x="120" 
                          y="50" 
                          width="80" 
                          height="40" 
                          fill="var(--accent-yellow)" 
                          fillOpacity="0.2"
                        />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500 absolute bottom-1 left-2">
                      7 days ago
                    </div>
                    <div className="text-xs text-gray-500 absolute bottom-1 right-2">
                      Next 14 days
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    <strong>Current:</strong> $285 (↓$15 from yesterday)
                  </div>
                </div>
              </div>
              
              {/* Why This Recommendation */}
              <div>
                <h5 className="font-bold mb-3">Why WATCH?</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-yellow">•</span>
                    <span>Seasonal dip expected (historical pattern)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-yellow">•</span>
                    <span>Post-holiday travel reduction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-yellow">•</span>
                    <span>Midweek departure (typically cheaper)</span>
                  </li>
                </ul>
                
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <div className="text-sm">
                    <strong>Fee Estimate:</strong> +$35 carry-on, +$30 checked bag
                    <br />
                    <strong>Real Total:</strong> ~$350 (typical traveler)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const [expandedFlight, setExpandedFlight] = useState(null);

  return (
    <div className="py-6">
      <div className="container">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">SEA → JFK</h1>
              <p className="text-gray-600">December 15, 2024 • 1 passenger • Economy</p>
            </div>
            <button className="btn btn-outline">
              Modify Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-body">
                <h3 className="font-bold mb-4">Filters</h3>
                
                {/* Stops */}
                <div className="mb-6">
                  <label className="form-label">Stops</label>
                  <div className="space-y-2">
                    {['any', 'nonstop', '1-stop'].map(option => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="stops"
                          value={option}
                          checked={filters.maxStops === option}
                          onChange={(e) => setFilters({...filters, maxStops: e.target.value})}
                        />
                        <span className="text-sm capitalize">{option.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="form-label">Price Range</label>
                  <div className="px-2">
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                      })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Airlines */}
                <div className="mb-6">
                  <label className="form-label">Airlines</label>
                  <div className="space-y-2">
                    {['Alaska', 'Delta', 'United', 'American'].map(airline => (
                      <label key={airline} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm">{airline}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <button className="btn btn-outline w-full text-sm">
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Center - Results */}
          <div className="lg:col-span-2">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-input text-sm"
                >
                  <option value="best">Best (FlyWise)</option>
                  <option value="price">Price</option>
                  <option value="duration">Duration</option>
                  <option value="departure">Departure Time</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-600">
                {flights.length} flights found
              </div>
            </div>
            
            {/* Flight Results */}
            <div>
              {flights.map(flight => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  isExpanded={expandedFlight === flight.id}
                  onToggleExpand={(id) => setExpandedFlight(expandedFlight === id ? null : id)}
                />
              ))}
            </div>
          </div>
          
          {/* Right Sidebar - Compare */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="card-body">
                <h3 className="font-bold mb-4">Compare Flights</h3>
                
                {compareList.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="text-sm">Select up to 3 flights to compare</p>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-3 mb-4">
                      {compareList.map(flightId => {
                        const flight = flights.find(f => f.id === flightId);
                        return (
                          <div key={flightId} className="bg-ultra-light-blue rounded p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-sm">{flight.airline}</div>
                                <div className="text-xs text-gray-600">
                                  {flight.departure.time} → {flight.arrival.time}
                                </div>
                                <div className="text-lg font-bold">${flight.price}</div>
                              </div>
                              <button
                                onClick={() => handleCompareToggle(flightId)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <button className="btn btn-primary w-full text-sm">
                      Compare Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
