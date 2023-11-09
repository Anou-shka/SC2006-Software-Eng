const mongoose = require("mongoose");
const asyncHandler = require('express-async-handler')
const CustomError = require('../utils/customError')
const Review = require('../models/reviewModel')

const Restaurant = mongoose.model('Restaurant', mongoose.Schema({}, { strict: false }));

// @desc Get all restaurants in database
// @route GET /restaurants
// @access Public
const getAllRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find().lean()
    if (!restaurants?.length) {
        res.status(400).json({ error: 'No Restaurants found'})
        throw new CustomError(400, 'No Restaurants found')
    }
    res.json(restaurants)
})

// @desc Get all restaurants registered by a specific user
// @route GET /restaurants/registered/:username
// @access Private
const getRegisteredRestaurants = asyncHandler(async (req, res) => {
    const username = req.params.username; // Username from the request parameters

    // Query the restaurants that were created by the specified user
    const restaurants = await Restaurant.find({ createdBy: username }).lean();

    // Check if there are no registered restaurants
    if (!restaurants?.length) {
        return res.status(200).json({ message: 'No restaurants found for this user' });
    }

    res.json(restaurants);
});

// @desc Get all restaurants in database
// @route GET /restaurants/:id
// @access Public
const getRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findOne({ _id: { $eq: req.params.restaurantId } }).lean()
    if (!restaurant) {
        throw new CustomError(400, 'No Restaurant found')
    }
    res.json(restaurant) 
})

// @desc Get all reviews for the restaurant
// @route GET /restaurants/:id/reviews
// @access Private
const getRestaurantReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ restaurantId: {$eq: req.params.id} }).lean()
    if (!reviews?.length) {
        res.status(400).json({ error: 'No reviews found'})
        throw new CustomError(400, 'No reviews found')
    }
    res.json(reviews)
})

// @desc Create a new restaurant
// @route POST /restaurants
// @access Private
const createNewRestaurant = async (req, res) => {
    try {
        const {
            name = req.body.inputRefValue,
            cuisine = req.body.cuisine,
            dietaryOptions = req.body.dietaryOptions,
            priceRange = req.body.priceRange,
            location = req.body.restaurantAddress, // Location should be an object with `type` and `coordinates`
            placeId = req.body.placeId,
            createdBy = req.body.username
        } = req.body;
        console.log(req.body.inputRefValue)
           
        const defaultTables = [
            ...Array(3).fill({ tableType: "Table for 2" }),
            ...Array(3).fill({ tableType: "Table for 4" }),
            ...Array(3).fill({ tableType: "Table for 4" }),
            ...Array(3).fill({ tableType: "Table for 4" }),
            ...Array(3).fill({ tableType: "Table for 2" }),
        ];
  
      // Validate the data (e.g., ensure required fields are present)
  
      // Capture the user's ID from the authenticated user (you need to implement user authentication first)
  
      // Create a new restaurant instance using the Restaurant model and associate it with the user
      const newRestaurant = new Restaurant({
        name,
        cuisine,
        dietaryOptions,
        priceRange,
        location,
        placeId,
        createdBy, // Add the user's ID or reference to the restaurant
        tables: defaultTables,
      });
  
      // Save the new restaurant to the database
      const savedRestaurant = await newRestaurant.save();
  
      // Send a success response
      res.status(201).json({ message: "Restaurant registered successfully", restaurant: savedRestaurant });
    } catch (error) {
      // Handle errors and send an error response
      console.error("Error registering the restaurant:", error);
      res.status(500).json({ error: "An error occurred while registering the restaurant. Please try again." });
    }
  };
  
  const reserveTable = async (req, res) => {
    const { restaurantId, tableNumber } = req.params;
  
    try {
      const restaurant = await Restaurant.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
  
      const table = restaurant.tables.find((t) => t.tableNumber === parseInt(tableNumber));
  
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }
  
      if (!table.isAvailable) {
        return res.status(400).json({ message: "Table is already reserved" });
      }
  
      // Perform the reservation logic here, e.g., update the availability status
  
      await restaurant.save();
      res.json({ message: "Table reserved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

const unreserveTable = async (req, res) => {
    const { restaurantId, tableNumber } = req.params;
  
    try {
      const restaurant = await Restaurant.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
  
      const table = restaurant.tables.find((t) => t.tableNumber === parseInt(tableNumber));
  
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }
  
      if (table.isAvailable) {
        return res.status(400).json({ message: "Table is already available" });
      }
  
      // Perform the unreservation logic here, e.g., update the availability status
      table.isAvailable = true;
  
      await restaurant.save();
      res.json({ message: "Table unreserved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
const getTables = async (req, res) => {
    const { restaurantId } = req.params;
    console.log(req.params.restaurantId)
    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
        }

        const tables = restaurant.tables;
        res.json(tables);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    };
  
  module.exports = {
    getAllRestaurants,
    getRestaurant,
    getRestaurantReviews,
    createNewRestaurant,
    getRegisteredRestaurants, // Add this line to export the new function
    reserveTable,
    unreserveTable,
    getTables
  };
  