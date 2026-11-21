import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('canteen_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('canteen_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food) => {
    if (!food.available) return false;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.foodItemId === food._id);
      if (existing) {
        return prev.map((item) =>
          item.foodItemId === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          foodItemId: food._id,
          name: food.name,
          price: food.price,
          image: food.image,
          category: food.category,
          quantity: 1,
        },
      ];
    });
    return true;
  };

  const updateQuantity = (foodItemId, delta) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.foodItemId === foodItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (foodItemId) => {
    setCartItems((prev) => prev.filter((item) => item.foodItemId !== foodItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQuantity = (foodItemId) => {
    const item = cartItems.find((i) => i.foodItemId === foodItemId);
    return item ? item.quantity : 0;
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
