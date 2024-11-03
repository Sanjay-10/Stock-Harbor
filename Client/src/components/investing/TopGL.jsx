import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box, CircularProgress, Alert } from '@mui/material';
import Navbar from '../navbar';
import axios from 'axios';

function TopGL() {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [view, setView] = useState('advance'); // 'advance' for top gainers, 'decline' for top losers
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTopGainersAndLosers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5001/topgainers'); // Adjust your endpoint here
      if (response.data && Array.isArray(response.data.top_gainers) && Array.isArray(response.data.top_losers)) {
        setTopGainers(response.data.top_gainers);
        setTopLosers(response.data.top_losers);
        console.log(response.data);
      } else {
        setError('No data found.');
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopGainersAndLosers(); // Fetch data on initial load
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        <Typography variant="h4" gutterBottom>Top Gainers and Losers</Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button 
            variant={view === 'advance' ? 'contained' : 'outlined'} 
            color="success" 
            onClick={() => setView('advance')}
          >
            Advance
          </Button>
          <Button 
            variant={view === 'decline' ? 'contained' : 'outlined'} 
            color="error" 
            onClick={() => setView('decline')}
          >
            Decline
          </Button>
        </Box>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        
        <TableContainer component={Paper} sx={{ width: '90%', maxWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Company (Ticker)</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Change Amount</strong></TableCell>
                <TableCell><strong>Change Percentage</strong></TableCell>
                <TableCell><strong>Volume</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(view === 'advance' ? topGainers : topLosers).map((item, index) => (
                
                <TableRow key={index}>
                  <TableCell>{item.ticker}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell sx={{color : item.change_amount > 0 ? "green" : "red"}}>{item.change_amount}</TableCell>
                  <TableCell sx={{ color: parseFloat(item.change_percentage) > 0 ? "green" : "red" }}>{item.change_percentage}</TableCell>
                  <TableCell>{item.volume}</TableCell>
                </TableRow>
              ))}
              {(view === 'advance' ? topGainers : topLosers).length === 0 && !loading && !error && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No data found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default TopGL;
