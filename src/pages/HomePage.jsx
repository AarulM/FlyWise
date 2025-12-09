import React, { useState } from 'react';

const HomePage = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1',
    class: 'economy',
    flexibleDates: false
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchData);
    // TODO: Navigate to results page
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content & Search */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Find the right moment to buy — with confidence.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Stop guessing when to book. Get transparent price forecasts with explainable confidence levels.
              </p>
              
              {/* Search Form */}
              <div className="card p-6 mb-8">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">From</label>
                      <input
                        type="text"
                        placeholder="Seattle (SEA)"
                        className="form-input"
                        value={searchData.from}
                        onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="form-label">To</label>
                      <input
                        type="text"
                        placeholder="New York (JFK)"
                        className="form-input"
                        value={searchData.to}
                        onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Departure</label>
                      <input
                        type="date"
                        className="form-input"
                        value={searchData.departure}
                        onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="form-label">Return (optional)</label>
                      <input
                        type="date"
                        className="form-input"
                        value={searchData.return}
                        onChange={(e) => setSearchData({...searchData, return: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Passengers</label>
                      <select
                        className="form-input"
                        value={searchData.passengers}
                        onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}
                      >
                        <option value="1">1 Passenger</option>
                        <option value="2">2 Passengers</option>
                        <option value="3">3 Passengers</option>
                        <option value="4+">4+ Passengers</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Class</label>
                      <select
                        className="form-input"
                        value={searchData.class}
                        onChange={(e) => setSearchData({...searchData, class: e.target.value})}
                      >
                        <option value="economy">Economy</option>
                        <option value="premium">Premium Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="flexible"
                      checked={searchData.flexibleDates}
                      onChange={(e) => setSearchData({...searchData, flexibleDates: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <label htmlFor="flexible" className="text-sm font-medium">
                      ±3 days flexible dates
                    </label>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button type="submit" className="btn btn-primary flex-1">
                      Search Flights
                    </button>
                    <button type="button" className="btn btn-outline">
                      Just browsing deals?
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Right Column - Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-ultra-light-blue to-white rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">✈️</div>
                    <div style={{ color: 'var(--primary-blue)' }} className="text-lg font-medium">
                      Smart Flight Timing
                    </div>
                    <div style={{ color: 'var(--accent-yellow)' }} className="text-sm">
                      Data-Driven Decisions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Strip */}
      <section style={{ backgroundColor: 'var(--white)' }} className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-light-blue rounded-lg flex items-center justify-center text-white text-xl mb-4 mx-auto">
                💰
              </div>
              <h3 className="text-lg font-bold mb-2">Transparent Fees & Price History</h3>
              <p className="text-gray-600 text-sm">
                See the real total cost upfront, including typical baggage and seat fees.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-light-blue rounded-lg flex items-center justify-center text-white text-xl mb-4 mx-auto">
                📊
              </div>
              <h3 className="text-lg font-bold mb-2">Watchlists with Explainable Alerts</h3>
              <p className="text-gray-600 text-sm">
                Get notified when prices drop with clear reasons why it happened.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-light-blue rounded-lg flex items-center justify-center text-white text-xl mb-4 mx-auto">
                🎯
              </div>
              <h3 className="text-lg font-bold mb-2">Clear BUY vs WATCH</h3>
              <p className="text-gray-600 text-sm">
                Confidence-based recommendations that explain when to book or wait.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Preview Insights */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Preview: How Our Insights Work</h2>
            <p className="text-xl text-gray-600">
              We show what we know — and what we don't.
            </p>
          </div>
          
          <div className="card max-w-4xl mx-auto">
            <div className="card-body">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2">
                  {/* Mock Chart */}
                  <div className="bg-ultra-light-blue rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold">SEA → JFK Price Forecast</h4>
                      <div className="flex gap-2">
                        <span className="badge badge-watch">WATCH</span>
                        <span className="badge badge-confidence-med">Med Confidence</span>
                      </div>
                    </div>
                    
                    {/* Simple visual representation */}
                    <div className="relative h-32 bg-white rounded border-2 border-gray-200 p-4">
                      <div className="absolute bottom-4 left-4 right-4">
                        {/* Price line mockup */}
                        <div style={{ backgroundColor: 'var(--light-blue)' }} className="h-1 rounded relative">
                          <div 
                            style={{ backgroundColor: 'var(--accent-yellow)' }}
                            className="absolute top-0 left-1/3 w-2 h-2 -mt-0.5 rounded-full"
                          ></div>
                          <div 
                            style={{ backgroundColor: 'var(--accent-yellow)' }}
                            className="absolute top-0 right-1/4 w-2 h-2 -mt-0.5 rounded-full"
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>7 days ago</span>
                          <span>Today: $285</span>
                          <span>Forecast</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-600">
                      <strong>Insight:</strong> Likely to drop ~$35 in 5–7 days (60% confidence)
                      <br />
                      <strong>Reason:</strong> Post-holiday dip + midweek travel pattern
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4">What This Means</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--accent-yellow)' }}>•</span>
                      <span>Yellow dots show predicted price points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--light-blue)' }}>•</span>
                      <span>Blue band shows typical price range</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--success-green)' }}>•</span>
                      <span>Confidence meter shows data reliability</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <button className="btn btn-secondary w-full text-sm">
                      See How Our Predictions Work
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
