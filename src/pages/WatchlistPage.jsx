import React, { useState } from 'react';

const WatchlistPage = () => {
  const [alertSettings, setAlertSettings] = useState({
    email: true,
    push: true,
    frequency: 'instant',
    quietHours: { start: '22:00', end: '07:00' }
  });

  // Mock watchlist data
  const watchedFlights = [
    {
      id: 1,
      route: 'SEA → JFK',
      dates: 'Dec 15, 2024',
      flexible: true,
      currentPrice: 285,
      targetPrice: 250,
      trend: 'down',
      trendValue: -15,
      prediction: 'Likely dip in 3–5 days',
      confidence: 'med',
      recommendation: 'WATCH',
      priceHistory: [320, 310, 295, 285], // Last 7 days simplified
      created: '3 days ago'
    },
    {
      id: 2,
      route: 'SEA → LAX',
      dates: 'Jan 20, 2025',
      flexible: false,
      currentPrice: 180,
      targetPrice: 150,
      trend: 'up',
      trendValue: 25,
      prediction: 'Expected to rise $30+ in 2-3 days',
      confidence: 'high',
      recommendation: 'BUY',
      priceHistory: [155, 165, 170, 180],
      created: '1 week ago'
    },
    {
      id: 3,
      route: 'SFO → NYC',
      dates: 'Mar 10-17, 2025',
      flexible: true,
      currentPrice: 420,
      targetPrice: 380,
      trend: 'stable',
      trendValue: 5,
      prediction: 'Stable pricing, monitor for sudden drops',
      confidence: 'low',
      recommendation: 'WATCH',
      priceHistory: [415, 425, 420, 420],
      created: '2 weeks ago'
    }
  ];

  const SparklineChart = ({ data, trend }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 15;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="60" height="20" className="inline-block">
        <polyline
          fill="none"
          stroke={trend === 'up' ? 'var(--error-red)' : trend === 'down' ? 'var(--success-green)' : 'var(--gray-400)'}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  const WatchlistCard = ({ flight }) => (
    <div className="card mb-4">
      <div className="card-body">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Flight Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold">{flight.route}</h3>
              <div className="flex gap-1">
                <span className={`badge ${flight.recommendation === 'BUY' ? 'badge-buy' : 'badge-watch'}`}>
                  {flight.recommendation}
                </span>
                <span className={`badge badge-confidence-${flight.confidence}`}>
                  {flight.confidence} conf
                </span>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-2">
              {flight.dates} {flight.flexible && <span className="text-accent-yellow">• ±3 days</span>}
            </div>
            
            <div className="text-sm text-gray-700">
              <strong>Next move:</strong> {flight.prediction}
            </div>
          </div>
          
          {/* Price & Trend */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-500">Current Price</div>
              <div className="text-2xl font-bold">${flight.currentPrice}</div>
              <div className={`text-sm flex items-center gap-1 ${
                flight.trend === 'up' ? 'text-error-red' : 
                flight.trend === 'down' ? 'text-success-green' : 'text-gray-500'
              }`}>
                {flight.trend === 'up' ? '↗' : flight.trend === 'down' ? '↘' : '→'}
                ${Math.abs(flight.trendValue)} (7d)
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-500">7-day trend</div>
              <SparklineChart data={flight.priceHistory} trend={flight.trend} />
              <div className="text-xs text-gray-400 mt-1">
                Target: ${flight.targetPrice}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button className="btn btn-secondary text-sm">
              View Details
            </button>
            <button className="btn btn-outline text-sm">
              Edit Alerts
            </button>
            <button className="text-xs text-gray-500 hover:text-error-red">
              Unfollow
            </button>
          </div>
        </div>
        
        {/* Alert Status */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Alerts:</span>
              {alertSettings.email && <span className="text-success-green">📧 Email</span>}
              {alertSettings.push && <span className="text-success-green">📱 Push</span>}
              <span className="text-gray-500">• {flight.created}</span>
            </div>
            
            <div className="text-gray-500">
              Next check in 2 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-6">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Watchlist</h1>
            <p className="text-gray-600">Track price changes and get smart alerts for your routes.</p>
          </div>
          
          <button className="btn btn-primary">
            + Add New Route
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {watchedFlights.length > 0 ? (
              <div>
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-primary-blue">
                      {watchedFlights.filter(f => f.recommendation === 'BUY').length}
                    </div>
                    <div className="text-sm text-gray-600">Ready to Buy</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-accent-yellow">
                      {watchedFlights.filter(f => f.recommendation === 'WATCH').length}
                    </div>
                    <div className="text-sm text-gray-600">Keep Watching</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-success-green">
                      ${watchedFlights.reduce((sum, f) => sum + (f.currentPrice - f.targetPrice), 0)}
                    </div>
                    <div className="text-sm text-gray-600">Avg. Above Target</div>
                  </div>
                </div>

                {/* Flight List */}
                <div>
                  {watchedFlights.map(flight => (
                    <WatchlistCard key={flight.id} flight={flight} />
                  ))}
                </div>
              </div>
            ) : (
              // Empty State
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">Start tracking flights</h3>
                <p className="text-gray-600 mb-6">
                  Add routes from any search result, or set up a new route to watch.
                </p>
                <button className="btn btn-primary">
                  Set Up Your First Route
                </button>
              </div>
            )}
          </div>
          
          {/* Sidebar - Alert Settings */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="card-body">
                <h3 className="font-bold mb-4">Alert Settings</h3>
                
                <div className="space-y-4">
                  {/* Notification Types */}
                  <div>
                    <label className="form-label">Notification Methods</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={alertSettings.email}
                          onChange={(e) => setAlertSettings({
                            ...alertSettings,
                            email: e.target.checked
                          })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Email alerts</span>
                      </label>
                      
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={alertSettings.push}
                          onChange={(e) => setAlertSettings({
                            ...alertSettings,
                            push: e.target.checked
                          })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Push notifications</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Frequency */}
                  <div>
                    <label className="form-label">Alert Frequency</label>
                    <select
                      value={alertSettings.frequency}
                      onChange={(e) => setAlertSettings({
                        ...alertSettings,
                        frequency: e.target.value
                      })}
                      className="form-input text-sm"
                    >
                      <option value="instant">Instant</option>
                      <option value="daily">Daily digest</option>
                      <option value="weekly">Weekly summary</option>
                    </select>
                  </div>
                  
                  {/* Quiet Hours */}
                  <div>
                    <label className="form-label">Quiet Hours</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="time"
                        value={alertSettings.quietHours.start}
                        onChange={(e) => setAlertSettings({
                          ...alertSettings,
                          quietHours: { ...alertSettings.quietHours, start: e.target.value }
                        })}
                        className="form-input text-sm"
                      />
                      <input
                        type="time"
                        value={alertSettings.quietHours.end}
                        onChange={(e) => setAlertSettings({
                          ...alertSettings,
                          quietHours: { ...alertSettings.quietHours, end: e.target.value }
                        })}
                        className="form-input text-sm"
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      No alerts during these hours
                    </div>
                  </div>
                  
                  {/* Auto-pause */}
                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Auto-pause after booking</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button className="btn btn-primary w-full text-sm">
                    Save Settings
                  </button>
                </div>
                
                {/* Help */}
                <div className="mt-4 p-3 bg-ultra-light-blue rounded text-sm">
                  <div className="font-medium mb-1">💡 Pro Tip</div>
                  <p>Set target prices 10-15% below current prices for realistic alerts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
