import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'snowpeak_cart_items';

const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  return Number(String(price).replace(/[^0-9]/g, '')) || 0;
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const optionKey = `${product.id}-${product.color || 'default'}-${product.size || 'default'}`;

    setCartItems((items) => {
      const existingItem = items.find((item) => item.optionKey === optionKey);

      if (existingItem) {
        return items.map((item) =>
          item.optionKey === optionKey
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item,
        );
      }

      return [
        ...items,
        {
          optionKey,
          id: product.id,
          title: product.title,
          price: parsePrice(product.price),
          image: product.image,
          color: product.color || '',
          size: product.size || '',
          quantity: product.quantity || 1,
        },
      ];
    });
  };

  const removeFromCart = (optionKey) => {
    setCartItems((items) => items.filter((item) => item.optionKey !== optionKey));
  };

  const updateQuantity = (optionKey, quantity) => {
    if (quantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.optionKey === optionKey ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}