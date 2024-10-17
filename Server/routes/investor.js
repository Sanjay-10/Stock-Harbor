import express from "express";
import {
  fetchSymbolData,
  fetchMarketNews,
  fetchStockNews,
  fetchMarketStatus,
  fetchTopGainers,
  fetchDividends,
  fetchEarnings,
} from "../controllers/investor.js";


const router = express.Router();

router.get("/", fetchSymbolData);
router.get("/marketnews", fetchMarketNews);
router.get("/stocknews", fetchStockNews);
router.get("/marketstatus", fetchMarketStatus);
router.get("/topgainers", fetchTopGainers);
router.get("/dividends", fetchDividends);
router.get("/earnings", fetchEarnings);

export default router;