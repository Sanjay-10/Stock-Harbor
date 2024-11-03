import { alpha } from '../index.js';
import {finnhubClient} from '../index.js';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stockDaraPath = path.join(__dirname, "../Data/stockSymbols.json");
const stockData = JSON.parse(fs.readFileSync(stockDaraPath, 'utf-8'));

// SEARCH STOCK NAME SYMBOL
export const fetchSymbolData = async (req, res) => {
    try {
        const searchingSymbol = req.query.searchingSymbol?.toLowerCase();

        if (!searchingSymbol) {
            return res.status(400).json({ message: "searchingSymbol is required." });
        }

        // Filter the stock data by Symbol or Security
        const filteredStocks = stockData.filter(stock =>
            stock.Symbol.toLowerCase().includes(searchingSymbol) ||
            stock.Security.toLowerCase().includes(searchingSymbol)
        );

        const limitedResults = filteredStocks.slice(0,5);

        res.status(200).json(limitedResults);
        // console.log(limitedResults);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


// Market News and Sentiment - GENERAL 
export const fetchMarketNews = async (req, res) => {
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${alpha}`;
    try {
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });
        const news = response.data;

        // Check if API has reached rate limit
        if (news.Information) {
            console.log("API rate limit reached:", news.Information);
            return res.status(429).json({ message: news.Information });
        }

        // Proceed if no rate limit error
        console.log("API response data:", news);
        res.status(200).json(news);
    } catch (error) {
        console.log("fetchMarketNews error: ", error.message);
        res.status(404).json({ message: error.message });
    }
};


// Stock Price

export const fetchStockPrice = async (req, res) => {
    const {searchedSymbol} = req.params;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="${searchedSymbol}"&apikey=${alpha}`;
    try {
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });

        const price = response.data;
        console.log(price);
        res.status(200).json(price);
    } catch (error) {
        console.log("fetchStockPrice error: "); 
        res.status(404).json({message: error.message});
    }
}

// Specific Stock News and Sentiment
export const fetchStockNews = async (req, res) => {
    const {searchedSymbol} = req.params;
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${searchedSymbol}&apikey=${alpha}`;
    try {
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });

        const news = response.data;
        const latestNews = news.slice(0, 10);
        res.status(200).json(latestNews);
    } catch (error) {
        console.log("fetchStockNews error: ");
        res.status(404).json({message: error.message});
    }
}    

// MARKET OPEN/CLOSE STATUS
export const fetchMarketStatus = async (req, res) => {
    const url = `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${alpha}`;
    try {
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("fetchMarketStatus error: ");   
        res.status(404).json({message: error.message});
    }
}


// TOP GAINERS AND LOSERS
export const fetchTopGainers = async (req, res) => {
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${alpha}`;
    try {
        console.log("fetchTopGainers");
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("fetchTopGainers error: ");
        res.status(404).json({message: error.message});
    }
}

// DIVIDENDS

export const fetchDividends = async (req, res) => {
    const {searchedSymbol} = req.params;
    const url = `https://www.alphavantage.co/query?function=DIVIDENDS&symbol=${searchedSymbol}&apikey=${alpha}`;
    try {
        const response = await axios.get(url,
            {
                headers: {'User-Agent': 'request'}
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.log("fetchDividends error: ");
        res.status(404).json({message: error.message});
    }
}

// EARNINGS
export const fetchEarnings = async (req, res) => {  
    const {searchedSymbol} = req.params;
    const url = `https://www.alphavantage.co/query?function=EARNINGS&symbol=${searchedSymbol}&apikey=${alpha}`;
    try {
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("fetchEarnings error: ");
        res.status(404).json({message: error.message});
    }
}