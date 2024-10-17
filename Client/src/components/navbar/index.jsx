import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, Button, Divider } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const main = palette.primary.main;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [openMenu, setOpenMenu] = useState({ investor: false, trader: false });

  const handleMenuOpen = (menu) => {
    setOpenMenu((prev) => ({
      investor: menu === 'investor' ? !prev.investor : false,
      trader: menu === 'trader' ? !prev.trader : false,
    }));
  };

  const Investor = [
    // { name: "Portfolio Diversification Analysis", path: "/portfolio-diversification-analysis" },
    // { name: "Dividend Tracking", path: "/dividend-tracking" },
    // { name: "Value Investing Metrics", path: "/value-investing-metrics" },
    // { name: "Stock Screener", path: "/stock-screener" },
    // { name: "Long-Term Performance Charts", path: "/long-term-performance-charts" },
    // // { name: "Income vs. Growth Stock Segmentation", path: "/income-vs-growth-stock-segmentation" },
    // // { name: "Investment Horizon Calculator", path: "/investment-horizon-calculator" },
    // // { name: "ETF Analyzer", path: "/etf-analyzer" },
    // { name: "Sector Rotation Analysis", path: "/sector-rotation-analysis" },
    // // { name: "Tax Optimization", path: "/tax-optimization" },
    // { name: "Stock News", path: "/stock-news" },

    //CURRENTLY IMPLEMENTED
    {name: "Global Market Staus", path: "/global-market-status"},
    {name:"Top Gainers and Losers", path: "/top-gainers-losers"},
    {name:"Dividends", path: "/dividends"},
    {name:"Earnings", path: "/earnings"},
  ];

  const Trader = [
    // { name: "Open Chain", path: "/option-chain" },
    // { name: "Open Interest (OI) Data", path: "/open-interest-data" },
    // { name: "VWAP Chart", path: "/vwap-chart" },
    // { name: "Order Book Analysis", path: "/order-book-analysis" },
    // { name: "Tick-by-Tick Data", path: "/tick-by-tick-data" },
    // { name: "Options Chain with Greeks", path: "/options-chain-with-greeks" },
    // // { name: "Technical Indicator Library", path: "/technical-indicator-library" },
    // // { name: "Price Action Alerts", path: "/price-action-alerts" },
    // { name: "Heatmaps", path: "/heatmaps" },
    // { name: "Multi-Timeframe Analysis", path: "/multi-timeframe-analysis" },
    // { name: "Sentiment Analysis", path: "/sentiment-analysis" },
    // { name: "Stock News", path: "/stock-news" },

    //CURRENTLY IMPLEMENTED
    {name:"Insider Transactions", path: "/insider-transactions"},
    {name:"Companies Overview", path: "/companies-overview"},
  ];

  const handleNavigation = (path) => {
    console.log(path);
    navigate(path);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "black" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 3rem' }}>
        {/* Navbar start - Logo/Title */}
        <Typography onClick={()=>(navigate("/"))} variant="h4"  sx={{ color: "white", fontWeight:"bold", cursor:"pointer"}}>
          Stock-Harbor
        </Typography>

        {/* Navbar center - Links for larger screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '4rem', alignItems: 'center' }}>
          {/* Investing Button */}
          <Button
            onClick={() => handleMenuOpen('investor')}
            sx={{ textDecoration: 'none', color: 'green', fontSize: '1rem', display: 'flex', alignItems: 'center' }}
            endIcon={openMenu.investor ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          >
            Investing
          </Button>
          <Menu
            sx={{ position: 'absolute', top: '3.5rem' }}
            open={openMenu.investor}
            onClose={() => handleMenuOpen('investor')}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            PaperProps={{
              style: {
                width: '80vw',
                maxHeight: '300px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                borderRadius: '8px',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem' }}>
              {/* Left Column */}
              <Box sx={{ flex: 1, paddingRight: '1rem', borderRight:"1px solid lightgrey" ,  fontsize:"5rem"}}>
                {Investor.slice(0, Math.ceil(Investor.length / 2)).map((item, index) => (
                  <MenuItem
                  key={index}
                  onClick={() => handleNavigation(item.path) }
                  sx={{ ":hover": { bgcolor: "black", borderRadius:"5px" , color:"white"}, fontSize:"1rem", fontWeight:"medium", display: 'flex', justifyContent: 'space-between' }}
                  onMouseEnter={(e) => (e.target.querySelector('svg').style.visibility = 'visible')}
                  onMouseLeave={(e) => (e.target.querySelector('svg').style.visibility = 'hidden')}
                  >
                    {item.name } <ArrowRightIcon sx={{ visibility: 'hidden' }} />
                  </MenuItem>
                ))}
              </Box>

              {/* Vertical Line */}
                {/* <Divider orientation="vertical" flexItem sx={{ height: '15vh', alignSelf: 'center'}} /> */}

              {/* Right Column */}
              <Box sx={{ flex: 1, paddingLeft: '1rem' }}>
                {Investor.slice(Math.ceil(Investor.length / 2)).map((item, index) => (
                  <MenuItem
                  onClick={() => handleNavigation(item.path) }
                    key={index}
                    sx={{ ":hover": { bgcolor: "black", borderRadius:"5px" , color:"white" }, fontSize:"1rem", fontWeight:"medium" ,display: 'flex', justifyContent: 'space-between' }}
                    onMouseEnter={(e) => (e.target.querySelector('svg').style.visibility = 'visible')}
                    onMouseLeave={(e) => (e.target.querySelector('svg').style.visibility = 'hidden')}
                  >
                    {item.name} <ArrowRightIcon sx={{ visibility: 'hidden' }} />
                  </MenuItem>
                ))}
              </Box>
            </Box>
          </Menu>

          {/* Trading Button */}
          <Button
            onClick={() => handleMenuOpen('trader')}
            sx={{ textDecoration: 'none', color: 'green', fontSize: '1rem', display: 'flex', alignItems: 'center' }}
            endIcon={openMenu.trader ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          >
            Trading
          </Button>
          <Menu
            sx={{ position: 'absolute', top: '3.5rem' }}
            open={openMenu.trader}
            onClose={() => handleMenuOpen('trader')}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            PaperProps={{
              style: {
                width: '80vw',
                maxHeight: '300px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                borderRadius: '8px',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem' }}>
              {/* Left Column */}
              <Box sx={{ flex: 1, paddingRight: '1rem', borderRight:"1px solid lightgrey" }}>
                {Trader.slice(0, Math.ceil(Trader.length / 2)).map((item, index) => (
                  <MenuItem
                  onClick={() => handleNavigation(item.path) }
                    key={index}
                    sx={{ ":hover": { bgcolor: "black", borderRadius:"5px" , color:"white" }, display: 'flex', fontSize:"1rem", fontWeight:"medium", justifyContent: 'space-between' }}
                    onMouseEnter={(e) => (e.target.querySelector('svg').style.visibility = 'visible')}
                    onMouseLeave={(e) => (e.target.querySelector('svg').style.visibility = 'hidden')}
                  >
                    {item.name} <ArrowRightIcon sx={{ visibility: 'hidden' }} />
                  </MenuItem>
                ))}
              </Box>

              {/* Right Column */}
              <Box sx={{ flex: 1, paddingLeft: '1rem' }}>
                {Trader.slice(Math.ceil(Trader.length / 2)).map((item, index) => (
                  <MenuItem
                  onClick={() => handleNavigation(item.path) }
                    key={index}
                    sx={{ ":hover": { bgcolor: "black", borderRadius:"5px" , color:"white" }, display: 'flex', fontSize:"1rem", fontWeight:"medium", justifyContent: 'space-between' }}
                    onMouseEnter={(e) => (e.target.querySelector('svg').style.visibility = 'visible')}
                    onMouseLeave={(e) => (e.target.querySelector('svg').style.visibility = 'hidden')}
                  >
                    {item.name} <ArrowRightIcon sx={{ visibility: 'hidden' }} />
                  </MenuItem>
                ))}
              </Box>
            </Box>
          </Menu>
        </Box>

        {/* Navbar end - Profile or button */}
        <Box display="flex" alignItems="center">
          <Button variant="contained" color="primary">Profile</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
