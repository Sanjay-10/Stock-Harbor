import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import Navbar from '../navbar';
import Search from '../../scenes/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function InsiderTransactions() {
  const navigate = useNavigate();
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
  const fetchInsiderTransactions = async () => {
    const response = await axios.get('http://localhost:5001/insider');
    setSampleData(response.data);
    console.log(response.data);
  }
  fetchInsiderTransactions();
  }, []);

    
  return (
    <>
      <Navbar />
      <Box sx={{ width: { xs: '90%', sm: '60%', md: '50%' }, mx: 'auto', mt: 2 }}>
        <Search
          onSymbolSelect={(symbol) => navigate(`/dividends/${symbol}`)}
          placeholder="Search for a company"
          style={{ width: "100%", backgroundColor: "white" }}
        />
      </Box>
      <Box sx={{ mx: 'auto', mt: 4, width: { xs: '100%', sm: '80%', md: '70%' } }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Insider Transactions - {sampleData[0]?.ticker || "Company"}
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table aria-label="insider transactions table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction Date</TableCell>
                <TableCell>Executive</TableCell>
                <TableCell>Executive Title</TableCell>
                <TableCell>Security Type</TableCell>
                <TableCell>Acquisition/Disposal</TableCell>
                <TableCell>Shares</TableCell>
                <TableCell>Share Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.transaction_date}</TableCell>
                  <TableCell>{row.executive}</TableCell>
                  <TableCell>{row.executive_title}</TableCell>
                  <TableCell>{row.security_type}</TableCell>
                  <TableCell>{row.acquisition_or_disposal === "A" ? "Acquisition" : "Disposal"}</TableCell>
                  <TableCell>{row.shares}</TableCell>
                  <TableCell>${row.share_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default InsiderTransactions;
