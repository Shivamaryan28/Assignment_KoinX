import express from 'express';
import { fetchCryptoData, getCryptoStats , getDeviation , getAllCryptoStats } from '../controllers/cryptoController.js';;

const router = express.Router();

//Route to intially populate the database
router.post("/update-data",fetchCryptoData);

//Route to fetch latest data of the coin
router.get('/stats', getCryptoStats);

//Route to fetch all data of the coin
router.get('/stats-all', getAllCryptoStats);

//Route to calculate standard deviation
router.get("/deviation",getDeviation);


export default router;
