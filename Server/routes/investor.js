import express from "express";
import {
  fetchSymbolData,
  fetchMarketNews,
  fetchStockNews,
  fetchMarketStatus,
  fetchTopGainers,
  fetchDividends,
  fetchEarnings,
  fetchStockPrice,
} from "../controllers/investor.js";


const router = express.Router();

router.get("/", fetchSymbolData);
router.get("/:searchedSymbol", fetchStockPrice);
router.get("/marketnews", fetchMarketNews);
router.get("/stocknews/:searchedSymbol", fetchStockNews);
router.get("/marketstatus", fetchMarketStatus);
router.get("/topgainers", fetchTopGainers);
router.get("/dividends/:searchedSymbol", fetchDividends);
router.get("/earnings", fetchEarnings);

export default router; 