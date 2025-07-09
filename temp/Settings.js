import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaUser, 
  FaMoon, 
  FaSun, 
  FaBell, 
  FaLock, 
  FaSignOutAlt,
  FaChevronRight,
  FaToggleOn,
  FaToggleOff,
  FaFingerprint,
  FaShieldAlt,
  FaQuestionCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

  const { publicKey, connected } = useWallet();
  const walletAddress = publicKey ? publicKey.toString() : "Not connected";
const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, this would update the body class and persist the setting
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <SettingsContainer>
      <Header>
        <Title>Settings</Title>
      </Header>

      <Section>
        <SectionTitle>Account</SectionTitle>
        
        <SettingItem>
          <SettingIcon>
            <FaUser />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Profile</SettingLabel>
            <SettingDescription>Manage your personal information</SettingDescription>
          </SettingContent>
          <SettingAction>
            <FaChevronRight />
          </SettingAction>
        </SettingItem>
        
        <SettingItem>
          <SettingIcon>
            <FaLock />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Security</SettingLabel>
            <SettingDescription>Password and security settings</SettingDescription>
          </SettingContent>
          <SettingAction>
            <FaChevronRight />
          </SettingAction>
        </SettingItem>
        
        <SettingItem>
          <SettingIcon>
            <FaFingerprint />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Biometric Authentication</SettingLabel>
            <SettingDescription>Use fingerprint or face ID</SettingDescription>
          </SettingContent>
          <SettingAction onClick={() => setBiometricAuth(!biometricAuth)}>
            {biometricAuth ? <FaToggleOn size={24} color="var(--color-primary)" /> : <FaToggleOff size={24} />}
          </SettingAction>
        </SettingItem>
      </Section>
      <Section>
        <SectionTitle>Wallet</SectionTitle>
        
        <SettingItem>
          <SettingIcon>
            <FaWallet />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Connect Wallet</SettingLabel>
            <SettingDescription>Connect your Solana wallet</SettingDescription>
            {connected && <SettingDescription style={{marginTop: "var(--spacing-xs)", color: "var(--color-primary)"}}>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</SettingDescription>}          </SettingContent>
          <SettingAction>
            <StyledWalletButton />
          </SettingAction>
        </SettingItem>
      </Section>

      <Section>
        <SectionTitle>Preferences</SectionTitle>
        
        <SettingItem>
          <SettingIcon>
            {darkMode ? <FaMoon /> : <FaSun />}
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Dark Mode</SettingLabel>
            <SettingDescription>Switch between light and dark themes</SettingDescription>
          </SettingContent>
          <SettingAction onClick={toggleDarkMode}>
            {darkMode ? <FaToggleOn size={24} color="var(--color-primary)" /> : <FaToggleOff size={24} />}
          </SettingAction>
        </SettingItem>
        
        <SettingItem>
          <SettingIcon>
            <FaBell />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Notifications</SettingLabel>
            <SettingDescription>Manage push notifications</SettingDescription>
          </SettingContent>
          <SettingAction onClick={() => setNotifications(!notifications)}>
            {notifications ? <FaToggleOn size={24} color="var(--color-primary)" /> : <FaToggleOff size={24} />}
          </SettingAction>
        </SettingItem>
      </Section>

      <Section>
        <SectionTitle>Support</SectionTitle>
        
        <SettingItem>
          <SettingIcon>
            <FaQuestionCircle />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Help Center</SettingLabel>
            <SettingDescription>Get help with your account</SettingDescription>
          </SettingContent>
          <SettingAction>
            <FaChevronRight />
          </SettingAction>
        </SettingItem>
        
        <SettingItem>
          <SettingIcon>
            <FaShieldAlt />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Privacy Policy</SettingLabel>
            <SettingDescription>Read our privacy policy</SettingDescription>
          </SettingContent>
          <SettingAction>
            <FaChevronRight />
          </SettingAction>
        </SettingItem>
        
        <SettingItem>
          <SettingIcon>
            <FaExclamationTriangle />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Terms of Service</SettingLabel>
            <SettingDescription>Read our terms of service</SettingDescription>
          </SettingContent>
          <SettingAction>
            <FaChevronRight />
          </SettingAction>
        </SettingItem>
      </Section>

      <LogoutButton>
        <FaSignOutAlt />
        <LogoutText>Log Out</LogoutText>
      </LogoutButton>
    </SettingsContainer>
  );
};

// Styled Components
const SettingsContainer = styled.div`
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

const Section = styled.section`
  margin-bottom: var(--spacing-xl);
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-secondary);

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-divider);

  &:last-child {
    border-bottom: none;
  }

  body.dark-mode & {
    border-color: var(--color-divider-dark);
  }
`;

const SettingIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-md);
  color: var(--color-primary);

  body.dark-mode & {
    background-color: var(--color-surface-dark);
  }
`;

const SettingContent = styled.div`
  flex: 1;
`;

const SettingLabel = styled.div`
  font-weight: 500;
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-xs);
`;

const SettingDescription = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);

  body.dark-mode & {
    color: var(--color-text-secondary-dark);
  }
`;

const SettingAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-hint);
  cursor: pointer;

  body.dark-mode & {
    color: var(--color-text-hint-dark);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--spacing-md);
  background-color: transparent;
  border: 1px solid var(--color-negative);
  border-radius: var(--radius-md);
  color: var(--color-negative);
  font-weight: 500;
  font-size: var(--font-size-md);
  cursor: pointer;
  margin-top: var(--spacing-xl);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 82, 82, 0.1);
  }
`;

const StyledWalletButton = styled(WalletMultiButton)`
  background-color: var(--color-primary) !important;
  border-radius: var(--radius-md) !important;
  height: auto !important;
  padding: var(--spacing-sm) var(--spacing-md) !important;
  font-family: inherit !important;
  font-size: var(--font-size-sm) !important;
  font-weight: 500 !important;
  
  &:hover {
    background-color: var(--color-primary-dark) !important;
  }
`;
const LogoutText = styled.span`
  margin-left: var(--spacing-sm);
`;

export default Settings;
