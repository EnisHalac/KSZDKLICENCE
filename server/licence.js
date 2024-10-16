const mongoose = require('mongoose');

// Define the schema
const licenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  birthPlace: { type: String, required: true },
  imageUrl: { type: String, required: true },
  club: { type: String, required: true },
  category: { type: String }  // Category will be set based on birth year
});

// Middleware to automatically set the category based only on the birth year
licenceSchema.pre('save', function(next) {
  const birthYear = this.birthDate.getUTCFullYear();  // Get the year part only

  // Determine category based on birth year
  if (birthYear >= 2012) {
    this.category = 'Predpioniri';
  } else if (birthYear === 2010 || birthYear === 2011) {
    this.category = 'Pioniri';
  } else if (birthYear === 2008 || birthYear === 2009) {
    this.category = 'Kadeti';
  } else if (birthYear === 2006 || birthYear === 2007) {
    this.category = 'Juniori';
  } else {
    this.category = 'Unknown';  // Default if the birth year doesn't match any category
  }

  next();
});

// Create the model
const Player = mongoose.model('Licence', licenceSchema);

module.exports = Player;
