import axios from 'axios';
import { CryptoData } from '../models/CryptoDataModel.js';
import {mean} from "mathjs"

export const fetchCryptoData = async (req,res) => {
    const url = process.env.COINGECKO_URL;
    const params = {
      ids: 'bitcoin,matic-network,ethereum',
      vs_currencies: 'usd',
      include_market_cap: 'true',
      include_24hr_change: 'true',
    };
  
    try {
      
      const response = await axios.get(url, { params });
  
      // Extracting data
      const { bitcoin, 'matic-network': matic, ethereum } = response.data;
  
      const cryptoData = [
        new CryptoData({
          name: 'bitcoin',
          price: bitcoin.usd,
          marketCap: bitcoin.usd_market_cap,
          "24hChange": bitcoin.usd_24h_change,
          timestamp: new Date(),
        }),
        new CryptoData({
          name: 'matic',
          price: matic.usd,
          marketCap: matic.usd_market_cap,
          "24hChange": matic.usd_24h_change,
          timestamp: new Date(),
        }),
        new CryptoData({
          name: 'ethereum',
          price: ethereum.usd,
          marketCap: ethereum.usd_market_cap,
          "24hChange": ethereum.usd_24h_change,
          timestamp: new Date(),
        }),
      ];

      //inserting the data in database
      await CryptoData.insertMany(cryptoData);
      res.status(200).json({"message":"Database updated successfully."});
    } catch (error) {
      console.error('Error fetching crypto data:', error.message);
      return error
    }
  }


  export const getCryptoStats = async (req, res) => {
    try {
      let {coin} = req.query;
      coin = coin.toLowerCase()
      const data = await CryptoData.findOne(
          { name: coin },
          { _id:0,price: 1, "24hChange": 1, marketCap: 1 },
        ).sort({timestamp:-1});
        
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const getAllCryptoStats = async (req, res) => {
    try {
      let {coin} = req.query;
      coin = coin.toLowerCase()
      const data = await CryptoData.find(
          { name: coin },
          { _id:0,price: 1, "24hChange": 1, marketCap: 1 , timestamp:1 },
        ).sort({timestamp:-1});
        
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const calculateStandardDeviation = (data) => {
    const meanValue = mean(data);
    
    const squaredDifferences = data.map(value => Math.pow(value - meanValue, 2));
  
    const meanSquaredDifference = mean(squaredDifferences);
  
    return Math.sqrt(meanSquaredDifference);
  };
  
  export const getDeviation = async (req, res) => {
    let { coin } = req.query;
    coin = coin.toLowerCase();
  
    try {
      const records = await CryptoData.find({ name: coin })
        .sort({ timestamp: -1 })
        .limit(100);
  
      if (records.length === 0) {
        return res.status(404).json({ message: 'No data found for this cryptocurrency.' });
      }
      const prices = records.map(record => record.price);
      const standardDeviation = calculateStandardDeviation(prices);
  
      res.json({standardDeviation: standardDeviation.toFixed(2) });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  