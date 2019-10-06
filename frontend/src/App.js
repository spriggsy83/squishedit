import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from './util/theme';
import Header from './components/Header';
import { UnderConstruction } from './util/renderHelpers';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container>
        <Router>
          <UnderConstruction path="/" />
          <UnderConstruction path="test" />
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
