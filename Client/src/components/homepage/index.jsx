import Navbar from "../navbar";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () =>{

    const theme = useTheme();
    const bg = theme.palette.background.main;

    return (
<div style={{backgroundColor:bg}}>

<Navbar />
    <h1 >HomePage</h1>
</div>
    )
}

export default HomePage;