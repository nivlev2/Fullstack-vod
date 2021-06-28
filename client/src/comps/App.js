import React from 'react'
import '../styles/App.css';
import AppVod from './AppVod';
import PageContent from './PageContent';
import {ThemeProvider} from '../contexts/ThemeContext'
import { LoginStatusProvider } from '../contexts/LoginStatusContext';
function App() {
  return (
    <div className="App">
      <ThemeProvider>
      <PageContent>
      <LoginStatusProvider>
      <AppVod/>
      </LoginStatusProvider>
      </PageContent>
      </ThemeProvider>
    </div>
  );
}

export default App;
