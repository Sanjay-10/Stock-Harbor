import { alpha } from '../index.js';
import {finnhubClient} from '../index.js'; 
import axios from 'axios';

 
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
        console.log("fetchSymbolData error: ");
        res.status(404).json({message: err.message});   
    } 
}

// Insider Transactions 
export const fetchInsiderTransactions = async (req, res) => {
    try {
        console.log("Fetchinsidertrans called");
        
        const {searchedSymbol} = req.body;
        const url = `https://www.alphavantage.co/query?function=INSIDER_TRANSACTIONS&symbol=${searchedSymbol}&apikey=${alpha}`;
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log( "fetchInsiderTransactions error: ");
        
        res.status(404).json({message: error.message});
    }
}
 
// Company Overview - Fundamental Data
export const fetchCompanyOverview = async (req, res) => {
    try {
        const {searchedSymbol} = req.params;
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchedSymbol}&apikey=${alpha}`;
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("fetchCompanyOverview error: ");    
        res.status(404).json({message: error.message});
    }
}