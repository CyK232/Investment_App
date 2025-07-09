import React from 'react';
import styled from 'styled-components';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const StockCard = ({ stock }) => {
  const { symbol, name, price, change, logo, data } = stock;
  const isPositive = change >= 0;

  // Chart data and options
  const chartData = {
    labels: Array(data.length).fill(''),
    datasets: [
      {
        data: data,
        fill: true,
        backgroundColor: isPositive ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 82, 82, 0.1)',
        borderColor: isPositive ? 'rgba(0, 200, 83, 1)' : 'rgba(255, 82, 82, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
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

  // Handle buy and sell actions
  const handleBuy = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    alert(`Buy ${symbol}`);
    // Here you would typically open a buy modal or navigate to a buy page
  };

  const handleSell = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    alert(`Sell ${symbol}`);
    // Here you would typically open a sell modal or navigate to a sell page
  };

  return (
    <Card>
      <LeftSection>
        <LogoContainer>
          <Logo src={logo} alt={symbol} />
        </LogoContainer>
        <StockInfo>
          <Symbol>{symbol}</Symbol>
          <Name>{name}</Name>
        </StockInfo>
      </LeftSection>
      
      <ChartContainer>
        <Line data={chartData} options={chartOptions} />
      </ChartContainer>
      
      <RightSection>
        <Price>${price.toFixed(2)}</Price>
        <Change positive={isPositive}>
          {isPositive ? <FaCaretUp /> : <FaCaretDown />}
          {Math.abs(change).toFixed(2)}%
        </Change>
        <ActionButtons>
          <BuyButton onClick={handleBuy}>Buy</BuyButton>
          <SellButton onClick={handleSell}>Sell</SellButton>
        </ActionButtons>
      </RightSection>
    </Card>
  );
};

// Styled Components
// Remove duplicate styled components and keep only the responsive versions
const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: var(--spacing-md);
  background-color: var(--color-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);

  @media (max-width: 480px) {
    padding: var(--spacing-sm);
  }

  body.dark-mode & {
    background-color: var(--color-card-dark);
    border-color: var(--color-border-dark);
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  width: 40%;

  @media (max-width: 480px) {
    width: 50%;
  }
`;

const ChartContainer = styled.div`
  flex: 1;
  height: 40px;
  margin: 0 var(--spacing-md);

  @media (max-width: 480px) {
    width: 100%;
    order: 3;
    margin: var(--spacing-sm) 0 0;
    height: 30px;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 25%;

  @media (max-width: 480px) {
    width: 50%;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);

  @media (max-width: 480px) {
    margin-top: var(--spacing-xxs);
  }
`;

const Button = styled.button`
  border: none;
  border-radius: var(--radius-sm);
  padding: 4px 8px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  @media (max-width: 480px) {
    padding: 3px 6px;
  }
`;

const LogoContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: var(--spacing-sm);
  background-color: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }

  body.dark-mode & {
    background-color: var(--color-surface-dark);
  }
`;

const Logo = styled.img`
  width: 60%;
  height: 60%;
  object-fit: contain;
`;

const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Symbol = styled.div`
  font-weight: 600;
  font-size: var(--font-size-md);
`;

const Name = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;

  @media (max-width: 480px) {
    max-width: 80px;
  }

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const Price = styled.div`
  font-weight: 600;
  font-size: var(--font-size-md);
`;

const Change = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: ${props => props.positive ? 'var(--color-positive)' : 'var(--color-negative)'};
  margin-bottom: var(--spacing-xs);
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

export default StockCard;
