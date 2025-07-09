import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronRight, FaCaretUp, FaCaretDown, FaWallet } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

// Mock portfolio data
const mockPortfolioData = {
  totalBalance: 5432.78,
  dailyChange: 123.45,
  dailyChangePercent: 2.32,
  balanceHistory: {
    '1D': [5300, 5320, 5280, 5350, 5400, 5432.78],
    '1W': [5100, 5200, 5150, 5300, 5250, 5400, 5432.78],
    '1M': [4800, 4900, 5000, 5100, 5200, 5300, 5432.78],
    '3M': [4500, 4700, 4600, 4800, 5000, 5200, 5432.78],
    '1Y': [4000, 4200, 4500, 4300, 4600, 4800, 5100, 5432.78],
    'All': [3000, 3500, 4000, 3800, 4200, 4500, 4800, 5200, 5432.78]
  },
  holdings: [
    {
      id: 1,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 5.25,
      averagePrice: 150.25,
      currentPrice: 178.72,
      value: 937.28,
      change: 18.95,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      allocation: 17.25
    },
    {
      id: 2,
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 2.5,
      averagePrice: 320.15,
      currentPrice: 338.11,
      value: 845.28,
      change: 5.61,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      allocation: 15.56
    },
    {
      id: 3,
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 6.75,
      averagePrice: 125.50,
      currentPrice: 131.86,
      value: 890.06,
      change: 5.07,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
      allocation: 16.38
    },
    {
      id: 4,
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      shares: 7.2,
      averagePrice: 115.75,
      currentPrice: 127.74,
      value: 919.73,
      change: 10.36,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      allocation: 16.93
    },
    {
      id: 5,
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      shares: 3.5,
      averagePrice: 250.25,
      currentPrice: 244.14,
      value: 854.49,
      change: -2.44,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
      allocation: 15.73
    },
    {
      id: 6,
      symbol: 'JPM',
      name: 'JPMorgan Chase & Co.',
      shares: 6.5,
      averagePrice: 145.75,
      currentPrice: 151.42,
      value: 984.23,
      change: 3.89,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/J.P._Morgan_Logo_2008_1.svg',
      allocation: 18.12
    }
  ]
};

const Portfolio = () => {
  const [timeRange, setTimeRange] = useState('1W');
  const [showAllHoldings, setShowAllHoldings] = useState(false);

  // Handle buy and sell actions
  const handleBuy = (e, symbol) => {
    e.stopPropagation();
    alert(`Buy more ${symbol}`);
  };

  const handleSell = (e, symbol) => {
    e.stopPropagation();
    alert(`Sell ${symbol}`);
  };

  // Chart data for balance history
  const balanceChartData = {
    labels: Array(mockPortfolioData.balanceHistory[timeRange].length).fill(''),
    datasets: [
      {
        data: mockPortfolioData.balanceHistory[timeRange],
        fill: true,
        backgroundColor: 'rgba(0, 200, 83, 0.1)',
        borderColor: 'rgba(0, 200, 83, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const balanceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  // Chart data for allocation
  const allocationChartData = {
    labels: mockPortfolioData.holdings.map(holding => holding.symbol),
    datasets: [
      {
        data: mockPortfolioData.holdings.map(holding => holding.allocation),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const allocationChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  // Determine which holdings to display
  const displayedHoldings = showAllHoldings 
    ? mockPortfolioData.holdings 
    : mockPortfolioData.holdings.slice(0, 3);

  return (
    <PortfolioContainer>
      <Header>
        <Title>Portfolio</Title>
        <BalanceSection>
          <BalanceLabel>Total Balance</BalanceLabel>
          <BalanceAmount>${mockPortfolioData.totalBalance.toFixed(2)}</BalanceAmount>
          <BalanceChange positive={mockPortfolioData.dailyChange >= 0}>
            {mockPortfolioData.dailyChange >= 0 ? '+' : ''}
            ${mockPortfolioData.dailyChange.toFixed(2)} ({mockPortfolioData.dailyChangePercent.toFixed(2)}%)
          </BalanceChange>
        </BalanceSection>
      </Header>

      <Card>
        <CardHeader>
          <CardTitle>Balance History</CardTitle>
          <TimeRangeSelector>
            {Object.keys(mockPortfolioData.balanceHistory).map(range => (
              <TimeRangeButton 
                key={range} 
                selected={timeRange === range}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </TimeRangeButton>
            ))}
          </TimeRangeSelector>
        </CardHeader>
        <ChartContainer>
          <Line data={balanceChartData} options={balanceChartOptions} />
        </ChartContainer>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Allocation</CardTitle>
        </CardHeader>
        <AllocationContainer>
          <AllocationChart>
            <Doughnut data={allocationChartData} options={allocationChartOptions} />
          </AllocationChart>
          <AllocationList>
            {mockPortfolioData.holdings.map(holding => (
              <AllocationItem key={holding.id}>
                <AllocationSymbol>{holding.symbol}</AllocationSymbol>
                <AllocationBar>
                  <AllocationBarFill 
                    width={holding.allocation} 
                    color={allocationChartData.datasets[0].backgroundColor[mockPortfolioData.holdings.findIndex(h => h.id === holding.id)]}
                  />
                </AllocationBar>
                <AllocationPercentage>{holding.allocation.toFixed(1)}%</AllocationPercentage>
              </AllocationItem>
            ))}
          </AllocationList>
        </AllocationContainer>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <HoldingsList>
          {displayedHoldings.map(holding => (
            <HoldingItem key={holding.id}>
              <HoldingInfo>
                <HoldingLogo src={holding.logo} alt={holding.symbol} />
                <HoldingDetails>
                  <HoldingSymbol>{holding.symbol}</HoldingSymbol>
                  <HoldingName>{holding.name}</HoldingName>
                </HoldingDetails>
              </HoldingInfo>
              <HoldingData>
                <HoldingShares>{holding.shares.toFixed(holding.shares % 1 === 0 ? 0 : 4)} shares</HoldingShares>
                <HoldingValue>${holding.value.toFixed(2)}</HoldingValue>
                <HoldingChange positive={holding.change >= 0}>
                  {holding.change >= 0 ? <FaCaretUp /> : <FaCaretDown />}
                  {Math.abs(holding.change).toFixed(2)}%
                </HoldingChange>
              </HoldingData>
              <HoldingActions>
                <BuyButton onClick={(e) => handleBuy(e, holding.symbol)}>Buy</BuyButton>
                <SellButton onClick={(e) => handleSell(e, holding.symbol)}>Sell</SellButton>
              </HoldingActions>
            </HoldingItem>
          ))}
        </HoldingsList>
        {mockPortfolioData.holdings.length > 3 && (
          <ShowMoreButton onClick={() => setShowAllHoldings(!showAllHoldings)}>
            {showAllHoldings ? 'Show Less' : 'Show All'}
          </ShowMoreButton>
        )}
      </Card>
    </PortfolioContainer>
  );
};

// Styled Components
const PortfolioContainer = styled.div`
  padding: var(--spacing-md);
  padding-bottom: 5rem; /* Extra space for bottom navigation */
`;

const Header = styled.header`
  margin-bottom: var(--spacing-lg);
`;

const Title = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
`;

const BalanceSection = styled.div`
  margin-bottom: var(--spacing-md);
`;

const BalanceLabel = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const BalanceAmount = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
`;

const BalanceChange = styled.div`
  font-size: var(--font-size-md);
  font-weight: 500;
  color: ${props => props.positive ? 'var(--color-positive)' : 'var(--color-negative)'};
`;

const Card = styled.div`
  background-color: var(--color-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);

  body.dark-mode & {
    background-color: var(--color-card-dark);
    border-color: var(--color-border-dark);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-divider);

  body.dark-mode & {
    border-color: var(--color-divider-dark);
  }
`;

const CardTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: 600;
`;

const TimeRangeSelector = styled.div`
  display: flex;
  gap: var(--spacing-xs);
`;

const TimeRangeButton = styled.button`
  background-color: ${props => props.selected ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.selected ? 'white' : 'var(--color-text-secondary)'};
  border: 1px solid ${props => props.selected ? 'var(--color-primary)' : 'var(--color-border)'};
  border-radius: var(--radius-sm);
  padding: 4px 8px;
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.selected ? 'var(--color-primary)' : 'var(--color-hover)'};
  }

  body.dark-mode & {
    color: ${props => props.selected ? 'white' : 'var(--color-text-secondary-dark)'};
    border-color: ${props => props.selected ? 'var(--color-primary)' : 'var(--color-border-dark)'};

    &:hover {
      background-color: ${props => props.selected ? 'var(--color-primary)' : 'var(--color-hover-dark)'};
    }
  }
`;

const ChartContainer = styled.div`
  height: 200px;
  padding: var(--spacing-md);
`;

const AllocationContainer = styled.div`
  display: flex;
  padding: var(--spacing-md);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const AllocationChart = styled.div`
  width: 150px;
  height: 150px;
  margin-right: var(--spacing-lg);

  @media (max-width: 600px) {
    margin: 0 auto var(--spacing-md);
  }
`;

const AllocationList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const AllocationItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const AllocationSymbol = styled.div`
  width: 50px;
  font-weight: 600;
  font-size: var(--font-size-sm);
`;

const AllocationBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: var(--color-surface);
  border-radius: var(--radius-full);
  overflow: hidden;

  body.dark-mode & {
    background-color: var(--color-surface-dark);
  }
`;

const AllocationBarFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.color};
  border-radius: var(--radius-full);
`;

const AllocationPercentage = styled.div`
  width: 50px;
  text-align: right;
  font-size: var(--font-size-sm);
  font-weight: 500;
`;

const HoldingsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const HoldingItem = styled.div`
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-divider);

  &:last-child {
    border-bottom: none;
  }

  body.dark-mode & {
    border-color: var(--color-divider-dark);
  }
`;

const HoldingInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const HoldingLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: var(--spacing-sm);
  background-color: var(--color-surface);
  padding: 4px;

  body.dark-mode & {
    background-color: var(--color-surface-dark);
  }
`;

const HoldingDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const HoldingSymbol = styled.div`
  font-weight: 600;
  font-size: var(--font-size-md);
`;

const HoldingName = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const HoldingData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: var(--spacing-md);
  flex: 1;
`;

const HoldingShares = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const HoldingValue = styled.div`
  font-weight: 600;
  font-size: var(--font-size-md);
`;

const HoldingChange = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: ${props => props.positive ? 'var(--color-positive)' : 'var(--color-negative)'};
`;

const HoldingActions = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
`;

const Button = styled.button`
  border: none;
  border-radius: var(--radius-sm);
  padding: 4px 8px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const BuyButton = styled(Button)`
  background-color: var(--color-positive);
  color: white;
  
  &:hover {
    background-color: var(--color-positive-dark);
  }
`;

const SellButton = styled(Button)`
  background-color: var(--color-negative);
  color: white;
  
  &:hover {
    background-color: var(--color-negative-dark);
  }
`;

const HoldingAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const ShowMoreButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background-color: transparent;
  border: none;
  border-top: 1px solid var(--color-divider);
  color: var(--color-primary);
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
  }

  body.dark-mode & {
    border-color: var(--color-divider-dark);
    &:hover {
      background-color: var(--color-hover-dark);
    }
  }
`;

// Add new styled components
const ConnectWalletSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) 0;
`;

const ConnectWalletMessage = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0;

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const ConnectWalletButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-md);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-primary-dark);
  }

  body.dark-mode & {
    background-color: var(--color-primary-dark);
    &:hover {
      background-color: var(--color-primary);
    }
  }
`;

export default Portfolio;
