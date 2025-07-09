import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import App from './App';
import './styles/global.css';
// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Set up the network and wallet adapters
const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
  new TorusWalletAdapter(),
];

root.render(
  <React.StrictMode>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <App />
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>
);
