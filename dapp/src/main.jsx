import {Buffer} from "buffer";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { WagmiProvider } from 'wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { config } from './wagmi.jsx'

import State from './components/State.jsx'

import './css/style.css'

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <State/>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);
