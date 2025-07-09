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

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  
  return (
    <Container>
      <Header>Settings</Header>
      
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
        <SectionTitle>Preferences</SectionTitle>
        
        <SettingItem>
          <SettingIcon>
            {darkMode ? <FaMoon /> : <FaSun />}
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Dark Mode</SettingLabel>
            <SettingDescription>Switch between light and dark themes</SettingDescription>
          </SettingContent>
          <SettingAction onClick={() => setDarkMode(!darkMode)}>
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
            <FaExclamationTriangle />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>Report a Problem</SettingLabel>
            <SettingDescription>Let us know about any issues</SettingDescription>
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
    </Container>
  );
}

const Container = styled.div`
  padding: var(--spacing-lg);
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xl);
  color: var(--color-text-primary);
  
  body.dark-mode & {
    color: var(--color-text-primary-dark);
  }
`;

const Section = styled.div`
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

const LogoutText = styled.span`
  margin-left: var(--spacing-sm);
`;

export default Settings;
