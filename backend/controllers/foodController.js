const FoodItem = require('../models/FoodItem');

// @desc    Get all food items with search and category filters
// @route   GET /api/foods
// @access  Public
exports.getFoodItems = async (req, res) => {
  try {
    const { search, category, available } = req.query;
    let query = {};

    if (search && search.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (available !== undefined && available !== '') {
      query.available = available === 'true';
    }

    const foods = await FoodItem.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    console.error('Fetch foods error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch food items.',
    });
  }
};

// @desc    Get single food item
// @route   GET /api/foods/:id
// @access  Public
exports.getFoodById = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found',
      });
    }
    res.json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch food item.',
    });
  }
};

// @desc    Create a new food item
// @route   POST /api/foods
// @access  Private (Admin only)
exports.createFoodItem = async (req, res) => {
  try {
    const { name, description, price, category, image, available, preparationTime, isSpecial, isPopular } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, description, price, and category.',
      });
    }

    const newFood = await FoodItem.create({
      name,
      description,
      price: Number(price),
      category,
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
      available: available !== undefined ? Boolean(available) : true,
      preparationTime: preparationTime || '10-15 mins',
      isSpecial: Boolean(isSpecial),
      isPopular: Boolean(isPopular),
      rating: 4.6,
    });

    res.status(201).json({
      success: true,
      message: 'Food item created successfully!',
      food: newFood,
    });
  } catch (error) {
    console.error('Create food error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create food item.',
    });
  }
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Private (Admin only)
exports.updateFoodItem = async (req, res) => {
  try {
    let food = await FoodItem.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found.',
      });
    }

    const updatedFood = await FoodItem.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Food item updated successfully!',
      food: updatedFood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update food item.',
    });
  }
};

// @desc    Toggle food item availability
// @route   PATCH /api/foods/:id/toggle
// @access  Private (Admin only)
exports.toggleFoodAvailability = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found.',
      });
    }

    food.available = !food.available;
    await food.save();

    res.json({
      success: true,
      message: `Food item is now ${food.available ? 'Available' : 'Out of Stock'}.`,
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to toggle availability.',
    });
  }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private (Admin only)
exports.deleteFoodItem = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food item not found.',
      });
    }

    await FoodItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Food item deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete food item.',
    });
  }
};
