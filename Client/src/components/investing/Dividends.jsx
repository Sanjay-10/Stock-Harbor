import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import Search from '../../scenes/Search';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

function Dividends() {
  const navigate = useNavigate();
  const [dividends, setDividends] = useState({ symbol: "", data: [] });
  const { symbol } = useParams(); 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDividends = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/dividends/${symbol}`);
        console.log("Full response data:", response.data);

        if (Array.isArray(response.data)) {
          setDividends({ symbol: response.data.symbol, data: response.data.data });
        } else if (typeof response.data === 'object') {
          setDividends({ symbol: response.data.symbol, data: response.data.data });
        } else {
          console.error("Unexpected data format:", response.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDividends();
  }, [symbol]);

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
      {loading ? (
        <Typography variant="h6" align="center" color="text.secondary" mt={4}>
          Loading dividends...
        </Typography>
      ) : (
        <DividendCard symbol={dividends.symbol} data={dividends.data} />
      )}
    </>
  );
}

function DividendCard({ symbol, data = [] }) {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, mb: 2 }}
      > 
        Dividends for {symbol}
      </Typography>
      {data.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 2, width: { xs: '100%', sm: '90%', md: '80%' }, mx: 'auto', boxShadow: 3 }}>
          <Table aria-label="dividend table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>Ex-Dividend Date</strong></TableCell>
                <TableCell><strong>Declaration Date</strong></TableCell>
                <TableCell><strong>Record Date</strong></TableCell>
                <TableCell><strong>Payment Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "green", fontSize: "1rem", fontWeight: "bold" }}>
                    ${item.amount}
                  </TableCell>
                  <TableCell>{item.ex_dividend_date}</TableCell>
                  <TableCell>{item.declaration_date}</TableCell>
                  <TableCell>{item.record_date}</TableCell>
                  <TableCell>{item.payment_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" color="text.secondary" align="center" mt={4}>
          No dividend data available.
        </Typography>
      )}
    </Container>
  );
}

export default Dividends;
