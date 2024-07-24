// breweryRoutes.js
const express = require('express');
const router = express.Router();
const breweryController = require('../controllers/breweryController');

const reqAuth = require('../middleware/reqAuth')

router.use(reqAuth)

// router.get('/', breweryController.getallBreweries);
router.get('/search', breweryController.searchBreweries);
router.get('/:id', breweryController.getBreweryDetails);
router.post('/:id/reviews', breweryController.addReview);

module.exports = router;
