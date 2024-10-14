
import Trader from './components/trading/index';
import Homepage from './components/homepage/index';
import Investor from './components/investing/';
import { BrowserRouter, Routes, Route  } from  "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import {createTheme} from '@mui/material/styles';
import {useSelector} from "react-redux";
import { useMemo } from 'react';
import Navbar from "./components/navbar";
import Diversification from "./components/investing/diversification";
import Dividend from "./components/investing/dividend";
import ValueInvesting from "./components/investing/valueInvesting";
import StockScreener from "./components/investing/stockScreener";
import LongTermPerformance from "./components/investing/long-termPerf";
import SectorRotation from "./components/investing/sectorRotation";
import News from "./components/investing/news";
import OpenInterest from "./components/trading/openInterest";
import Vwap from "./components/trading/vwap";
import OrderBook from "./components/trading/orderBook";
import Tick from "./components/trading/tick";
import OptionChain from "./components/trading/optionChain";
import Heatmaps from "./components/trading/heatmaps";
import MultiTF from "./components/trading/MultiTF";
import SentimentAnalysis from "./components/trading/SentimentAnalysis";
import Greeks from "./components/trading/greeks";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
    <BrowserRouter>
     <ThemeProvider theme = { theme }>
     <CssBaseline/>

      <Routes>
      <Route path="/" element={<><Homepage /></>} />

{/* Investor */}
            <Route path="/portfolio-diversification-analysis" element={<Diversification/>} />
            <Route path="/dividend-tracking" element={<Dividend/>} />
            <Route path="/value-investing-metrics" element={<ValueInvesting/>} />
            <Route path="/stock-screener" element={<StockScreener/>} />
            <Route path="/long-term-performance-charts" element={<LongTermPerformance/>} />
            {/* <Route path="/income-vs-growth-stock-segmentation" element={<> </>} /> */}
            {/* <Route path="/investment-horizon-calculator" element={<> </>} /> */}
            {/* <Route path="/etf-analyzer" element={<> </>} /> */}
            <Route path="/sector-rotation-analysis" element={<SectorRotation/>} />
            {/* <Route path="/tax-optimization" element={<> </>} /> */}
            <Route path="/stock-news" element={<News/>} />

{/* Trader */}
            <Route path="/option-chain" element={<OptionChain/>} />
            <Route path="/open-interest-data" element={<OpenInterest/>} />
            <Route path="/vwap-chart" element={<Vwap/>} />
            <Route path="/order-book-analysis" element={<OrderBook/>} />
            <Route path="/tick-by-tick-data" element={<Tick/>} />
            <Route path="/options-chain-with-greeks" element={<Greeks/>} />
            {/* <Route path="/technical-indicator-library" element={</>} /> */}
            {/* <Route path="/price-action-alerts" element={<> </>} /> */}
            <Route path="/heatmaps" element={<Heatmaps/>} />
            <Route path="/multi-timeframe-analysis" element={<MultiTF/>} />
            <Route path="/sentiment-analysis" element={<SentimentAnalysis/>} />
            
      </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
