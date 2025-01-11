import express from 'express';
import { fetchCryptoData } from '../controllers/cryptoController.js';

const router = express.Router();

//Route to intially populate the database
router.post("/update-data",fetchCryptoData);


export default router;
