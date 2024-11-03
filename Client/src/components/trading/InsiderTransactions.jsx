import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import Navbar from '../navbar';
import Search from '../../scenes/Search';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function InsiderTransactions() {
  const navigate = useNavigate();
  const { symbol } = useParams(); // Retrieve symbol from URL
  const [sampleData, setSampleData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch insider transactions based on symbol from URL
  useEffect(() => {
    const fetchInsiderTransactions = async () => {
      if (symbol) {
        try {
          const response = await axios.get(`http://localhost:5001/insider-transactions/${symbol}`);
          setSampleData(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.error('Error fetching insider transactions:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // If no symbol, stop loading to allow search
      }
    };

    fetchInsiderTransactions();
  }, [symbol]);

  // Update URL when a symbol is selected from Search component
  const handleSymbolSelect = (selectedSymbol) => {
    navigate(`/insider-transactions/${selectedSymbol}`); // Update URL with selected symbol
  };

  return (
    <>
      <Navbar />
      <Box sx={{ width: { xs: '90%', sm: '60%', md: '50%' }, mx: 'auto', mt: 2 }}>
        <Search
          onSymbolSelect={handleSymbolSelect}
          placeholder="Search for a company"
          style={{ width: "100%", backgroundColor: "white" }}
        />
      </Box>
      <Box sx={{ mx: 'auto', mt: 4, width: { xs: '100%', sm: '80%', md: '70%' } }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Insider Transactions - {loading ? "Loading..." : (sampleData[0]?.ticker || "Company")}
        </Typography>
        {loading ? (
          <Typography variant="h6" align="center" color="text.secondary">
            Loading insider transactions...
          </Typography>
        ) : (
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
                {sampleData.length > 0 ? (
                  sampleData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.transaction_date}</TableCell>
                      <TableCell>{row.executive}</TableCell>
                      <TableCell>{row.executive_title}</TableCell>
                      <TableCell>{row.security_type}</TableCell>
                      <TableCell>{row.acquisition_or_disposal === "A" ? "Acquisition" : "Disposal"}</TableCell>
                      <TableCell>{row.shares}</TableCell>
                      <TableCell>${row.share_price}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1" color="text.secondary">No insider transaction data available.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}

export default InsiderTransactions;
