// breweryController.js
const axios = require('axios');
const Review = require('../models/Review');

exports.searchBreweries = async (req, res) => {
   
    const { by_city, by_name, by_type } = req.query;
    let query = '';
    if (by_city) query += `by_city=${by_city}&`;
    if (by_name) query += `by_name=${by_name}&`;
    if (by_type) query += `by_type=${by_type}&`;
    try {
        const response = await axios.get(`https://api.openbrewerydb.org/breweries?${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching breweries', error });
    }
};

exports.getallBreweries = async (req, res) => {
    try {
      const breweries = await Brewery.find();
      res.json(breweries);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
exports.getBreweryDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://api.openbrewerydb.org/breweries/${id}`);
        const reviews = await Review.find({ breweryId: id }).populate('userId', 'username');
        res.json({ ...response.data, reviews });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brewery details', error });
    }
};

exports.addReview = async (req, res) => {
    const { id } = req.params;
    const { userId , rating, description } = req.body;
 
    const {username} = req.user
   
    try {
        const newReview = new Review({ userId, breweryId: id, rating, description, username });
        
        await newReview.save();

        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
};