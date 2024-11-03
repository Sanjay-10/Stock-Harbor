import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import Navbar from '../navbar';
import axios from 'axios';
import Search from '../../scenes/Search';
import { useParams, useNavigate } from 'react-router-dom';

function Earnings() {
  const { symbol: symbolParam } = useParams(); // Retrieve symbol from URL
  const [earningsData, setEarningsData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch earnings data from backend based on the symbol in the URL
  const fetchEarnings = async (selectedSymbol) => {
    try {
      const response = await axios.get(`http://localhost:5001/earnings/${selectedSymbol}`);
      setEarningsData(response.data.quarterlyEarnings || []); // Set data or empty array
      console.log(response.data.quarterlyEarnings);
    } catch (error) {
      console.error('Error fetching earnings data:', error);
    }
  };

  // Fetch data whenever symbolParam (from the URL) changes
  useEffect(() => {
    if (symbolParam) {
      fetchEarnings(symbolParam);
    }
  }, [symbolParam]);

  // Update the URL when a symbol is selected
  const handleSymbolSelect = (selectedSymbol) => {
    navigate(`/earnings/${selectedSymbol}`); // Update URL
  };

  return (
    <>
      <Navbar />
      <Box sx={{ width: { xs: '90%', sm: '60%', md: '50%' }, mx: 'auto', mt: 2 }}>
        {/* Search component to select a symbol */}
        <Search placeholder="Search for a company" onSymbolSelect={handleSymbolSelect} style={{ width: "100%", backgroundColor: "white" }} />
      </Box>
      <Box sx={{ mx: 'auto', mt: 4, width: { xs: '100%', sm: '80%', md: '70%' } }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Earnings Report
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table aria-label="earnings table">
            <TableHead>
              <TableRow>
                <TableCell>Fiscal Date Ending</TableCell>
                <TableCell>Reported Date</TableCell>
                <TableCell>Reported EPS</TableCell>
                <TableCell>Estimated EPS</TableCell>
                <TableCell>Surprise</TableCell>
                <TableCell>Surprise %</TableCell>
                <TableCell>Report Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {earningsData.length > 0 ? (
                earningsData.map((row, index) => {
                  const isPositiveSurprise = row.estimatedEPS - row.reportedEPS < 0;
                  return (
                    <TableRow key={index}>
                      <TableCell>{row.fiscalDateEnding}</TableCell>
                      <TableCell>{row.reportedDate}</TableCell>
                      <TableCell>{row.reportedEPS}</TableCell>
                      <TableCell>{row.estimatedEPS}</TableCell>
                      <TableCell sx={{ color: isPositiveSurprise ? "green" : "red" }}>
                        {row.surprise}
                      </TableCell>
                      <TableCell sx={{ color: isPositiveSurprise ? "green" : "red" }}>
                        {row.surprisePercentage}%
                      </TableCell>
                      <TableCell>{row.reportTime}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Earnings;
