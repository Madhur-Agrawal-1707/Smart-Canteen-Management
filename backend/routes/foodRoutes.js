const express = require('express');
const router = express.Router();
const {
  getFoodItems,
  getFoodById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  toggleFoodAvailability,
} = require('../controllers/foodController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getFoodItems)
  .post(protect, adminOnly, createFoodItem);

router.route('/:id')
  .get(getFoodById)
  .put(protect, adminOnly, updateFoodItem)
  .delete(protect, adminOnly, deleteFoodItem);

router.patch('/:id/toggle', protect, adminOnly, toggleFoodAvailability);

module.exports = router;
