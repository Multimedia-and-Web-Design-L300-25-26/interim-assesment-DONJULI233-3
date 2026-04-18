import Crypto from '../models/Crypto.js';

export const getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch cryptocurrencies',
    });
  }
};

export const getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find()
      .sort({ change24h: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: gainers.length,
      data: gainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch gainers',
    });
  }
};

export const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find({ isNew: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: newListings.length,
      data: newListings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch new listings',
    });
  }
};

export const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h, isNew } = req.body;

    // Validation
    if (!name || !symbol || price === undefined || change24h === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, symbol, price, and 24h change',
      });
    }

    // Check if crypto already exists
    const cryptoExists = await Crypto.findOne({
      symbol: symbol.toUpperCase(),
    });

    if (cryptoExists) {
      return res.status(400).json({
        success: false,
        message: 'Cryptocurrency with this symbol already exists',
      });
    }

    // Create crypto
    const crypto = await Crypto.create({
      name,
      symbol: symbol.toUpperCase(),
      price,
      image: image || '',
      change24h,
      isNew: isNew || false,
    });

    res.status(201).json({
      success: true,
      message: 'Cryptocurrency added successfully',
      data: crypto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to add cryptocurrency',
    });
  }
};
