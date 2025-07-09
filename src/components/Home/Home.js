import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaWallet } from 'react-icons/fa';
import StockCard from './StockCard';

// Mock data for stocks
const mockStocks = [
  { 
    id: 1, 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: 178.72, 
    change: 1.45, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    data: [150, 152, 155, 151, 153, 156, 160, 165, 170, 175, 178.72]
  },
  { 
    id: 2, 
    symbol: 'MSFT', 
    name: 'Microsoft Corporation', 
    price: 338.11, 
    change: 0.89, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    data: [320, 325, 330, 328, 332, 335, 338, 336, 334, 337, 338.11]
  },
  { 
    id: 3, 
    symbol: 'GOOGL', 
    name: 'Alphabet Inc.', 
    price: 131.86, 
    change: -0.57, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    data: [135, 134, 133, 132.5, 131, 130, 129, 130.5, 131.2, 132, 131.86]
  },
  { 
    id: 4, 
    symbol: 'AMZN', 
    name: 'Amazon.com Inc.', 
    price: 127.74, 
    change: 2.31, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    data: [120, 122, 123, 124, 125, 126, 125.5, 126.2, 127, 127.5, 127.74]
  },
  { 
    id: 5, 
    symbol: 'TSLA', 
    name: 'Tesla, Inc.', 
    price: 237.49, 
    change: -1.23, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
    data: [240, 238, 235, 233, 236, 238, 240, 239, 238, 236, 237.49]
  },
];

const ConnectWalletButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }

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

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState(mockStocks);
  const [showAllStocks, setShowAllStocks] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = mockStocks.filter(stock => 
      stock.symbol.toLowerCase().includes(term.toLowerCase()) || 
      stock.name.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredStocks(filtered);
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const displayedStocks = showAllStocks ? filteredStocks : filteredStocks.slice(0, 5);
  const hasMoreStocks = filteredStocks.length > 5;

  return (
    <HomeContainer>
      <Header>
        {isWalletConnected ? (
          <Balance>
            <BalanceLabel>Your Balance</BalanceLabel>
            <BalanceAmount>$12,345.67</BalanceAmount>
          </Balance>
        ) : null}
        <ConnectWalletButton onClick={handleConnectWallet}>
          <FaWallet /> {isWalletConnected ? 'Disconnect Wallet' : 'Connect Your Wallet'}
        </ConnectWalletButton>
      </Header>

      <SearchContainer>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchContainer>

      <StockListTitle>Watchlist</StockListTitle>
      <StockList>
        {displayedStocks.map(stock => (
          <StockCardWrapper key={stock.id} onClick={() => alert(`Viewing ${stock.symbol}`)}>
            <StockCard stock={stock} />
          </StockCardWrapper>
        ))}
      </StockList>
      {hasMoreStocks && (
        <ShowMoreButton onClick={() => setShowAllStocks(!showAllStocks)}>
          {showAllStocks ? 'Show Less' : 'Show All'}
        </ShowMoreButton>
      )}
    </HomeContainer>
  );
};

// Add new styled component
const ShowMoreButton = styled.button`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  margin-top: var(--spacing-md);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-surface);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  body.dark-mode & {
    border-color: var(--color-border-dark);
    color: var(--color-text-secondary-dark);

    &:hover {
      background-color: var(--color-surface-dark);
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
  }
`;

// Styled Components
const HomeContainer = styled.div`
  padding: var(--spacing-md);
  padding-bottom: 5rem;
  max-width: 100%;
  overflow-x: hidden;

  @media (max-width: 480px) {
    padding: var(--spacing-sm);
    padding-bottom: 5rem;
  }
`;

const Header = styled.header`
  margin-bottom: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--spacing-sm);

  @media (max-width: 480px) {
    margin-bottom: var(--spacing-md);
  }
`;

const Balance = styled.div`
  margin-bottom: var(--spacing-md);

  @media (max-width: 480px) {
    margin-bottom: var(--spacing-sm);
    width: 100%;
  }
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
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: var(--spacing-md);
`;

const SearchIcon = styled.div`
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-hint);

  body.dark-mode & {
    color: var(--color-text-hint-dark);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) calc(var(--spacing-md) * 2.5);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  font-size: var(--font-size-md);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  body.dark-mode & {
    background-color: var(--color-surface-dark);
    border-color: var(--color-border-dark);
    color: var(--color-text-primary-dark);
  }
`;

const StockListTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
`;

const StockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const StockCardWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
`;

export default Home;