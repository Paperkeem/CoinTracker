import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { Theme } from './theme';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={Theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
);
