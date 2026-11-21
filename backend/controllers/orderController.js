const Order = require('../models/Order');
const FoodItem = require('../models/FoodItem');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private (Student)
exports.createOrder = async (req, res) => {
  try {
    const { items, paymentMethod, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot place an order with an empty cart.',
      });
    }

    // Verify items and calculate actual total
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const food = await FoodItem.findById(item.foodItemId || item.foodItem);
      if (!food) {
        return res.status(400).json({
          success: false,
          message: `Food item not found for ID: ${item.foodItemId}`,
        });
      }

      if (!food.available) {
        return res.status(400).json({
          success: false,
          message: `"${food.name}" is currently out of stock.`,
        });
      }

      const qty = Number(item.quantity) || 1;
      const itemSubtotal = food.price * qty;
      totalAmount += itemSubtotal;

      validatedItems.push({
        foodItem: food._id,
        name: food.name,
        price: food.price,
        quantity: qty,
        image: food.image,
      });
    }

    // Generate a human-friendly sequential or random 4-digit token
    const tokenNumber = Math.floor(100 + Math.random() * 900);

    const newOrder = await Order.create({
      studentId: req.user._id,
      studentName: req.user.name,
      studentEmail: req.user.email,
      items: validatedItems,
      totalAmount,
      status: 'Pending',
      paymentMethod: paymentMethod || 'Pay at Canteen Counter',
      paymentStatus: paymentMethod === 'UPI / Online Simulated' ? 'Paid' : 'Pending',
      tokenNumber,
      notes: notes || '',
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Token generated.',
      order: newOrder,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to place order.',
    });
  }
};

// @desc    Get current student's orders
// @route   GET /api/orders/my-orders
// @access  Private (Student)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ studentId: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve your order history.',
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders.',
    });
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Choose from: ${validStatuses.join(', ')}`,
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    order.status = status;
    if (status === 'Completed' && order.paymentMethod === 'Pay at Canteen Counter') {
      order.paymentStatus = 'Paid';
    }

    await order.save();

    res.json({
      success: true,
      message: `Order #${order.tokenNumber} marked as ${status}!`,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update order status.',
    });
  }
};

// @desc    Get calculated dashboard stats (Admin)
// @route   GET /api/orders/stats/dashboard
// @access  Private (Admin only)
exports.getDashboardStats = async (req, res) => {
  try {
    // Dynamic database-driven calculations
    const totalOrders = await Order.countDocuments();
    const totalFoodItems = await FoodItem.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'Pending' });
    const preparingOrders = await Order.countDocuments({ status: 'Preparing' });
    const readyOrders = await Order.countDocuments({ status: 'Ready' });
    const completedOrders = await Order.countDocuments({ status: 'Completed' });

    // Calculate revenue from completed or all paid orders
    const revenueAggregate = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueAggregate.length > 0 ? revenueAggregate[0].total : 0;

    // Recent 5 orders for dashboard table
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue,
        totalFoodItems,
        pendingOrders,
        preparingOrders,
        readyOrders,
        completedOrders,
      },
      recentOrders,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate dashboard statistics.',
    });
  }
};
