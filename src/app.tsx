import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import ErrorBoundaryComp from "components/error-boundary.comp";
import AppRoutes from "app.routes";
import { ThemeProvider } from '@mui/material/styles'

import './app.css';
import { Provider } from "react-redux";
import store from "store";
import theme from 'styles/theme';



function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppRoutes />
        </Router>
        </ThemeProvider>
      </Provider>
    </ErrorBoundaryComp>
  );
}

export default App;
