import express from 'express';
import {
  getAllCrypto,
  getGainers,
  getNewListings,
  addCrypto,
} from '../controllers/cryptoController.js';

const router = express.Router();

router.get('/', getAllCrypto);
router.get('/gainers', getGainers);
router.get('/new', getNewListings);
router.post('/', addCrypto);

export default router;
