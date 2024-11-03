import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Paper, Divider } from '@mui/material';
import Navbar from '../navbar';
import Search from '../../scenes/Search';

function News() {
  const [news, setNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchMarketNews = async () => {
    try {
      const response = await axios.get("http://localhost:5001/marketnews");

      if (response.status === 429 || response.data.message) {
        // Handle rate limit error
        setErrorMessage(response.data.message || "Rate limit reached. Please try again later.");
        setNews([]);
      } else {
        setNews(response.data);
        setErrorMessage("");
      }
    } catch (error) {
      console.error('Error fetching market news:', error);
      setErrorMessage("No news available");
      setNews([]);
    }
  };

  useEffect(() => {
    fetchMarketNews();
  }, []);

  return (
    <>
      <Navbar />
      <Search 
        placeholder="Search for a specific company" 
        onSymbolSelect={(symbol) => navigate(`/company/${symbol}`)} 
        style={{ marginBottom: '20px', width: '50%' , margin: '2em auto' }} 
      />
      
      <Paper variant="outlined" sx={{ p: 2, width: '80%', margin: '0 auto' }}>
        <Typography variant="h5" gutterBottom>
          Recent News
        </Typography>
        <Divider sx={{ my: 2 }} />
        
        {errorMessage ? (
          <Typography color="error">{errorMessage}</Typography>
        ) : news.length === 0 ? (
          <Typography>No news available</Typography>
        ) : (
          news.slice(0, 10).map((newsItem, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={newsItem.banner_image || "default-image-url.jpg"} // Provide default image if banner_image is missing
                alt={newsItem.title || "News Image"}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {newsItem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {newsItem.summary}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Published: {new Date(newsItem.time_published).toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Typography>
                <Button
                  size="small"
                  href={newsItem.url}
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
    </>
  );
}

export default News;
