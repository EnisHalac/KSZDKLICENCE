// newsRoute.js
const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.get('/novosti', async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ date: -1 }).limit(10); // Fetch latest 10 news articles
    res.render('novosti', { newsArticles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});