import { alpha } from '../index.js';
import {finnhubClient} from '../index.js'; 


// SEARCH STOCK NAME SYMBOL
export const fetchSymbolData = async (req, res) => {
    try{
        const {searchingSymbol} = req.body;
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchingSymbol}&apikey=${alpha}`;
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'axios' }, 
        });
        res.status(200).json(response.data);
    } catch (err){
        res.status(404).json({message: err.message});   
    } 
}

// Insider Transactions 
export const fetchInsiderTransactions = async (req, res) => {
    try {
        const {searchedSymbol} = req.body;
        const url = `https://www.alphavantage.co/query?function=INSIDER_TRANSACTIONS&symbol=${searchedSymbol}&apikey=${alpha}`;
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// Company Overview - Fundamental Data
export const fetchCompanyOverview = async (req, res) => {
    try {
        const {searchedSymbol} = req.body;
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchedSymbol}&apikey=${alpha}`;
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}