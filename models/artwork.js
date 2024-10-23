const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true }, // URL of the artwork image
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  ratings: [{ type: Number }] // Array to store user ratings
});

module.exports = mongoose.model('Artwork', ArtworkSchema);
