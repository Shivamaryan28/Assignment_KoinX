import express from 'express';
import { fetchCryptoData, getCryptoStats , getDeviation } from '../controllers/cryptoController.js';

const router = express.Router();

//Route to intially populate the database
router.post("/update-data",fetchCryptoData);

//Route to fetch coin data
router.get('/stats', getCryptoStats);

//Route to calculate standard deviation
router.get("/deviation",getDeviation);


export default router;
