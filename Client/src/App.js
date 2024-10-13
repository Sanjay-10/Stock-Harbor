import Navbar from "./components/navbar/index"
import Trader from './components/trading/index';
import Homepage from './components/homepage/index';
import Investor from './components/investing/';
import { BrowserRouter, Routes, Route  } from  "react-router-dom";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";

function App() {

  return (
    <>
    <BrowserRouter>
     <ThemeProvider theme = { theme }>

      <Routes>
        <Route path="/"
        element={ <><Navbar/> <Homepage/></>} />

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
