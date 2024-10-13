import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, Button, Divider } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

function Navbar() {
  const { palette } = useTheme();
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
    "Portfolio Diversification Analysis",
    "Dividend Tracking",
    "Value Investing Metrics",
    "Stock Screener",
    "Long-Term Performance Charts",
    // "Income vs. Growth Stock Segmentation",
    // "Investment Horizon Calculator",
    // "ETF Analyzer",
    "Sector Rotation Analysis",
    // "Tax Optimization"
    "Stock News"
  ];

  const Trader = [
    "Open Interest (OI) Data",
    "VWAP Chart",
    "Order Book Analysis",
    "Tick-by-Tick Data",
    "Options Chain with Greeks",
    "Technical Indicator Library",
    // "Price Action Alerts",
    "Heatmaps",
    "Multi-Timeframe Analysis",
    "Sentiment Analysis",
    "Stock News"
  ];

  return (
    <AppBar position="static" sx={{ bgcolor: "black" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 3rem' }}>
        {/* Navbar start - Logo/Title */}
        <Typography variant="h6" sx={{ color: "white" }}>
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
                  sx={{ ":hover": { bgcolor: "black" , color:"white"}, fontSize:"1rem", fontWeight:"medium", display: 'flex', justifyContent: 'space-between' }}
                  onMouseEnter={(e) => (e.target.querySelector('svg').style.visibility = 'visible')}
                  onMouseLeave={(e) => (e.target.querySelector('svg').style.visibility = 'hidden')}
                  >
                    {item } <ArrowRightIcon sx={{ visibility: 'hidden' }} />
                  </MenuItem>
                ))}
              </Box>

              {/* Vertical Line */}
                {/* <Divider orientation="vertical" flexItem sx={{ height: '15vh', alignSelf: 'center'}} /> */}

              {/* Right Column */}
              <Box sx={{ flex: 1, paddingLeft: '1rem' }}>
                {Investor.slice(Math.ceil(Investor.length / 2)).map((item, index) => (
                  <MenuItem
                    key={index}
                    sx={{ ":hover": { bgcolor: "black" , color:"white" }, fontSize:"1rem", fontWeight:"medium" ,display: 'flex', justifyContent: 'space-between' }}
                    onMouseEnter={(e) => (e.target.querySelector('svg').style.visibility = 'visible')}
                    onMouseLeave={(e) => (e.target.querySelector('svg').style.visibility = 'hidden')}
                  >
                    {item} <ArrowRightIcon sx={{ visibility: 'hidden' }} />
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
                    key={index}
                    sx={{ ":hover": { bgcolor: "black" , color:"white" }, display: 'flex', fontSize:"1rem", fontWeight:"medium", justifyContent: 'space-between' }}
                    onMouseEnter={(e) => (e.target.querySelector('svg').style.visibility = 'visible')}
                    onMouseLeave={(e) => (e.target.querySelector('svg').style.visibility = 'hidden')}
                  >
                    {item} <ArrowRightIcon sx={{ visibility: 'hidden' }} />
                  </MenuItem>
                ))}
              </Box>

              {/* Right Column */}
              <Box sx={{ flex: 1, paddingLeft: '1rem' }}>
                {Trader.slice(Math.ceil(Trader.length / 2)).map((item, index) => (
                  <MenuItem
                    key={index}
                    sx={{ ":hover": { bgcolor: "black" , color:"white" }, display: 'flex', fontSize:"1rem", fontWeight:"medium", justifyContent: 'space-between' }}
                    onMouseEnter={(e) => (e.target.querySelector('svg').style.visibility = 'visible')}
                    onMouseLeave={(e) => (e.target.querySelector('svg').style.visibility = 'hidden')}
                  >
                    {item} <ArrowRightIcon sx={{ visibility: 'hidden' }} />
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
