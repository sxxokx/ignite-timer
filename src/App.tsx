import { ThemeProvider } from 'styled-components';
import './App.css';
import { Router } from './components/Router/Router';
import { BrowserRouter } from 'react-router-dom' 
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { CyclesContextProvider } from './components/contexts/CyclesContext';


function App() {
  return ( 
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      <CyclesContextProvider>
        <Router/>
      </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
   
  )
}

export default App;
