const express = require('express');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.post('/services', serviceController.createService); // Route for adding a new service
router.get('/services', serviceController.getAllServices);
router.get('/services/:category', serviceController.getServicesByCategory);

module.exports = router;