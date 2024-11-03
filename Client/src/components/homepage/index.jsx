import Navbar from "../navbar";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import "../../index.css";
import Search from "../../scenes/Search";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const theme = useTheme();
    const bg = theme.palette.background.main;
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const Company = [
        {name: "Apple" , path: "/company/AAPL"},
        {name: "Amazon" , path: "/company/AMZN"},
        {name: "Microsoft" , path: "/company/MSFT"},
        {name: "Nvidia", path: "/company/NVDA"},
        {name: "Tesla", path: "/company/TSLA"},
        {name: "Google", path: "/company/GOOGL"},
    ]

    return (
        <div className="main" style={{ background: bg }}>
            <Navbar />
            <Box
                sx={{
                    padding: { xs: "20px", sm: "50px" }, // Smaller padding on mobile
                    margin: { xs: "15px", sm: "30px" }, // Adjust margin for mobile
                }}
            >
                <Box
                    sx={{
                        maxWidth: "650px",
                        margin: "40px auto",
                        textAlign: "center",
                        px: { xs: 2, sm: 0 }, // Horizontal padding for smaller screens
                    }}
                >
                    <div className="typewriter">
                        <h1 style={{ fontSize: { xs: "2.5rem", sm: "4rem" } }}>Stock-Harbor</h1> 
                    </div>
                    <h2
                        style={{
                            marginTop: "0",
                            fontWeight: "inherit",
                            fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Font size for mobile
                        }}
                    >
                        Unlocking essential insights for smarter investment strategies and decisions.
                    </h2>

                    <Search
                        onSymbolSelect={(symbol) => navigate(`/company/${symbol}`)}
                        placeholder="Search for a company"
                        style={{
                            width: "100%",
                            margin: "50px auto",
                            backgroundColor: "white",
                            padding: { xs: "10px", sm: "16px" }, // Adjust padding for mobile
                        }}
                    />

<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 , justifyContent:"center"}}>
            {Company.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexBasis: isMobile ? '30%' : '45%',
                        order: index % 2 === 0 ? 1 : 2, // Zig-zag effect
                    }}
                >
                    <Button
                        variant="contained"

                        onClick={() => navigate(item.path)}
                        sx={{
                            
                            width: '100%',
                            padding: '5px 10px',
                            fontSize: '12px',
                            borderRadius: '50px',
                            backgroundColor: "green",
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        {item.name}
                    </Button>
                </Box>
            ))}
        </Box>
                    

                </Box>
            </Box>
        </div>
    );
};

export default HomePage;
