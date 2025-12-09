import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Plane, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Star, 
  Heart,
  AlertTriangle,
  Users,
  Calendar,
  Filter,
  ArrowRight,
  Bell,
  User,
  Settings,
  X,
  Briefcase,
  Home,
  Navigation,
  Baby,
  Shield,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Wifi,
  Coffee,
  Car,
  Plus
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './App.css'

// Mock data
const mockPriceHistory = [
  { date: '2024-11-01', price: 420 },
  { date: '2024-11-08', price: 380 },
  { date: '2024-11-15', price: 450 },
  { date: '2024-11-22', price: 520 },
  { date: '2024-11-29', price: 480 },
  { date: '2024-12-06', price: 390 },
  { date: '2024-12-13', price: 410 }
]

const mockFlights = [
  {
    id: 1,
    airline: 'Delta',
    flightNumber: 'DL 1234',
    departure: { time: '8:30 AM', airport: 'SEA' },
    arrival: { time: '11:45 AM', airport: 'LAX' },
    duration: '3h 15m',
    price: 389,
    stops: 0,
    aiRecommendation: 'BUY',
    confidence: 85,
    delayRisk: 'Low',
    priceChange: -12
  },
  {
    id: 2,
    airline: 'American',
    flightNumber: 'AA 5678',
    departure: { time: '10:15 AM', airport: 'SEA' },
    arrival: { time: '1:30 PM', airport: 'LAX' },
    duration: '3h 15m',
    price: 425,
    stops: 0,
    aiRecommendation: 'WAIT',
    confidence: 72,
    delayRisk: 'Medium',
    priceChange: 8
  }
]

const mockTrips = [
  {
    id: 1,
    destination: 'Los Angeles',
    dates: 'Dec 15-20, 2024',
    flight: 'DL 1234',
    gate: 'A12',
    terminal: 'Terminal 1',
    seat: '12F',
    status: 'On Time',
    checkIn: '23h 45m',
    baggage: 'Carousel 3'
  },
  {
    id: 2,
    destination: 'New York',
    dates: 'Jan 5-12, 2025',
    flight: 'UA 9876',
    gate: 'B8',
    terminal: 'Terminal 2',
    seat: '8A',
    status: 'Delayed 15min',
    checkIn: '2h 30m',
    baggage: 'Carousel 1'
  }
]

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    tripType: 'roundtrip'
  })
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [watchedFlights, setWatchedFlights] = useState([])
  const [filters, setFilters] = useState({
    maxPrice: 1000,
    stops: 'any',
    airlines: [],
    timeWindow: 'any'
  })

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'trips', label: 'My Trips', icon: Briefcase },
    { id: 'airport', label: 'Airport Guide', icon: Navigation },
    { id: 'family', label: 'Family Travel', icon: Baby },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  const renderOnboarding = () => (
    <AnimatePresence>
      {showOnboarding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-lg w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8" style={{color: '#F59E0B'}} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to FlyWise</h2>
              <p className="text-gray-600">Your AI-powered flight companion for smarter travel decisions</p>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Get AI-powered Buy/Wait recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Real-time delay risk indicators</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span>Airport navigation & gate updates</span>
              </div>
            </div>
            <button
              onClick={() => setShowOnboarding(false)}
              className="w-full py-3 rounded-lg font-medium transition-colors"
              style={{backgroundColor: '#F59E0B', color: '#0F172A'}}
            >
              Get Started
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const renderNavbar = () => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Plane className="w-8 h-8" style={{color: '#F59E0B'}} />
            <span className="text-xl font-bold" style={{color: '#0F172A'}}>FlyWise</span>
          </div>
          <div className="flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  style={currentPage === item.id ? {color: '#1D4ED8'} : {}}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6" style={{color: '#0F172A'}}>
          Find the right moment to buy — with confidence
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stop guessing when to book. Get transparent price forecasts with explainable AI confidence levels.
        </p>
      </div>

      {/* Quick Search */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <div className="flex items-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              searchData.tripType === 'roundtrip' ? 'bg-blue-100' : 'text-gray-600'
            }`}
            style={searchData.tripType === 'roundtrip' ? {color: '#1D4ED8'} : {}}
            onClick={() => setSearchData({ ...searchData, tripType: 'roundtrip' })}
          >
            Round trip
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              searchData.tripType === 'oneway' ? 'bg-blue-100' : 'text-gray-600'
            }`}
            style={searchData.tripType === 'oneway' ? {color: '#1D4ED8'} : {}}
            onClick={() => setSearchData({ ...searchData, tripType: 'oneway' })}
          >
            One way
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <input
              type="text"
              placeholder="Seattle (SEA)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchData.from}
              onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input
              type="text"
              placeholder="Los Angeles (LAX)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchData.to}
              onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchData.departure}
              onChange={(e) => setSearchData({ ...searchData, departure: e.target.value })}
            />
          </div>
          {searchData.tripType === 'roundtrip' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchData.return}
                onChange={(e) => setSearchData({ ...searchData, return: e.target.value })}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500" />
            <select
              className="p-2 border border-gray-300 rounded-lg"
              value={searchData.passengers}
              onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('search')}
          className="w-full py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          style={{backgroundColor: '#F59E0B', color: '#0F172A'}}
        >
          <Search className="w-5 h-5" />
          Search Flights
        </button>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer"
          onClick={() => setCurrentPage('trips')}
        >
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <Briefcase className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">My Trips</h3>
          <p className="text-gray-600">Manage multiple trips, track gates, and get real-time updates</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer"
          onClick={() => setCurrentPage('airport')}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Navigation className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Airport Guide</h3>
          <p className="text-gray-600">Navigate terminals, find amenities, and track crowd levels</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer"
          onClick={() => setCurrentPage('family')}
        >
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <Baby className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Family Travel</h3>
          <p className="text-gray-600">Kid-friendly boarding, nursing rooms, and quiet zones</p>
        </motion.div>
      </div>
    </div>
  )

  const renderSearch = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-80 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="range"
                min="100"
                max="1000"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">${filters.maxPrice}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stops</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filters.stops}
                onChange={(e) => setFilters({ ...filters, stops: e.target.value })}
              >
                <option value="any">Any number of stops</option>
                <option value="0">Nonstop only</option>
                <option value="1">1 stop or fewer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Airlines</label>
              <div className="space-y-2">
                {['Delta', 'American', 'United', 'Alaska'].map(airline => (
                  <label key={airline} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">{airline}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Seattle to Los Angeles</h1>
            <p className="text-gray-600">{mockFlights.length} flights found</p>
          </div>

          <div className="space-y-4">
            {mockFlights.map((flight) => (
              <motion.div
                key={flight.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-lg shadow-sm border p-6 cursor-pointer"
                onClick={() => setSelectedFlight(flight)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-semibold">{flight.airline}</div>
                    <div className="text-gray-600">{flight.flightNumber}</div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      flight.aiRecommendation === 'BUY' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {flight.aiRecommendation} ({flight.confidence}% confidence)
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setWatchedFlights([...watchedFlights, flight.id])
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Heart className={`w-5 h-5 ${watchedFlights.includes(flight.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div>
                      <div className="text-xl font-bold">{flight.departure.time}</div>
                      <div className="text-gray-600">{flight.departure.airport}</div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="text-sm text-gray-600">{flight.duration}</div>
                      <div className="w-16 h-px bg-gray-300 mx-auto my-1"></div>
                      <div className="text-sm text-gray-600">{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">{flight.arrival.time}</div>
                      <div className="text-gray-600">{flight.arrival.airport}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold">${flight.price}</div>
                    <div className={`text-sm flex items-center gap-1 ${
                      flight.priceChange < 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {flight.priceChange < 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      ${Math.abs(flight.priceChange)} vs last week
                    </div>
                    <div className={`text-sm ${
                      flight.delayRisk === 'Low' ? 'text-green-600' : 
                      flight.delayRisk === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {flight.delayRisk} delay risk
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Flight Details Modal */}
      <AnimatePresence>
        {selectedFlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{selectedFlight.airline} {selectedFlight.flightNumber}</h2>
                <button
                  onClick={() => setSelectedFlight(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Price History & Forecast</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockPriceHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">AI Recommendation</h3>
                  <div className={`p-4 rounded-lg mb-4 ${
                    selectedFlight.aiRecommendation === 'BUY' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <div className={`text-lg font-bold mb-2 ${
                      selectedFlight.aiRecommendation === 'BUY' ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                      {selectedFlight.aiRecommendation} NOW
                    </div>
                    <div className="text-sm text-gray-700">
                      {selectedFlight.aiRecommendation === 'BUY' 
                        ? 'Our AI analysis shows this is likely the best price for the next 2 weeks based on historical patterns and current demand.'
                        : 'Prices may drop in the next few days. Consider waiting 3-5 days before booking.'
                      }
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Confidence: {selectedFlight.confidence}%
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentPage('trips')}
                    className="w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    style={{backgroundColor: '#F59E0B', color: '#0F172A'}}
                  >
                    <Plus className="w-5 h-5" />
                    Add to My Trips
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const renderTrips = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <button 
          className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          style={{backgroundColor: '#F59E0B', color: '#0F172A'}}
        >
          <Plus className="w-5 h-5" />
          Add Trip
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockTrips.map((trip) => (
          <motion.div
            key={trip.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{trip.destination}</h3>
                <p className="text-gray-600">{trip.dates}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                trip.status === 'On Time' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {trip.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Flight</div>
                <div className="font-medium">{trip.flight}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Gate</div>
                <div className="font-medium">{trip.gate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Terminal</div>
                <div className="font-medium">{trip.terminal}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Seat</div>
                <div className="font-medium">{trip.seat}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Check-in: {trip.checkIn}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{trip.baggage}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAirport = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Airport Guide</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Terminal Map</h2>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive terminal map would be displayed here</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Wifi, label: 'Free WiFi', available: true },
                { icon: Coffee, label: 'Coffee Shops', available: true },
                { icon: Car, label: 'Car Rental', available: true },
                { icon: Shield, label: 'Security', available: true }
              ].map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                  <amenity.icon className={`w-5 h-5 ${amenity.available ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className="text-sm">{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Current Crowd Levels</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Security Checkpoint A</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-600">Low</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Security Checkpoint B</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-yellow-600">Medium</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Gate Area C</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-red-600">High</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Gate Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Bell className="w-5 h-5 text-blue-500 mt-0-5" />
                <div>
                  <div className="font-medium text-sm">Gate Change</div>
                  <div className="text-sm text-gray-600">Flight DL 1234 moved to Gate A15</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0-5" />
                <div>
                  <div className="font-medium text-sm">Boarding Started</div>
                  <div className="text-sm text-gray-600">Flight AA 5678 now boarding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderFamily = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Family Travel Made Easy</h1>
        <p className="text-xl text-gray-600">Kid-friendly features and family amenities at your fingertips</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <Baby className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Priority Boarding</h3>
          <p className="text-gray-600 mb-4">Families with children under 2 can board first on most airlines</p>
          <div className="text-sm text-green-600">✓ Available for your upcoming trip</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nursing Rooms</h3>
          <p className="text-gray-600 mb-4">Private, comfortable spaces for feeding and changing</p>
          <div className="text-sm text-blue-600">→ Terminal A (Level 2), Terminal B (Level 1)</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Quiet Zones</h3>
          <p className="text-gray-600 mb-4">Peaceful areas away from the busy terminal crowds</p>
          <div className="text-sm text-blue-600">→ Gate C12-C20, Gate D5-D10</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Kids Play Areas</h3>
          <p className="text-gray-600 mb-4">Safe play spaces to keep children entertained</p>
          <div className="text-sm text-blue-600">→ Terminal A (Near Gate A8), Terminal C (Near Gate C15)</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Family Restrooms</h3>
          <p className="text-gray-600 mb-4">Larger restrooms with changing tables and space for strollers</p>
          <div className="text-sm text-blue-600">→ All terminals, near main entrances</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Car className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Stroller Services</h3>
          <p className="text-gray-600 mb-4">Stroller rentals and gate check services available</p>
          <div className="text-sm text-green-600">✓ Free gate check for strollers and car seats</div>
        </div>
      </div>
    </div>
  )

  const renderAlerts = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Alerts & Notifications</h1>

      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Price Alerts</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span>Price drops for watched flights</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span>Price increases for watched flights</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span>Best time to buy notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Flight Alerts</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span>Flight delays and cancellations</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span>Gate changes</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span>Boarding announcements</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span>Check-in reminders</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Methods</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span>Push notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span>Email notifications</span>
              <input type="checkbox" className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span>SMS notifications</span>
              <input type="checkbox" className="w-5 h-5 text-blue-600" />
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile & Settings</h1>

      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Traveler Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" placeholder="John" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" placeholder="Doe" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input type="tel" placeholder="+1 (555) 123-4567" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Preferred Airports</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {['SEA - Seattle', 'LAX - Los Angeles', 'SFO - San Francisco'].map((airport) => (
              <span key={airport} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {airport}
                <button className="ml-2">×</button>
              </span>
            ))}
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm">+ Add Airport</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Preferred Airlines</h2>
          <div className="space-y-2">
            {['Delta', 'American', 'United', 'Alaska'].map((airline) => (
              <label key={airline} className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>{airline}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Travel Documents</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passport Number</label>
              <input type="text" placeholder="123456789" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Known Traveler Number (TSA PreCheck)</label>
              <input type="text" placeholder="12345678901" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        <button 
          className="w-full py-3 rounded-lg font-medium transition-colors"
          style={{backgroundColor: '#F59E0B', color: '#0F172A'}}
        >
          Save Changes
        </button>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'search':
        return renderSearch()
      case 'trips':
        return renderTrips()
      case 'airport':
        return renderAirport()
      case 'family':
        return renderFamily()
      case 'alerts':
        return renderAlerts()
      case 'profile':
        return renderProfile()
      default:
        return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderOnboarding()}
      {renderNavbar()}
      <motion.main
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderPage()}
      </motion.main>
    </div>
  )
}

export default App
