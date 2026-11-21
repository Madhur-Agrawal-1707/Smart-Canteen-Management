const API_URL = 'http://localhost:5000/api';

async function req(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  return data;
}

async function runTests() {
  console.log('🧪 Starting End-to-End Workflow Verification...\n');

  try {
    // 1. Health Check
    const health = await req(`${API_URL}/health`);
    console.log('✅ 1. Backend Health Check:', health.status);

    // 2. Student Login
    const studentLogin = await req(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: 'student@canteen.com',
        password: 'student123',
      }),
    });
    console.log('✅ 2. Student Login successful:', studentLogin.user.name, `[role: ${studentLogin.user.role}]`);
    const studentToken = studentLogin.token;

    // 3. Admin Login
    const adminLogin = await req(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@canteen.com',
        password: 'admin123',
      }),
    });
    console.log('✅ 3. Admin Login successful:', adminLogin.user.name, `[role: ${adminLogin.user.role}]`);
    const adminToken = adminLogin.token;

    // 4. Get Foods List
    const foodsRes = await req(`${API_URL}/foods`);
    console.log(`✅ 4. Retrieved ${foodsRes.count} food items from MongoDB.`);
    const sampleFood = foodsRes.foods[0];
    console.log(`   Sample item: "${sampleFood.name}" - ₹${sampleFood.price} (${sampleFood.category})`);

    // 5. Student places an order
    const orderPayload = {
      items: [
        { foodItemId: sampleFood._id, quantity: 2 },
      ],
      paymentMethod: 'Pay at Canteen Counter',
      notes: 'Extra tissue papers please',
    };
    const orderRes = await req(`${API_URL}/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${studentToken}` },
      body: JSON.stringify(orderPayload),
    });
    const createdOrder = orderRes.order;
    console.log(`✅ 5. Student Order Created: Token #${createdOrder.tokenNumber}, Status: "${createdOrder.status}", Total: ₹${createdOrder.totalAmount}`);

    // 6. Student verifies order history
    const myOrdersRes = await req(`${API_URL}/orders/my-orders`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    const foundOrder = myOrdersRes.orders.find(o => o._id === createdOrder._id);
    console.log(`✅ 6. Student My-Orders confirmed: found Token #${foundOrder.tokenNumber} with ${foundOrder.items.length} item.`);

    // 7. Admin checks dashboard dynamic statistics
    const statsRes = await req(`${API_URL}/orders/stats/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('✅ 7. Admin Dashboard Dynamic Stats calculated from MongoDB:');
    console.log(`   - Total Orders: ${statsRes.stats.totalOrders}`);
    console.log(`   - Total Revenue: ₹${statsRes.stats.totalRevenue}`);
    console.log(`   - Total Food Items: ${statsRes.stats.totalFoodItems}`);
    console.log(`   - Pending Orders: ${statsRes.stats.pendingOrders}`);

    // 8. Admin changes status to "Preparing"
    const prepRes = await req(`${API_URL}/orders/${createdOrder._id}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status: 'Preparing' }),
    });
    console.log(`✅ 8. Admin updated status to: "${prepRes.order.status}"`);

    // 9. Admin changes status to "Ready"
    const readyRes = await req(`${API_URL}/orders/${createdOrder._id}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status: 'Ready' }),
    });
    console.log(`✅ 9. Admin updated status to: "${readyRes.order.status}"`);

    // 10. Admin changes status to "Completed"
    const compRes = await req(`${API_URL}/orders/${createdOrder._id}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status: 'Completed' }),
    });
    console.log(`✅ 10. Admin updated status to: "${compRes.order.status}" (Payment status: ${compRes.order.paymentStatus})`);

    // 11. Admin Food Management (Create, Toggle, Delete)
    const newFoodRes = await req(`${API_URL}/foods`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({
        name: 'Test Crispy Cutlet',
        description: 'Delicious spiced vegetable cutlet test',
        price: 45,
        category: 'Snacks',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
        available: true,
      }),
    });
    const testFoodId = newFoodRes.food._id;
    console.log(`✅ 11. Admin created new food: "${newFoodRes.food.name}"`);

    const toggleRes = await req(`${API_URL}/foods/${testFoodId}/toggle`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log(`✅ 12. Admin toggled availability: available = ${toggleRes.food.available}`);

    const deleteRes = await req(`${API_URL}/foods/${testFoodId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log(`✅ 13. Admin deleted test food item: "${deleteRes.message}"`);

    console.log('\n🎉 ALL 13 END-TO-END WORKFLOW TESTS PASSED PERFECTLY! 🚀');
  } catch (err) {
    console.error('❌ Test failed:', err.message);
    process.exit(1);
  }
}

runTests();
