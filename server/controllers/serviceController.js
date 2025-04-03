const Service = require('../models/Service');

exports.createService = async (req, res) => {
  try {
    const { servicename, description, category, username } = req.body;

    // Validate required fields
    if (!servicename || !description || !category || !username) {
      return res.status(400).json({ error: "All fields are required, including username" });
    }

    const newService = new Service({
      servicename,
      description,
      category,
      username, // Include the username field
    });

    await newService.save(); // Save the new service to the database
    res.status(201).json(newService); // Return the added service
  } catch (error) {
    console.error("Error in createService:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ category });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};