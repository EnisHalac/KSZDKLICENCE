const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matchesPlayed: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  category: { type: String, enum: ['pioniri', 'predpioniri', 'kadeti', 'juniori','predpionirke','pionirke','kadetkinje','juniorke'], required: true } // Dodaćeš ovo
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
