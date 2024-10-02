const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserController = require('./userController');
const News = require('./news');
const FanShopItem = require('./fanshop');
const Purchase = require('./purchase');
const crypto = require('crypto');
const path = require('path');
const Team = require('./team');
const Match = require('./match');

// Generate session secret for security
const sessionSecret = crypto.randomBytes(64).toString('hex');

// Express app initialization
const app = express();
const PORT = process.env.PORT || 3000;
const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.cartItemCount = req.session.cart ? req.session.cart.length : 0;
  next();
});

// MongoDB connection
const url = 'mongodb+srv://ahmed:ahmed123@nkcelik.qj8oewc.mongodb.net/?retryWrites=true&w=majority&appName=NKCelik';
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

// Static files and view engine setup
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// User authentication routes
app.post('/register', UserController.register);
app.post('/login', UserController.login);
app.get('/logout', UserController.logout);

// Home route with fetching matches for both men's and women's categories
app.get('/home', async (req, res) => {
  try {
    const { user } = req.session;
    const newsArticles = await News.find().sort({ date: -1 }).limit(3);
    const newsArticlesSmall = await News.find().sort({ date: -1 }).skip(3).limit(4);
    const firstFourFanShopItems = await FanShopItem.find().limit(4);

    // Fetch men's categories matches
    const pioniriMatches = await Team.find({ category: 'pioniri' });
    const predpioniriMatches = await Team.find({ category: 'predpioniri' });
    const kadetiMatches = await Team.find({ category: 'kadeti' });
    const junioriMatches = await Team.find({ category: 'juniori' });

    // Fetch women's categories matches
    const pionirkeMatches = await Team.find({ category: 'pionirke' });
    const predpionirkeMatches = await Team.find({ category: 'predpionirke' });
    const kadetkinjeMatches = await Team.find({ category: 'kadetkinje' });
    const juniorkeMatches = await Team.find({ category: 'juniorke' });

    res.render('home', {
      newsArticles,
      user,
      newsArticlesSmall,
      firstFourFanShopItems,
      pioniriMatches,
      predpioniriMatches,
      kadetiMatches,
      junioriMatches,
      pionirkeMatches,
      predpionirkeMatches,
      kadetkinjeMatches,
      juniorkeMatches
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Tim and staff routes
app.get('/tim', (req, res) => res.render('tim', { user: req.session.user }));
app.get('/staff', (req, res) => res.render('staff', { user: req.session.user }));

// News routes
app.get('/novosti', async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ date: -1 }).limit(10);
    res.render('novosti', { newsArticles, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/novosti/:title/:id', async (req, res) => {
  try {
    const newsArticle = await News.findById(req.params.id);
    const user = req.session.user;
    if (!newsArticle) return res.status(404).send('News article not found');
    if (req.params.title !== newsArticle.title.toLowerCase().replace(/ /g, '-')) {
      return res.redirect(`/novosti/${newsArticle.title.toLowerCase().replace(/ /g, '-')}/${newsArticle._id}`);
    }
    res.render('novostiDetalji', { newsArticle, user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
app.get('/login', (req, res) => {
  const { user, error } = req.session;
  res.render('login', { user, error });
});

// Fanshop route
app.get('/fanshop', async (req, res) => {
  const { user, error } = req.session;
  const firstFourFanShopItems = await FanShopItem.find().sort({ _id: 1 }).limit(4);
  res.render('fanshop', { user, error, firstFourFanShopItems });
});

// Admin route and access control
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.type === 'admin') next();
  else res.redirect('/home');
};

app.get('/admin', isAdmin, async (req, res) => {
  try {
    const { user, error, successMessage } = req.session;
    const teams = await Team.find();
    const newsItems = await News.find().sort({ date: -1 });
    const fanShopItems = await FanShopItem.find();
    const matches = await Match.find().populate('homeTeam awayTeam');
    res.render('admin', { user, error, successMessage, newsItems, fanShopItems, teams, matches });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/admin/utakmica/add', async (req, res) => {
  try {
    const { domacin, gost, rezultat, kategorija } = req.body;

    // Find home and away teams by name and category
    const homeTeam = await Team.findOne({ name: domacin, category: kategorija });
    const awayTeam = await Team.findOne({ name: gost, category: kategorija });

    if (!homeTeam || !awayTeam) {
      return res.status(400).send('One or both teams not found in the specified category.');
    }

    const [homeGoals, awayGoals] = rezultat.split(':').map(Number);

    if (homeGoals === awayGoals) return res.status(400).send('Draw results are not allowed.');

    const match = new Match({
      homeTeam: homeTeam._id,
      awayTeam: awayTeam._id,
      result: rezultat,
      category: kategorija,
    });

    await match.save();

    // Update the teams' statistics
    homeTeam.matchesPlayed += 1;
    awayTeam.matchesPlayed += 1;

    homeTeam.scoredGoals += homeGoals; // Update scored goals
    awayTeam.scoredGoals += awayGoals; // Update scored goals
    homeTeam.concededGoals += awayGoals; // Update conceded goals
    awayTeam.concededGoals += homeGoals; // Update conceded goals

    if (homeGoals > awayGoals) {
      homeTeam.wins += 1;
      homeTeam.points += 3;
      awayTeam.losses += 1;
    } else {
      awayTeam.wins += 1;
      awayTeam.points += 3;
      homeTeam.losses += 1;
    }

    // Calculate goal difference
    homeTeam.goalDifference = homeTeam.scoredGoals - homeTeam.concededGoals;
    awayTeam.goalDifference = awayTeam.scoredGoals - awayTeam.concededGoals;

    await homeTeam.save();
    await awayTeam.save();

    res.redirect('/admin');
  } catch (error) {
    console.error('Error adding match:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Admin: Delete news and matches
app.post('/delete-news/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/admin'))
    .catch(err => res.status(400).send(err));
});

app.post('/delete-match/:id', async (req, res) => {
  try {
    // Find the match to delete, including team references
    const match = await Match.findById(req.params.id).populate('homeTeam awayTeam');

    if (!match) {
      return res.status(404).send('Match not found');
    }

    const homeTeam = match.homeTeam;
    const awayTeam = match.awayTeam;

    // Store the match result for adjusting points
    const [homeGoals, awayGoals] = match.result.split(':').map(Number);

    // Update team statistics
    homeTeam.matchesPlayed -= 1;
    awayTeam.matchesPlayed -= 1;

    // Adjust wins, losses, and points
    if (homeGoals > awayGoals) {
      homeTeam.wins -= 1;
      awayTeam.losses -= 1;
      homeTeam.points -= 3; // Deduct 3 points for the home team
    } else if (homeGoals < awayGoals) {
      awayTeam.wins -= 1;
      homeTeam.losses -= 1;
      awayTeam.points -= 3; // Deduct 3 points for the away team
    } else {
      // If it was a draw, both teams lose a point
      homeTeam.draws -= 1;
      awayTeam.draws -= 1;
      homeTeam.points -= 1; // Deduct 1 point for home team
      awayTeam.points -= 1; // Deduct 1 point for away team
    }

     // Adjust scored and conceded goals
     homeTeam.scoredGoals -= homeGoals;
     homeTeam.concededGoals -= awayGoals;
     awayTeam.scoredGoals -= awayGoals;
     awayTeam.concededGoals -= homeGoals;
 
     // Recalculate goal difference
     homeTeam.goalDifference = homeTeam.scoredGoals - homeTeam.concededGoals;
     awayTeam.goalDifference = awayTeam.scoredGoals - awayTeam.concededGoals;

    // Save the updated team statistics
    await homeTeam.save();
    await awayTeam.save();

    // Now delete the match
    await Match.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting match:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Standings route
app.get('/kategorija/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const allTeams = await Team.find();
    const teamStats = {};

    allTeams.forEach(team => {
      teamStats[team.name] = {
        matchesPlayed: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        points: 0,
      };
    });

    const matches = await Match.find({ category }).populate('homeTeam awayTeam');

    matches.forEach(match => {
      const homeTeamName = match.homeTeam.name;
      const awayTeamName = match.awayTeam.name;
      const [homeGoals, awayGoals] = match.result.split(':').map(Number);

      teamStats[homeTeamName].matchesPlayed += 1;
      teamStats[awayTeamName].matchesPlayed += 1;

      if (homeGoals > awayGoals) {
        teamStats[homeTeamName].wins += 1;
        teamStats[homeTeamName].points += 3;
        teamStats[awayTeamName].losses += 1;
      } else if (homeGoals < awayGoals) {
        teamStats[awayTeamName].wins += 1;
        teamStats[awayTeamName].points += 3;
        teamStats[homeTeamName].losses += 1;
      }
    });

    res.render('kategorija', { teamStats, user: req.session.user, category });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at ${serverUrl}`);
});
