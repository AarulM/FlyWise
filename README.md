# FlyWise - Confidence-Building Flight Finder

A React application demonstrating a complete flight booking experience with transparent pricing, explainable recommendations, and smart watchlist features.

## 🎨 Design System

### Color Palette (Blue + Yellow Theme)
- **Primary Blue**: `#1E3A8A` - Navigation and headers
- **Light Blue**: `#3B82F6` - Interactive elements and links
- **Ultra Light Blue**: `#E6F0FF` - Background panels and cards
- **Accent Yellow**: `#FBBF24` - Call-to-action buttons and highlights
- **Success Green**: `#10B981` - "BUY" recommendations
- **Warning Orange**: `#F59E0B` - Medium confidence indicators
- **Error Red**: `#EF4444` - Low confidence and warnings

### Typography
- **Font Family**: Inter (with system fallbacks)
- **Headings**: Bold weights in Primary Blue
- **Body Text**: Regular/medium weights in Gray-700
- **Numerical**: Tabular numerals for prices and times

## 🏗️ Architecture

### Pages Implemented
1. **Landing Page** - Hero section with search form and trust indicators
2. **Search Results** - Flight listings with filters and price insights
3. **Flight Details** - Detailed view with price charts and recommendations
4. **Watchlist** - Price tracking and alert management

### Key Components
- **Layout** - Header, footer, and main content wrapper
- **Header** - Sticky navigation with compact search and user menu
- **Footer** - Brand information and legal links
- **Flight Cards** - Expandable cards with price insights
- **Price Charts** - Visual price history and forecasting
- **Recommendation Badges** - BUY/WATCH with confidence levels

## 🚀 Features

### Core Functionality
- ✅ **Transparent Pricing** - Real total costs including typical fees
- ✅ **Explainable Recommendations** - Clear BUY vs WATCH with reasons
- ✅ **Confidence Levels** - High/Medium/Low indicators with explanations
- ✅ **Price Insights** - Historical trends and forecast charts
- ✅ **Watchlist Management** - Track multiple routes with smart alerts
- ✅ **Comparison Tools** - Side-by-side flight comparison (up to 3)

### User Experience
- ✅ **Responsive Design** - Mobile-first with desktop enhancements
- ✅ **Accessibility** - WCAG 2.1 AA compliant color contrasts
- ✅ **Progressive Enhancement** - Works without JavaScript
- ✅ **Fast Loading** - Optimized with Vite build system

## 🎯 What Makes FlyWise Different

1. **Explainable AI** - Every recommendation comes with clear reasoning
2. **Fee Transparency** - No hidden costs, show real total prices
3. **Renewable Watchlists** - No silent expirations or data loss
4. **Confidence-Based UX** - Honest about prediction limitations
5. **Desktop + Mobile** - Full-featured experience on all devices

## 🛠️ Technical Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Custom CSS with CSS Variables (no external frameworks)
- **State Management**: React useState (demo-level, no persistence)
- **Routing**: Simple component switching (demo navigation)

## 📱 Responsive Behavior

### Mobile (< 768px)
- Single-column layouts
- Collapsible filters as full-screen sheets
- Bottom drawer for comparison tools
- Simplified charts with tap interactions
- Stack flex items vertically

### Tablet (768px - 1024px)
- Two-column grid layouts
- Sidebar navigation
- Hover states enabled

### Desktop (> 1024px)
- Three-column layouts
- Sticky sidebars
- Advanced hover effects
- Tooltip interactions

## 🎨 Content & Microcopy

### Recommendation Language
- **BUY (High confidence)**: "We expect prices to rise soon (1–3 days)"
- **WATCH (Medium)**: "Volatile; a drop of ~$25–$40 possible in 3–7 days"
- **WATCH (Low)**: "Uncertain. If timing matters more than price, consider buying"

### Trust-Building Elements
- Clear data source acknowledgments
- Honest about coverage gaps
- "We show what we know — and what we don't"
- Methodology transparency

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5173`

4. **Explore the demo**:
   Use the demo navigation bar to switch between pages

## 🏗️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Main navigation
│   ├── Footer.jsx      # Site footer
│   └── Layout.jsx      # Page wrapper
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   ├── SearchResultsPage.jsx
│   ├── FlightDetailsPage.jsx
│   └── WatchlistPage.jsx
├── App.jsx             # Main app with routing
├── App.css             # App-specific styles
├── index.css           # Global design system
└── main.jsx            # React entry point
```

## 🎯 Future Enhancements

### Phase 1 (Core Features)
- [ ] Real flight data API integration
- [ ] User authentication and profiles
- [ ] Persistent watchlist storage
- [ ] Email/push notification system

### Phase 2 (Advanced Features)
- [ ] Advanced filtering and sorting
- [ ] Price prediction ML models
- [ ] Calendar integration
- [ ] Team sharing and collaboration

### Phase 3 (Platform Features)
- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] API for travel agencies
- [ ] White-label solutions

## 📊 Accessibility Features

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader optimizations
- High contrast mode support
- Focus management
- Color-blind friendly palette

## 📄 License

This project is for demonstration purposes. Not intended for commercial use without proper flight data licensing and API agreements.

---

**FlyWise** - Find the right moment to buy — with confidence.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
