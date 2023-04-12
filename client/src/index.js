import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import ChatProvider from './Context/ChatProvider';
import { Provider } from 'react-redux';
import {store} from './Context/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <ChatProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);

