import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';
import axios from 'axios';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Chip, CircularProgress } from '@mui/material';

function MarketStatus() {
  const [marketStatus, setMarketStatus] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const fetchMarketStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5001/marketstatus");
      // Assuming the response is valid and contains data in an array format
      if (response.data) {
        setMarketStatus(response.data.markets);
      }
    } catch (error) {
      console.error("Error fetching market status:", error);
      setMarketStatus([]); 
    } finally {
      setLoading(false); // Set loading to false after data fetch
    }
  };

  useEffect(() => {
    fetchMarketStatus();
  }, []);

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '20px', width: '80%', maxWidth: '80%' }}>
        {loading ? ( // Show loading indicator while loading
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Market</strong></TableCell>
                <TableCell><strong>Primary Exchanges</strong></TableCell>
                <TableCell><strong>Hours</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marketStatus && marketStatus.length > 0 ? (
                marketStatus.map((market, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <strong>{market.market_type}</strong> <br />
                      {market.region}
                    </TableCell>
                    <TableCell>{market.primary_exchanges}</TableCell>
                    <TableCell>{market.local_open} - {market.local_close}</TableCell>
                    <TableCell>
                      <Chip
                        label={market.current_status === 'open' ? 'Open' : 'Closed'}
                        color={market.current_status === 'open' ? 'success' : 'error'}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    No market data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default MarketStatus;
