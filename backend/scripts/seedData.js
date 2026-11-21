const User = require('../models/User');
const FoodItem = require('../models/FoodItem');
const Order = require('../models/Order');

const sampleFoods = [
  {
    name: 'Classic Veg Burger',
    description: 'Crispy vegetable patty topped with melted cheese slice, fresh lettuce, and tangy burger sauce.',
    price: 70,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: false,
    isPopular: true,
    preparationTime: '8-10 mins',
    rating: 4.8,
  },
  {
    name: 'Farmhouse Special Pizza',
    description: 'Fresh hand-tossed crust loaded with mozzarella cheese, capsicum, corn, onions, and mushrooms.',
    price: 160,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: true,
    isPopular: true,
    preparationTime: '15-20 mins',
    rating: 4.9,
  },
  {
    name: 'Grilled Club Sandwich',
    description: 'Triple-layer toasted sandwich stuffed with spiced potatoes, cucumber, cheese, and mint chutney.',
    price: 60,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: false,
    isPopular: true,
    preparationTime: '7-10 mins',
    rating: 4.7,
  },
  {
    name: 'Crispy Peri Peri French Fries',
    description: 'Golden fried potato fries tossed in fiery peri-peri seasoning served with garlic mayo dip.',
    price: 50,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: false,
    isPopular: true,
    preparationTime: '5-7 mins',
    rating: 4.6,
  },
  {
    name: 'Iced Cold Coffee',
    description: 'Creamy blended espresso coffee topped with chocolate syrup and a scoop of vanilla ice cream.',
    price: 50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: true,
    isPopular: true,
    preparationTime: '5 mins',
    rating: 4.9,
  },
  {
    name: 'Masala Chai',
    description: 'Traditional hot brewed tea infused with crushed ginger, cardamom, cinnamon, and fresh milk.',
    price: 15,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: false,
    isPopular: true,
    preparationTime: '3-5 mins',
    rating: 4.8,
  },
  {
    name: 'Crispy Punjabi Samosa (2 pcs)',
    description: 'Flaky golden pastry cones filled with savory spiced potatoes and green peas, with tamarind chutney.',
    price: 30,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: false,
    isPopular: true,
    preparationTime: '3 mins',
    rating: 4.7,
  },
  {
    name: 'Hakka Veg Noodles',
    description: 'Wok-tossed noodles with shredded cabbage, bell peppers, carrots, garlic, and savory Asian sauces.',
    price: 80,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: false,
    isPopular: true,
    preparationTime: '10-12 mins',
    rating: 4.6,
  },
  {
    name: 'Masala Dosa with Chutneys',
    description: 'Crispy golden fermented crepe stuffed with aromatic spiced potato mash, served with sambar & coconut chutney.',
    price: 75,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: true,
    isPopular: true,
    preparationTime: '10-15 mins',
    rating: 4.9,
  },
  {
    name: 'Royal North Indian Thali',
    description: 'Wholesome meal with Paneer butter masala, Dal makhani, Jeera rice, 2 Butter rotis, Salad, and Gulab jamun.',
    price: 130,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: true,
    isPopular: true,
    preparationTime: '12-15 mins',
    rating: 4.9,
  },
  {
    name: 'Creamy White Sauce Pasta',
    description: 'Penne pasta tossed in rich cheesy Alfredo sauce with sautéed mushrooms, sweet corn, and oregano.',
    price: 110,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628169e?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: false,
    isPopular: true,
    preparationTime: '12-15 mins',
    rating: 4.7,
  },
  {
    name: 'Thick Chocolate Milkshake',
    description: 'Decadent chocolate milkshake made with real Belgian chocolate, vanilla ice cream, and chocolate chips.',
    price: 65,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: false,
    isPopular: true,
    preparationTime: '5 mins',
    rating: 4.8,
  },
  {
    name: 'Paneer Tikka Roll',
    description: 'Soft rumali roti loaded with smoky tandoori paneer cubes, crunchy onions, and zesty mint dip.',
    price: 90,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    available: true,
    isSpecial: false,
    isPopular: false,
    preparationTime: '8-10 mins',
    rating: 4.6,
  },
  {
    name: 'Chole Bhature (2 pcs)',
    description: 'Puffed golden bhature served with spicy chickpea curry, pickled onions, and fried green chillies.',
    price: 85,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&auto=format&fit=crop&q=80',
    available: false,
    isSpecial: false,
    isPopular: true,
    preparationTime: '10 mins',
    rating: 4.8,
  },
];

const seedDatabase = async () => {
  try {
    // 1. Seed Users if not present
    let admin = await User.findOne({ email: 'admin@canteen.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Canteen Administrator',
        email: 'admin@canteen.com',
        password: 'admin123',
        role: 'admin',
        phone: '+91 98765 43210',
      });
      console.log('👤 Demo Admin created: admin@canteen.com / admin123');
    }

    let student = await User.findOne({ email: 'student@canteen.com' });
    if (!student) {
      student = await User.create({
        name: 'Rahul Sharma',
        email: 'student@canteen.com',
        password: 'student123',
        role: 'student',
        phone: '+91 91234 56789',
        rollNumber: 'CS2026-042',
      });
      console.log('👤 Demo Student created: student@canteen.com / student123');
    }

    // 2. Seed Foods if empty
    const foodCount = await FoodItem.countDocuments();
    let foodsInDb = [];
    if (foodCount === 0) {
      foodsInDb = await FoodItem.insertMany(sampleFoods);
      console.log(`🍔 Seeded ${foodsInDb.length} delicious food items!`);
    } else {
      foodsInDb = await FoodItem.find();
    }

    // 3. Seed Sample Orders if empty so admin dashboard has real dynamic statistics immediately
    const orderCount = await Order.countDocuments();
    if (orderCount === 0 && foodsInDb.length > 0 && student) {
      const burger = foodsInDb.find(f => f.name.includes('Burger')) || foodsInDb[0];
      const coldCoffee = foodsInDb.find(f => f.name.includes('Cold Coffee')) || foodsInDb[1];
      const pizza = foodsInDb.find(f => f.name.includes('Pizza')) || foodsInDb[2];

      await Order.create([
        {
          studentId: student._id,
          studentName: student.name,
          studentEmail: student.email,
          items: [
            { foodItem: burger._id, name: burger.name, price: burger.price, quantity: 2, image: burger.image },
            { foodItem: coldCoffee._id, name: coldCoffee.name, price: coldCoffee.price, quantity: 1, image: coldCoffee.image },
          ],
          totalAmount: burger.price * 2 + coldCoffee.price,
          status: 'Completed',
          paymentMethod: 'UPI / Online Simulated',
          paymentStatus: 'Paid',
          tokenNumber: 101,
          notes: 'Extra ketchup please',
        },
        {
          studentId: student._id,
          studentName: student.name,
          studentEmail: student.email,
          items: [
            { foodItem: pizza._id, name: pizza.name, price: pizza.price, quantity: 1, image: pizza.image },
          ],
          totalAmount: pizza.price,
          status: 'Preparing',
          paymentMethod: 'Pay at Canteen Counter',
          paymentStatus: 'Pending',
          tokenNumber: 102,
          notes: 'Make it spicy',
        },
        {
          studentId: student._id,
          studentName: student.name,
          studentEmail: student.email,
          items: [
            { foodItem: coldCoffee._id, name: coldCoffee.name, price: coldCoffee.price, quantity: 2, image: coldCoffee.image },
          ],
          totalAmount: coldCoffee.price * 2,
          status: 'Pending',
          paymentMethod: 'Pay at Canteen Counter',
          paymentStatus: 'Pending',
          tokenNumber: 103,
          notes: 'Less sugar',
        },
      ]);
      console.log('📦 Sample orders seeded for instant dynamic presentation statistics!');
    }
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  }
};

module.exports = { seedDatabase, sampleFoods };
