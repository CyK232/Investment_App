import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Mock data for stocks (same as in Home component)
const mockStocks = [
  { 
    id: 1, 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: 178.72, 
    change: 1.45, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    data: [150, 152, 155, 151, 153, 156, 160, 165, 170, 175, 178.72],
    category: 'Technology'
  },
  { 
    id: 2, 
    symbol: 'MSFT', 
    name: 'Microsoft Corporation', 
    price: 338.11, 
    change: 0.89, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    data: [320, 325, 330, 328, 332, 335, 338, 336, 334, 337, 338.11],
    category: 'Technology'
  },
  { 
    id: 3, 
    symbol: 'GOOGL', 
    name: 'Alphabet Inc.', 
    price: 131.86, 
    change: -0.57, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    data: [135, 134, 133, 132.5, 131, 130, 129, 130.5, 131.2, 132, 131.86],
    category: 'Technology'
  },
  { 
    id: 4, 
    symbol: 'AMZN', 
    name: 'Amazon.com Inc.', 
    price: 127.74, 
    change: 2.31, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    data: [120, 122, 123, 124, 125, 126, 125.5, 126.2, 127, 127.5, 127.74],
    category: 'Consumer'
  },
  { 
    id: 5, 
    symbol: 'META', 
    name: 'Meta Platforms Inc.', 
    price: 244.14, 
    change: -1.25, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    data: [250, 248, 245, 246, 247, 245, 243, 242, 244, 243, 244.14],
    category: 'Technology'
  },
  { 
    id: 6, 
    symbol: 'NVDA', 
    name: 'NVIDIA Corporation', 
    price: 151.42, 
    change: 0.78, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg',
    data: [145, 146, 148, 149, 150, 149.5, 150.5, 151, 151.5, 151.42],
    category: 'Technology'
  },
  { 
    id: 7, 
    symbol: 'JPM', 
    name: 'JPMorgan Chase & Co.', 
    price: 235.32, 
    change: 1.12, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/J.P._Morgan_Logo_2008_1.svg',
    data: [230, 231, 232, 233, 234, 233.5, 234.5, 235, 235.32],
    category: 'Financial'
  },
  { 
    id: 8, 
    symbol: 'JNJ', 
    name: 'Johnson & Johnson', 
    price: 156.87, 
    change: 0.45, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Johnson_and_Johnson_Logo.svg',
    data: [154, 155, 155.5, 156, 156.5, 156.8, 156.87],
    category: 'Healthcare'
  },
  { 
    id: 9, 
    symbol: 'PG', 
    name: 'Procter & Gamble Co.', 
    price: 156.87, 
    change: 0.45, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg',
    data: [154, 155, 155.5, 156, 156.5, 156.8, 156.87],
    category: 'Consumer'
  },
  { 
    id: 10, 
    symbol: 'XOM', 
    name: 'ExxonMobil Corporation', 
    price: 110.45, 
    change: 0.67, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/ExxonMobil_Logo.svg',
    data: [108, 109, 109.5, 110, 110.2, 110.4, 110.45],
    category: 'Energy'
  },
  { 
    id: 11, 
    symbol: 'CVX', 
    name: 'Chevron Corporation', 
    price: 155.32, 
    change: 0.89, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Chevron_Logo.svg',
    data: [153, 154, 154.5, 155, 155.2, 155.3, 155.32],
    category: 'Energy'
  },
  { 
    id: 12, 
    symbol: 'COIN', 
    name: 'Coinbase Global Inc.', 
    price: 85.45, 
    change: -2.34, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase_Logo.svg',
    data: [88, 87, 86.5, 86, 85.8, 85.6, 85.45],
    category: 'Financial'
  },
  { 
    id: 13, 
    symbol: 'GLD', 
    name: 'SPDR Gold Shares', 
    price: 180.23, 
    change: 0.56, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Gold_bar.svg',
    data: [178, 179, 179.5, 180, 180.1, 180.2, 180.23],
    category: 'Commodities'
  },
  { 
    id: 14, 
    symbol: 'SPY', 
    name: 'SPDR S&P 500 ETF Trust', 
    price: 450.67, 
    change: 0.78, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/S%26P_500_logo.svg',
    data: [448, 449, 449.5, 450, 450.3, 450.5, 450.67],
    category: 'ETF'
  },
  { 
    id: 15, 
    symbol: 'QQQ', 
    name: 'Invesco QQQ Trust', 
    price: 380.45, 
    change: 1.23, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/NASDAQ_Logo.svg',
    data: [377, 378, 379, 379.5, 380, 380.3, 380.45],
    category: 'ETF'
  }
];

// Available categories for filtering
const categories = ['All', 'Technology', 'Financial', 'Healthcare', 'Consumer', 'Energy', 'Commodities', 'ETF'];

const Invest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [displayLimit, setDisplayLimit] = useState(10);

  // Handle buy and sell actions
  const handleBuy = (e, symbol) => {
    e.stopPropagation();
    alert(`Buy ${symbol}`);
    // Here you would typically open a buy modal or navigate to a buy page
  };

  const handleSell = (e, symbol) => {
    e.stopPropagation();
    alert(`Sell ${symbol}`);
    // Here you would typically open a sell modal or navigate to a sell page
  };

  // Filter stocks based on search term and category
  const filteredStocks = mockStocks.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || stock.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort stocks based on current sort criteria
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    let aValue, bValue;
    
    // Determine which property to sort by
    switch(sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'change':
        aValue = a.change;
        bValue = b.change;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }
    
    // Sort based on direction
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Toggle sort direction when clicking on the same column
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  // Get paginated stocks
  const paginatedStocks = sortedStocks.slice(0, displayLimit);
  const hasMoreStocks = sortedStocks.length > displayLimit;

  const handleSeeMore = () => {
    setDisplayLimit(displayLimit + 10);
  };

  return (
    <InvestContainer>
      <Header>
        <Title>Discover</Title>
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search stocks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <FilterContainer>
          <CategoryFilter onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
            <span>{selectedCategory}</span>
            {showCategoryDropdown ? <FaChevronUp /> : <FaChevronDown />}
          </CategoryFilter>
          {showCategoryDropdown && (
            <CategoryDropdown>
              {categories.map(category => (
                <CategoryOption 
                  key={category} 
                  selected={category === selectedCategory}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowCategoryDropdown(false);
                  }}
                >
                  {category}
                </CategoryOption>
              ))}
            </CategoryDropdown>
          )}
        </FilterContainer>
      </Header>

      <StockListHeader>
        <StockColumn onClick={() => handleSort('name')}>
          Stock
          {sortBy === 'name' && (sortDirection === 'asc' ? <FaChevronUp /> : <FaChevronDown />)}
        </StockColumn>
        <StockColumn onClick={() => handleSort('price')}>
          Price
          {sortBy === 'price' && (sortDirection === 'asc' ? <FaChevronUp /> : <FaChevronDown />)}
        </StockColumn>
        <StockColumn onClick={() => handleSort('change')}>
          Change
          {sortBy === 'change' && (sortDirection === 'asc' ? <FaChevronUp /> : <FaChevronDown />)}
        </StockColumn>
        <StockColumn>Actions</StockColumn>
      </StockListHeader>

      <StockList>
        {paginatedStocks.map(stock => (
          <StockItem key={stock.id}>
            <StockInfo>
              <StockLogo src={stock.logo} alt={stock.symbol} />
              <StockDetails>
                <StockSymbol>{stock.symbol}</StockSymbol>
                <StockName>{stock.name}</StockName>
              </StockDetails>
            </StockInfo>
            <StockPrice>${stock.price.toFixed(2)}</StockPrice>
            <StockChange positive={stock.change >= 0}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
            </StockChange>
            <StockActions>
              <BuyButton onClick={(e) => handleBuy(e, stock.symbol)}>Buy</BuyButton>
              <SellButton onClick={(e) => handleSell(e, stock.symbol)}>Sell</SellButton>
            </StockActions>
          </StockItem>
        ))}
      </StockList>
      
      {hasMoreStocks && (
        <SeeMoreButton onClick={handleSeeMore}>
          See More
        </SeeMoreButton>
      )}
    </InvestContainer>
  );
};

// Add new styled component
const SeeMoreButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  margin-top: var(--spacing-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-primary);
  font-size: var(--font-size-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-primary-light);
  }

  body.dark-mode & {
    background-color: var(--color-surface-dark);
    border-color: var(--color-border-dark);

    &:hover {
      background-color: var(--color-primary-dark);
      color: white;
    }
  }
`;

// Styled Components
const InvestContainer = styled.div`
  padding: var(--spacing-md);
  padding-bottom: 5rem; /* Extra space for bottom navigation */
`;

const Header = styled.header`
  margin-bottom: var(--spacing-lg);
`;

const Title = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
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

const FilterContainer = styled.div`
  position: relative;
  margin-bottom: var(--spacing-md);
`;

const CategoryFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;

  body.dark-mode & {
    background-color: var(--color-surface-dark);
    border-color: var(--color-border-dark);
    color: var(--color-text-primary-dark);
  }
`;

const CategoryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-top: var(--spacing-xs);
  z-index: 10;
  box-shadow: var(--shadow-md);

  body.dark-mode & {
    background-color: var(--color-surface-dark);
    border-color: var(--color-border-dark);
  }
`;

const CategoryOption = styled.div`
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  background-color: ${props => props.selected ? 'var(--color-primary-light)' : 'transparent'};
  color: ${props => props.selected ? 'var(--color-primary)' : 'inherit'};

  &:hover {
    background-color: ${props => props.selected ? 'var(--color-primary-light)' : 'var(--color-hover)'};
  }

  body.dark-mode & {
    background-color: ${props => props.selected ? 'var(--color-primary-dark)' : 'transparent'};
    &:hover {
      background-color: ${props => props.selected ? 'var(--color-primary-dark)' : 'var(--color-hover-dark)'};
    }
  }
`;

const StockListHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 2fr) minmax(80px, 1fr) minmax(80px, 1fr) minmax(140px, 1fr);
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-divider);

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
    border-color: var(--color-divider-dark);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StockLogo = styled.img`
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

const StockDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockSymbol = styled.div`
  font-weight: 600;
  font-size: var(--font-size-md);
`;

const StockPrice = styled.div`
  font-weight: 600;
  font-size: var(--font-size-md);
  display: flex;
  align-items: center;
`;

const StockChange = styled.div`
  font-weight: 500;
  font-size: var(--font-size-sm);
  color: ${props => props.positive ? 'var(--color-positive)' : 'var(--color-negative)'};
  display: flex;
  align-items: center;
`;

const StockColumn = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;

  &:last-child {
    cursor: default;
  }
`;

const StockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-background);

  body.dark-mode & {
    background-color: var(--color-background-dark);
  }
`;

const StockItem = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 2fr) minmax(80px, 1fr) minmax(80px, 1fr) minmax(140px, 1fr);
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  body.dark-mode & {
    background-color: var(--color-card-dark);
    border-color: var(--color-border-dark);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
`;

const StockName = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const StockActions = styled.div`
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: var(--spacing-sm);
  }
`;

const Button = styled.button`
  border: none;
  border-radius: var(--radius-sm);
  padding: 10px 20px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 140px;
`;

const BuyButton = styled(Button)`
  background-color: var(--color-positive);
  color: white;
  
  &:hover {
    background-color: var(--color-positive-dark);
    transform: translateY(-1px);
  }
`;

const SellButton = styled(Button)`
  background-color: var(--color-negative);
  color: white;
  
  &:hover {
    background-color: var(--color-negative-dark);
    transform: translateY(-1px);
  }
`;

export default Invest;
