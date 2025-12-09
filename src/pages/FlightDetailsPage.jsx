import React, { useState } from 'react';

const FlightDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('itinerary');
  
  // Mock flight data
  const flight = {
    id: 1,
    route: 'SEA → JFK',
    date: 'December 15, 2024',
    airline: 'Alaska Airlines',
    price: 285,
    priceChange: -15,
    recommendation: 'WATCH',
    confidence: 'med',
    segments: [
      {
        flight: 'AS 25',
        departure: { time: '7:30 AM', airport: 'SEA', city: 'Seattle' },
        arrival: { time: '3:45 PM', airport: 'JFK', city: 'New York' },
        duration: '5h 15m',
        aircraft: 'Boeing 737-900',
        seatPitch: '31-32"'
      }
    ],
    fareBreakdown: {
      baseFare: 210,
      taxes: 45,
      carryOn: 35,
      checkedBag: 30,
      seatSelection: 25
    },
    flexibility: {
      changeFee: 150,
      cancelFee: 200,
      refundable: false
    }
  };

  const PriceChart = () => (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Price History & Forecast</h3>
        <div className="flex gap-2">
          <span className="badge badge-watch">WATCH</span>
          <span className="badge badge-confidence-med">Med Confidence</span>
        </div>
      </div>
      
      {/* Mock Chart Area */}
      <div className="h-64 bg-ultra-light-blue rounded-lg relative overflow-hidden">
        {/* Chart background grid */}
        <div className="absolute inset-0 p-4">
          <svg className="w-full h-full">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Price history line */}
            <polyline
              fill="none"
              stroke="var(--light-blue)"
              strokeWidth="3"
              points="20,180 60,160 100,140 140,120 180,110 220,130 260,115 300,125"
            />
            
            {/* Forecast confidence band */}
            <polygon
              fill="var(--accent-yellow)"
              fillOpacity="0.3"
              points="300,100 340,90 380,85 420,95 460,105 460,155 420,145 380,135 340,140 300,150"
            />
            
            {/* Forecast line */}
            <polyline
              fill="none"
              stroke="var(--accent-yellow)"
              strokeWidth="3"
              strokeDasharray="5,5"
              points="300,125 340,115 380,110 420,120 460,130"
            />
            
            {/* Current price point */}
            <circle cx="300" cy="125" r="6" fill="var(--primary-blue)" />
          </svg>
          
          {/* Labels */}
          <div className="absolute bottom-2 left-4 text-xs text-gray-500">
            30 days ago
          </div>
          <div className="absolute bottom-2 right-4 text-xs text-gray-500">
            Next 14 days
          </div>
          <div className="absolute top-1/2 left-2 text-xs text-gray-500 transform -rotate-90">
            Price ($)
          </div>
        </div>
        
        {/* Current price indicator */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-lg shadow-lg p-2 text-center">
            <div className="text-sm font-bold">${flight.price}</div>
            <div className="text-xs text-green-600">↓ ${Math.abs(flight.priceChange)}</div>
          </div>
        </div>
      </div>
      
      {/* Chart Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-px bg-light-blue"></div>
          <span>Price History</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-px bg-accent-yellow border-dashed"></div>
          <span>Forecast</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-2 bg-accent-yellow opacity-30"></div>
          <span>Confidence Band</span>
        </div>
      </div>
      
      {/* Key Insights */}
      <div className="mt-6 p-4 bg-ultra-light-blue rounded-lg">
        <h4 className="font-bold mb-2">What affects this price?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-accent-yellow">📊</span>
            <span>Seasonal demand pattern</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent-yellow">🏢</span>
            <span>Business travel volume</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent-yellow">⛽</span>
            <span>Fuel price trends</span>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'fees', label: 'Fare & Fees' },
    { id: 'flexibility', label: 'Flexibility' },
    { id: 'comfort', label: 'Seat & Comfort' }
  ];

  return (
    <div className="py-6">
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <a href="#" className="hover:text-primary-blue">Search Results</a>
            <span>→</span>
            <span>Flight Details</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{flight.route}</h1>
              <p className="text-gray-600">{flight.date} • {flight.airline}</p>
            </div>
            
            {/* Mini route map placeholder */}
            <div className="bg-ultra-light-blue rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Route</div>
              <div className="text-lg">SEA ✈️ JFK</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Section */}
            <div className="card">
              <div className="card-body">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold">${flight.price}</span>
                      <span className="text-lg text-green-600">
                        ↓ ${Math.abs(flight.priceChange)} since yesterday
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className={`badge ${flight.recommendation === 'BUY' ? 'badge-buy' : 'badge-watch'}`}>
                        {flight.recommendation}
                      </span>
                      <span className={`badge badge-confidence-${flight.confidence}`}>
                        {flight.confidence.toUpperCase()} CONFIDENCE
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div>Price per passenger</div>
                    <div>Total: ${flight.price} × 1</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Chart */}
            <PriceChart />

            {/* Details Tabs */}
            <div className="card">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary-blue text-primary-blue'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="card-body">
                {activeTab === 'itinerary' && (
                  <div>
                    <h3 className="font-bold mb-4">Flight Segments</h3>
                    {flight.segments.map((segment, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-bold">{segment.flight}</div>
                          <div className="text-sm text-gray-600">{segment.aircraft}</div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <div className="text-center">
                            <div className="font-bold text-lg">{segment.departure.time}</div>
                            <div className="text-sm text-gray-600">
                              {segment.departure.airport} • {segment.departure.city}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm text-gray-600">{segment.duration}</div>
                            <div className="w-full h-px bg-gray-300 my-2"></div>
                            <div className="text-xs text-gray-500">Nonstop</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-bold text-lg">{segment.arrival.time}</div>
                            <div className="text-sm text-gray-600">
                              {segment.arrival.airport} • {segment.arrival.city}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Seat Pitch: {segment.seatPitch}</span>
                            <span>Wi-Fi: Available</span>
                            <span>Power: Available</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'fees' && (
                  <div>
                    <h3 className="font-bold mb-4">Fare Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Base Fare</span>
                        <span>${flight.fareBreakdown.baseFare}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & Fees</span>
                        <span>${flight.fareBreakdown.taxes}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between font-bold">
                          <span>Flight Total</span>
                          <span>${flight.fareBreakdown.baseFare + flight.fareBreakdown.taxes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-bold mb-3">Likely Add-ons</h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Carry-on bag</span>
                          <span>+${flight.fareBreakdown.carryOn}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Checked bag (1st)</span>
                          <span>+${flight.fareBreakdown.checkedBag}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Seat selection (standard)</span>
                          <span>+${flight.fareBreakdown.seatSelection}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Typical Real Total</span>
                            <span>${flight.price + flight.fareBreakdown.carryOn + flight.fareBreakdown.checkedBag}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'flexibility' && (
                  <div>
                    <h3 className="font-bold mb-4">Change & Cancel Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Changes</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Change fee</span>
                            <span>${flight.flexibility.changeFee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Same day change</span>
                            <span>$75</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-2">
                            Plus fare difference if applicable
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Cancellation</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Cancel fee</span>
                            <span>${flight.flexibility.cancelFee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Refundable</span>
                            <span className="text-error-red">No</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-2">
                            Credit valid for 1 year
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'comfort' && (
                  <div>
                    <h3 className="font-bold mb-4">Seat & Comfort Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Seating</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Seat pitch</span>
                            <span>31-32"</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Seat width</span>
                            <span>17.2"</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Recline</span>
                            <span>Limited</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Amenities</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-success-green">✓</span>
                            <span>Power outlets</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-success-green">✓</span>
                            <span>Wi-Fi available ($8)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">×</span>
                            <span>Meal service</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-success-green">✓</span>
                            <span>Snacks & beverages</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Actions */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="card-body">
                <div className="space-y-4">
                  <button className="btn btn-primary w-full">
                    Track This Price
                  </button>
                  
                  <button className="btn btn-outline w-full">
                    Share Flight
                  </button>
                  
                  <button className="btn btn-secondary w-full">
                    Book on Alaska Airlines
                  </button>
                </div>
                
                <div className="mt-6 p-4 bg-ultra-light-blue rounded-lg">
                  <div className="text-sm">
                    <div className="font-medium mb-2">💡 FlyWise Tip</div>
                    <p>We'll keep tracking this flight and explain any price changes in your alerts.</p>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>Booking redirects to airline website. FlyWise doesn't charge booking fees.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsPage;
