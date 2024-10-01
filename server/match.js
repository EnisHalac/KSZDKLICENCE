const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  result: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
