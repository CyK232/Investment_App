import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaChartLine, FaWallet, FaCog, FaDownload } from 'react-icons/fa';

// Import pages
import Home from './components/Home/Home';
import Invest from './components/Invest/Invest';
import Portfolio from './components/Portfolio/Portfolio';
import Settings from './components/Settings/Settings';

const APP_VERSION = '1.0.0';

const App = () => {
  const location = useLocation();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    checkForUpdates();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const checkForUpdates = async () => {
    // Simulate checking for updates
    const mockUpdateInfo = {
      version: '1.1.0',
      description: 'New features and improvements:\n- Enhanced stock charts\n- Improved performance\n- Bug fixes',
      mandatory: false
    };

    if (mockUpdateInfo.version !== APP_VERSION) {
      setUpdateInfo(mockUpdateInfo);
      setShowUpdateModal(true);
    }
  };

  const handleUpdate = () => {
    // Simulate update process
    console.log('Starting update process...');
    setTimeout(() => {
      console.log('Update completed');
      setShowUpdateModal(false);
    }, 2000);
  };

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setShowBuyModal(true);
  };

  const closeBuyModal = () => {
    setShowBuyModal(false);
    setSelectedStock(null);
  };

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Home onStockClick={handleStockClick} />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>

      <BottomNav>
        <NavItem to="/" className={location.pathname === '/' ? 'active' : ''}>
          <NavIcon><FaHome /></NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem to="/invest" className={location.pathname === '/invest' ? 'active' : ''}>
          <NavIcon><FaChartLine /></NavIcon>
          <NavText>Invest</NavText>
        </NavItem>
        <NavItem to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>
          <NavIcon><FaWallet /></NavIcon>
          <NavText>Portfolio</NavText>
        </NavItem>
        <NavItem to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
          <NavIcon><FaCog /></NavIcon>
          <NavText>Settings</NavText>
        </NavItem>
      </BottomNav>

      {showBuyModal && selectedStock && (
        <BuyModal stock={selectedStock} onClose={closeBuyModal} />
      )}

      {showUpdateModal && updateInfo && (
        <UpdateModal
          currentVersion={APP_VERSION}
          updateInfo={updateInfo}
          onUpdate={handleUpdate}
          onClose={() => !updateInfo.mandatory && setShowUpdateModal(false)}
        />
      )}
    </AppContainer>
  );
};

const BuyModal = ({ stock, onClose }) => {
  const presetAmounts = [10, 50, 100, 500];
  const [amount, setAmount] = useState('');

  const handleAmountClick = (value) => {
    setAmount(value);
  };

  const handleBuy = () => {
    console.log(`Buying ${amount} USDC of ${stock.symbol}`);
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <StockInfo>
            <StockLogo src={stock.logo || 'https://via.placeholder.com/40'} alt={stock.symbol} />
            <div>
              <StockSymbol>{stock.symbol}</StockSymbol>
              <StockName>{stock.name}</StockName>
            </div>
          </StockInfo>
          <StockPrice>
            ${stock.price.toFixed(2)}
            <PriceChange positive={stock.change > 0}>
              {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
            </PriceChange>
          </StockPrice>
        </ModalHeader>

        <ModalBody>
          <SectionTitle>Buy {stock.symbol}</SectionTitle>
          <InputLabel>Amount (USDC)</InputLabel>
          <AmountInput 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          
          <PresetAmounts>
            {presetAmounts.map((value) => (
              <PresetButton 
                key={value} 
                onClick={() => handleAmountClick(value)}
                selected={amount === value}
              >
                ${value}
              </PresetButton>
            ))}
          </PresetAmounts>
          
          <TotalSection>
            <TotalLabel>Total</TotalLabel>
            <TotalAmount>${amount || 0}</TotalAmount>
          </TotalSection>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <BuyButton onClick={handleBuy} disabled={!amount}>Buy Now</BuyButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background-color: var(--color-card);
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: var(--z-index-footer);

  body.dark-mode & {
    background-color: var(--color-card-dark);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: 500;
  padding: var(--spacing-xs);
  width: 25%;
  text-decoration: none;

  &.active {
    color: var(--color-primary);
  }

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }

  body.dark-mode &.active {
    color: var(--color-primary-light);
  }
`;

const NavIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;

const NavText = styled.span`
  font-size: 0.75rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-overlay);
`;

const ModalContent = styled.div`
  background-color: var(--color-card);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: var(--z-index-modal);
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 95%;
    max-height: 85vh;
    margin: var(--spacing-sm);
  }

  body.dark-mode & {
    background-color: var(--color-card-dark);
  }
`;

const ModalHeader = styled.div`
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    padding: var(--spacing-md);
  }

  body.dark-mode & {
    border-color: var(--color-divider-dark);
  }
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StockLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: var(--spacing-sm);
  background-color: var(--color-surface);

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }

  body.dark-mode & {
    background-color: var(--color-surface-dark);
  }
`;

const StockSymbol = styled.div`
  font-weight: 600;
  font-size: var(--font-size-md);
`;

const StockName = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const StockPrice = styled.div`
  text-align: right;
  font-weight: 600;
  font-size: var(--font-size-lg);
`;

const PriceChange = styled.div`
  font-size: var(--font-size-sm);
  color: ${props => props.positive ? 'var(--color-positive)' : 'var(--color-negative)'};
`;

const ModalBody = styled.div`
  padding: var(--spacing-lg);

  @media (max-width: 480px) {
    padding: var(--spacing-md);
  }
`;

const SectionTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
`;

const InputLabel = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-secondary);

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const AmountInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);

  body.dark-mode & {
    background-color: var(--color-surface-dark);
    border-color: var(--color-border-dark);
    color: var(--color-text-primary-dark);
  }
`;

const PresetAmounts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);

  @media (max-width: 480px) {
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-md);
  }
`;

const PresetButton = styled.button`
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  font-weight: 500;
  background-color: ${props => props.selected ? 'var(--color-primary)' : 'var(--color-surface)'};
  color: ${props => props.selected ? 'white' : 'var(--color-text-primary)'};
  border: 1px solid ${props => props.selected ? 'var(--color-primary)' : 'var(--color-border)'};

  @media (max-width: 480px) {
    padding: var(--spacing-xs);
    font-size: var(--font-size-xs);
  }

  body.dark-mode & {
    background-color: ${props => props.selected ? 'var(--color-primary)' : 'var(--color-surface-dark)'};
    color: ${props => props.selected ? 'white' : 'var(--color-text-primary-dark)'};
    border-color: ${props => props.selected ? 'var(--color-primary)' : 'var(--color-border-dark)'};
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
  border-top: 1px solid var(--color-divider);

  body.dark-mode & {
    border-color: var(--color-divider-dark);
  }
`;

const TotalLabel = styled.div`
  font-weight: 500;
  font-size: var(--font-size-md);
`;

const TotalAmount = styled.div`
  font-weight: 600;
  font-size: var(--font-size-lg);
`;

const ModalFooter = styled.div`
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-divider);
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    padding: var(--spacing-md);
  }

  body.dark-mode & {
    border-color: var(--color-divider-dark);
  }
`;

const CancelButton = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 500;
  background-color: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  width: 48%;

  body.dark-mode & {
    color: var(--color-text-primary-dark);
    border-color: var(--color-border-dark);
  }
`;

const BuyButton = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 500;
  background-color: var(--color-accent);
  color: white;
  border: none;
  width: 48%;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const UpdateModal = ({ currentVersion, updateInfo, onUpdate, onClose }) => {
  return (
    <ModalOverlay onClick={updateInfo.mandatory ? undefined : onClose}>
      <UpdateModalContent onClick={(e) => e.stopPropagation()}>
        <UpdateModalHeader>
          <UpdateTitle>
            <FaDownload /> Update Available
          </UpdateTitle>
          <VersionInfo>
            v{currentVersion} → v{updateInfo.version}
          </VersionInfo>
        </UpdateModalHeader>

        <UpdateModalBody>
          <UpdateDescription>
            {updateInfo.description.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </UpdateDescription>
        </UpdateModalBody>

        <UpdateModalFooter>
          {!updateInfo.mandatory && (
            <CancelButton onClick={onClose}>Later</CancelButton>
          )}
          <UpdateButton onClick={onUpdate} fullWidth={updateInfo.mandatory}>
            Update Now
          </UpdateButton>
        </UpdateModalFooter>
      </UpdateModalContent>
    </ModalOverlay>
  );
};

const UpdateModalContent = styled(ModalContent)`
  max-width: 400px;
`;

const UpdateModalHeader = styled(ModalHeader)`
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xs);
`;

const UpdateTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  color: var(--color-primary);

  svg {
    font-size: 1.2em;
  }
`;

const VersionInfo = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const UpdateModalBody = styled(ModalBody)`
  padding-top: var(--spacing-md);
`;

const UpdateDescription = styled.div`
  font-size: var(--font-size-sm);
  line-height: 1.6;

  p {
    margin-bottom: var(--spacing-sm);
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const UpdateModalFooter = styled(ModalFooter)`
  padding: var(--spacing-md);
`;

const UpdateButton = styled(BuyButton)`
  width: ${props => props.fullWidth ? '100%' : '48%'};
  background-color: var(--color-primary);
`;

export default App;
