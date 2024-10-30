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
        res.status(200).json({
            "data": [
              {
                "transaction_date": "2024-09-30",
                "ticker": "IBM",
                "executive": "MIEBACH, MICHAEL",
                "executive_title": "Director",
                "security_type": "Promised Fee Share",
                "acquisition_or_disposal": "A",
                "shares": "396.0",
                "share_price": "221.08"
              },
              {
                "transaction_date": "2024-09-30",
                "ticker": "IBM",
                "executive": "FARR, DAVID N",
                "executive_title": "Director",
                "security_type": "Promised Fee Share",
                "acquisition_or_disposal": "A",
                "shares": "250.0",
                "share_price": "221.08"
              },
              {
                "transaction_date": "2024-09-30",
                "ticker": "IBM",
                "executive": "GORSKY, ALEX",
                "executive_title": "Director",
                "security_type": "Promised Fee Share",
                "acquisition_or_disposal": "A",
                "shares": "453.0",
                "share_price": "221.08"
              },
              {
                "transaction_date": "2024-09-30",
                "ticker": "IBM",
                "executive": "HOWARD, MICHELLE J",
                "executive_title": "Director",
                "security_type": "Promised Fee Share",
                "acquisition_or_disposal": "A",
                "shares": "357.0",
                "share_price": "221.08"
              },]});
    } catch (error) {
        console.log( res.status(404).json({message: error.message}));
        
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
        res.status(404).json({message: error.message});
    }
}