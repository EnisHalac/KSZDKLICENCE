const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matchesPlayed: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  scoredGoals: { type: Number, default: 0 }, // Add this field
  concededGoals: { type: Number, default: 0 }, // Add this field
  goalDifference: { type: Number, default: 0 }, // Add this field
  points: { type: Number, default: 0 },
  category: { 
    type: String, 
    enum: ['pioniri', 'predpioniri', 'kadeti', 'juniori','predpionirke','pionirke','kadetkinje','juniorke'], 
    required: true 
  }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
