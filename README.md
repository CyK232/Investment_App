# Mobile Investment App

A mobile-first investment application built with React that allows users to browse stocks, view their portfolio, and make investments using USDC.

## Features

- **Mobile-First Design**: Optimized for mobile devices with bottom navigation tabs
- **Stock Browsing**: View a list of popular stocks with real-time price data
- **Portfolio Tracking**: Monitor your investments and asset allocation
- **Buy Modal**: Quick purchase interface with preset USDC amounts
- **Dark Mode**: Toggle between light and dark themes
- **Responsive UI**: Clean, modern interface that works on all devices

## Tech Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation between different sections
- **Styled Components**: For component-based styling
- **Chart.js & React-Chartjs-2**: For interactive charts and graphs
- **React Icons**: For a comprehensive icon library
- **Webpack & Babel**: For bundling and transpiling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── assets/         # Static assets like icons
├── components/     # React components
│   ├── Home/       # Home page components
│   ├── Invest/     # Invest page components
│   ├── Portfolio/  # Portfolio page components
│   └── Settings/   # Settings page components
├── styles/         # Global styles
├── App.js          # Main App component
└── index.js        # Entry point
```

## Main Features

### Home Page
- Displays user balance
- Shows a scrollable list of popular stocks
- Each stock card shows logo, ticker, price, and percentage change
- Clicking a stock opens the buy modal

### Invest Page
- Advanced stock browsing with search and filters
- Sorting options by name, price, or change percentage
- Detailed stock information

### Portfolio Page
- Total balance overview with daily change
- Interactive balance history chart with time frame selection
- Asset allocation visualization
- List of current holdings with performance metrics

### Settings Page
- Account management options
- Dark mode toggle
- Notification preferences
- Security settings

### Buy Modal
- Quick purchase interface
- Preset USDC amount options
- Real-time price information

## Future Enhancements

- Real-time data integration with financial APIs
- Transaction history
- Sell functionality
- Price alerts and notifications
- Portfolio performance analytics
- User authentication and account management

## License

This project is licensed under the MIT License - see the LICENSE file for details.
