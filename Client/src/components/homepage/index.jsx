import Navbar from "../navbar";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import "../../index.css";
import Search from "../../scenes/Search";

const HomePage = () =>{

    const theme = useTheme();
    const bg = theme.palette.background.main;

    return (
<div className="color-transition">

<Navbar />
    <h1 style={{color:"white", textAlign:"center", fontSize:"4rem"}}>HomePage</h1>

    <Search placeholder="Search"/>
</div>
    )
}

export default HomePage;