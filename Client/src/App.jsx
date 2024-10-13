
import Trader from './components/trader/index';
import Homepage from './components/homepage/index';
import Investor from './components/investor/index';
import { BrowserRouter, Routes, Route  } from  "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import {createTheme} from '@mui/material/styles';
import {useSelector} from "react-redux";
import { useMemo } from 'react';


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
    <BrowserRouter>
     <ThemeProvider theme = { theme }>
     <CssBaseline/>

      <Routes>
        <Route path="/"
        element={ <Homepage/>} />

        <Route path="/investor"
        element= {<Investor/>} /> 

        <Route path="/trader"
        element= {<Trader/>} />

      </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
