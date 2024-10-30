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
        const latestNews = news.slice(0, 10);
        res.status(200).json(latestNews);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}   

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
        res.status(404).json({message: error.message});
    }
}


// TOP GAINERS AND LOSERS
export const fetchTopGainers = async (req, res) => {
    // const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${alpha}`;
    try {
        console.log("fetchTopGainers");
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });
        res.status(200).json(
            {
              "metadata": "Top gainers, losers, and most actively traded US tickers",
              "last_updated": "2024-10-29 16:15:57 US/Eastern",
              "top_gainers": [
                {
                  "ticker": "GLYC",
                  "price": "0.49",
                  "change_amount": "0.3218",
                  "change_percentage": "191.3199%",
                  "volume": "1111107314"
                },
                {
                  "ticker": "RMCOW",
                  "price": "0.0349",
                  "change_amount": "0.0208",
                  "change_percentage": "147.5177%",
                  "volume": "44369"
                },
                {
                  "ticker": "BSLKW",
                  "price": "0.036",
                  "change_amount": "0.0179",
                  "change_percentage": "98.895%",
                  "volume": "385"
                },
                
              ],
              "top_losers": [
                {
                  "ticker": "PLRZ",
                  "price": "1.55",
                  "change_amount": "-2.83",
                  "change_percentage": "-64.6119%",
                  "volume": "1429899"
                },
                {
                  "ticker": "EFSH",
                  "price": "0.4607",
                  "change_amount": "-0.7993",
                  "change_percentage": "-63.4365%",
                  "volume": "19032448"
                },
                {
                  "ticker": "PRLHW",
                  "price": "0.017",
                  "change_amount": "-0.023",
                  "change_percentage": "-57.5%",
                  "volume": "350"
                },
                
              ],
              "most_actively_traded": [
                {
                  "ticker": "GLYC",
                  "price": "0.49",
                  "change_amount": "0.3218",
                  "change_percentage": "191.3199%",
                  "volume": "1111107314"
                },
                {
                  "ticker": "VCIG",
                  "price": "0.0944",
                  "change_amount": "0.0178",
                  "change_percentage": "23.2376%",
                  "volume": "314954163"
                },
                {
                  "ticker": "DJT",
                  "price": "51.51",
                  "change_amount": "4.15",
                  "change_percentage": "8.7627%",
                  "volume": "164942718"
                },
                
              ]
            });
    } catch (error) {
        console.log("fetchTopGainers error: ");
        res.status(404).json({message: error.message});
    }
}

// DIVIDENDS

export const fetchDividends = async (req, res) => {
    const {searchedSymbol} = req.params;
    // const url = `https://www.alphavantage.co/query?function=DIVIDENDS&symbol=${searchedSymbol}&apikey=${alpha}`;
    try {
        const response = await axios.get(url,
            {
                headers: {'User-Agent': 'request'}
            }
        );
        console.log("searchedSymbol: ", searchedSymbol);
        res.status(200).json(
            {
                "symbol": "IBM",
                "data": [
                  {
                    "ex_dividend_date": "2024-08-09",
                    "declaration_date": "2024-07-29",
                    "record_date": "2024-08-09",
                    "payment_date": "2024-09-10",
                    "amount": "1.67"
                  },
                  {
                    "ex_dividend_date": "2024-05-09",
                    "declaration_date": "2024-04-30",
                    "record_date": "2024-05-10",
                    "payment_date": "2024-06-10",
                    "amount": "1.67"
                  },
                  {
                    "ex_dividend_date": "2024-02-08",
                    "declaration_date": "2024-01-30",
                    "record_date": "2024-02-09",
                    "payment_date": "2024-03-09",
                    "amount": "1.66"
                  },
                  {
                    "ex_dividend_date": "2023-11-09",
                    "declaration_date": "2023-10-30",
                    "record_date": "2023-11-10",
                    "payment_date": "2023-12-09",
                    "amount": "1.66"
                  },]}
        );
    } catch (error) {
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
        res.status(404).json({message: error.message});
    }
}