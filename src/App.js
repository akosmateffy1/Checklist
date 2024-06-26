import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Checklist from './components/Chechlist';

function App() {
  return (
    <Container>
      <CssBaseline />
      <Checklist driveNumber="12345" />
    </Container>
  );
}

export default App;
