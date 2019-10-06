import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from './util/theme';
import Header from './components/Header';
import { Garments, Clients, Measure } from './pages';
import { UnderConstruction } from './util/renderHelpers';

function Page(props) {
  return (
    <>
      <Header {...props} />
      <Container>
        <props.component {...props} />
      </Container>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Page component={UnderConstruction} path="/" />
        <Page component={Garments} path="garments" />
        <Page component={UnderConstruction} path="garments/upload" />
        <Page component={Clients} path="clients" />
        <Page component={UnderConstruction} path="clients/:id" />
        <Page component={Measure} path="measure" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
