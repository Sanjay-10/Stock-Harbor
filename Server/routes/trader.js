import express from "express";
import {
  fetchSymbolData,
  fetchInsiderTransactions,
  fetchCompanyOverview,
} from "../controllers/trader.js";

const router = express.Router();

router.get("/all/symbol", fetchSymbolData);
router.get("/insider", fetchInsiderTransactions);
router.get("/overview/:searchedSymbol", fetchCompanyOverview);

export default router;