import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CardMedia,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Navbar from "../navbar";
import { formatNumber } from "../../scenes/FormatNumber";

const StockCompanyPage = () => {
  const { symbol } = useParams(); // Get the symbol from the URL
  const [companyData, setCompanyData] = useState(null);
  const [companyNews, setCompanyNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyOverview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/overview/${symbol}`
        );
        // setCompanyData(response.data);
        setCompanyData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching company data:", error);
        setLoading(false);
      }
    };

    const fetchComapnyNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/stocknews/${symbol}`
        );
        setCompanyNews(response.data);
      } catch (error) {
        console.error("Error fetching company news:", error);
      }
    };

    fetchComapnyNews();
    fetchCompanyOverview();
  }, [symbol]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center" // Horizontally centers the child
        alignItems="center" // Vertically centers the child
        height="100vh" // Makes the container full height
      >
        <CircularProgress sx={{ m: 10 }} />
      </Box>
    )};

  if (!companyData.Name) {
    return <><Navbar/> <Typography sx={{textAlign:"center", m:10}} variant="h2">No data found</Typography> </>;
  }

  return (
    <>
      <Navbar />
      <Container sx={{ padding: "30px 0" }}>
      <Box>
  <Grid container spacing={2} alignItems="center">
        {/* Price Section (narrower now) */}
        <Grid item xs={12} md={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          {companyData.Name}
        </Typography>
      </Box>
      <Typography variant="h6">
        {companyData.Symbol}
      </Typography>
      <Box sx={{mt:3}}>
      <Typography variant="h3" color="green">
          {"PRICE"} USD
        </Typography>
        <Typography variant="h6">
          {companyData.Exchange}: {companyData.Currency}
        </Typography>
      </Box>
    </Grid>
    
    <Grid item xs={12} md={8}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h5">About {companyData.Name}</Typography>
        <Typography variant="body2" gutterBottom>
          {companyData.Description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2">
          <strong>Industry:</strong> {companyData.Industry}
        </Typography>
        <Typography variant="body2">
          <strong>Sector:</strong> {companyData.Sector}
        </Typography>
        <Typography variant="body2">
          <strong>Website:</strong>{" "}
          <a href={companyData.OfficialSite} target="_blank" rel="noopener noreferrer">
            {companyData.OfficialSite}
          </a>
        </Typography>
      </Paper>
    </Grid>
  </Grid>
</Box>

        <Box mt={4}>
          <Grid container spacing={2}>
            {/* Left side: Overview, Financials, Performance */}
            <Grid item xs={12} md={8}>
              {/* Overview Section */}
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5">Overview</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Market Capitalization:</strong>{" "}
                        {formatNumber(companyData.MarketCapitalization)}
                      </Typography>
                      <Typography>
                        <strong>Revenue:</strong>{" "}
                        {formatNumber(companyData.RevenueTTM)}
                      </Typography>
                      <Typography>
                        <strong>EPS:</strong> {companyData.EPS}
                      </Typography>
                      <Typography>
                        <strong>PE Ratio:</strong> {companyData.PERatio}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Latest Quarter: </strong>{" "}
                        {companyData.LatestQuarter}
                      </Typography>
                      <Typography>
                        <strong>Dividend Per Share:</strong>{" "}
                        {companyData.DividendPerShare} USD
                      </Typography>
                      <Typography>
                        <strong>Beta:</strong> {companyData.Beta}
                      </Typography>
                      <Typography>
                        <strong>52 Week High:</strong>{" "}
                        {companyData["52WeekHigh"]}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Financial Ratios Section */}
              <Box mt={2}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5">Financial Ratios</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>PEG Ratio:</strong> {companyData.PEGRatio}
                        </Typography>
                        <Typography>
                          <strong>Price to Book Ratio:</strong>{" "}
                          {companyData.PriceToBookRatio}
                        </Typography>
                        <Typography>
                          <strong>EV to Revenue:</strong>{" "}
                          {companyData.EVToRevenue}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Trailing PE:</strong> {companyData.TrailingPE}
                        </Typography>
                        <Typography>
                          <strong>Forward PE:</strong> {companyData.ForwardPE}
                        </Typography>
                        <Typography>
                          <strong>Price to Sales Ratio:</strong>{" "}
                          {companyData.PriceToSalesRatioTTM}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>

              {/* Performance Section */}
              <Box mt={2}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5">Performance Metrics</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Profit Margin:</strong>{" "}
                          {companyData.ProfitMargin}
                        </Typography>
                        <Typography>
                          <strong>Operating Margin:</strong>{" "}
                          {companyData.OperatingMarginTTM}
                        </Typography>
                        <Typography>
                          <strong>Return on Assets:</strong>{" "}
                          {companyData.ReturnOnAssetsTTM}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Return on Equity:</strong>{" "}
                          {companyData.ReturnOnEquityTTM}
                        </Typography>
                        <Typography>
                          <strong>Quarterly Earnings Growth (YoY):</strong>{" "}
                          {companyData.QuarterlyEarningsGrowthYOY}
                        </Typography>
                        <Typography>
                          <strong>Quarterly Revenue Growth (YoY):</strong>{" "}
                          {companyData.QuarterlyRevenueGrowthYOY}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>

              {/* <Box mt={2}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Chart (Placeholder)</Typography>
                  {/* Insert chart component here */}
              {/* </CardContent>
              </Card>
            </Box> */}
            </Grid>

            {/* Right side: News, Description */}
            <Grid item xs={12} md={4}>
              

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h5">Recent News</Typography>
                {/* Replace with a News component if needed */}
                
                  <Paper variant="outlined" item xs={12} md={4}>
                    <Divider sx={{ my: 2 }} />

                    {companyNews.length === 0 ? (
                      <Typography>{companyNews}No news available</Typography>
                    ) : (
                      companyNews.slice(0, 10).map((newsItem, index) => (
                        <Card key={index} sx={{ mb: 2 }}>
                          <CardMedia
                            component="img"
                            height="140"
                            image={newsItem.banner_image}
                            alt={newsItem.feed.title}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {newsItem.feed.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {newsItem.summary}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              mt={1}
                            >
                              Published:{" "}
                              {new Date(
                                newsItem.feed.time_published
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </Typography>
                            <Button
                              size="small"
                              href={newsItem.feed.url}
                              target="_blank"
                              sx={{ mt: 1 }}
                            >
                              Read More
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </Paper>
                
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default StockCompanyPage;
