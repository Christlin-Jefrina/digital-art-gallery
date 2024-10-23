const express = require('express');
const router = express.Router();
const Artwork = require('../models/artwork');


// Get all artworks
router.get('/artworks', async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Like an artwork
router.post('/artworks/:id/like', async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.params.id);
        artwork.likes += 1;
        await artwork.save();
        res.status(200).json({ message: 'Artwork liked!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Rate an artwork
router.post('/artworks/:id/rate', async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.params.id);
        artwork.ratings.push(req.body.rating);
        await artwork.save();
        res.status(200).json({ message: 'Rating added!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Add a new artwork
router.post('/artworks', async (req, res) => {
  const newArtwork = new Artwork({
    title: req.body.title,
    artist: req.body.artist,
    description: req.body.description,
    imageURL: req.body.imageURL,
  });
  await newArtwork.save();
  res.json(newArtwork);
});

// Delete artwork by ID
router.delete('/artworks/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndDelete(req.params.id);
    if (!artwork) {
      return res.status(404).send('Artwork not found');
    }
    res.json({ message: 'Artwork deleted successfully', artwork });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


module.exports = router;
