import Navbar from "../navbar";
import { Box, colors, useTheme } from "@mui/material";
import "../../index.css";
import Search from "../../scenes/Search";
import { useSelector } from "react-redux";

const HomePage = () => {
    const theme = useTheme();
    const bg = theme.palette.background.main;

    const searchedSymbol = useSelector((state) => state.symbol);

    return (
        <div className="main" style={{ background: bg }}>
            <Navbar />
            <h1>{searchedSymbol? searchedSymbol : "NO"}</h1>
            <div style={{ padding: "50px", margin: "30px" }}>
                <Box
                    sx={{ maxWidth: "650px", margin: "40px auto", textAlign: "center" }}
                >
                    <div className="typewriter">
                        <h1 style={{fontSize:"4rem"}}>Stock-Harbor</h1>
                    </div>
                    <h2 style={{ marginTop: "0", fontWeight:"inherit" }}>
                        Unlocking essential insights for smarter investment strategies and decisions.
                    </h2>

                    <Search
                        placeholder="Search for a company"
                        style={{ width: "100%", margin: "50px auto", backgroundColor: "white" }}
                    />
                </Box>
            </div>
        </div>
    );
};

export default HomePage;
