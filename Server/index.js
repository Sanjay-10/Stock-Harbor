import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors"
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import finnhub from 'finnhub';
import investorRoutes from "./routes/investor.js";
import traderRoutes from "./routes/trader.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb" , extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());


// FINNHUB API
const news = process.env.NEWS_API_KEY;
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = news;
export const finnhubClient = new finnhub.DefaultApi()
  
// ALPHA VANTAGE API
export const alpha = process.env.ALPHA_VANTAGE_API_KEY;

// Routes
app.use("/", investorRoutes);
app.use("/", traderRoutes);


// Connect to MongoDB
const PORT = process.env.PORT || 5001;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
.catch((error) => console.log(error.message));
