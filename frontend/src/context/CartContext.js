import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from './UserContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { updateUser } = useContext(UserContext);

  // Initialize cart state
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isLoggedIn && user?.cart) {
      setCart(user.cart);
    } else {
      setCart([]);
    }
  }, [isLoggedIn, user]);

  // Item amount state
  const [itemAmount, setItemAmount] = useState(0);

  // Total price state
  const [total, setTotal] = useState(0);

  // Update total
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  // Update item amount
  useEffect(() => {
    const amount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount;
    }, 0);
    setItemAmount(amount);
  }, [cart]);

  // Add to cart
  const addToCart = (product, product_id) => {
    const newItem = { ...product, amount: 1 };

    // Check if item is already in the cart
    const cartItem = cart.find((item) => item.product_id === product_id);

    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.product_id === product_id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      setCart(newCart);
      if (isLoggedIn) {
        updateUser(user.user_id, { ...user, cart: newCart });
      }
    } else {
      const newCart = [...cart, newItem];
      setCart(newCart);
      if (isLoggedIn) {
        updateUser(user.user_id, { ...user, cart: newCart });
      }
    }
  };

  // Remove from cart
  const removeFromCart = (product_id) => {
    const newCart = cart.filter((item) => item.product_id !== product_id);
    setCart(newCart);
    if (isLoggedIn) {
      updateUser(user.user_id, { ...user, cart: newCart });
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    if (isLoggedIn) {
      updateUser(user.user_id, { ...user, cart: [] });
    }
  };

  // Increase amount
  const increaseAmount = (product_id) => {
    const cartItem = cart.find((item) => item.product_id === product_id);
    if (cartItem) {
      addToCart(cartItem, product_id);
    }
  };

  // Decrease amount
  const decreaseAmount = (product_id) => {
    const cartItem = cart.find((item) => item.product_id === product_id);
    if (cartItem) {
      if (cartItem.amount > 1) {
        const newCart = cart.map((item) => {
          if (item.product_id === product_id) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        });
        setCart(newCart);
        if (isLoggedIn) {
          updateUser(user.user_id, { ...user, cart: newCart });
        }
      } else {
        removeFromCart(product_id);
      }
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      increaseAmount,
      decreaseAmount,
      itemAmount,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
