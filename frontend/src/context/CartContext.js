import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  console.log(user)

  // Initialize cart state
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isLoggedIn && user) {
      const userCartKey = `cart_${user.user_id}`; 
      const tempCart = localStorage.getItem(userCartKey);
      if (tempCart) {
        setCart(JSON.parse(tempCart));
      }
    } else {
      setCart([]);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (isLoggedIn && user) {
      const userCartKey = `cart_${user.user_id}`; 
      localStorage.setItem(userCartKey, JSON.stringify(cart));
    }
  }, [cart, isLoggedIn, user]);

  //item amount state
  const [itemAmount, setItemAmount] = useState(0);
  
  //total price state
  const [total, setTotal] = useState(0);

  //update total
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount
    }, 0)
    setTotal(total)
  }, [cart]);

  //update item amount
  useEffect(()=>{
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem)=>{
        return accumulator + currentItem.amount
      }, 0)
      setItemAmount(amount)
    }
  }, [cart]);

  //add to cart
  const addToCart = (product, product_id)=> {
    const newItem = {...product, amount: 1}
    //check if item is already in the cart
    const cartItem = cart.find((item) => {
      return item.product_id === product_id
    })
    //if item is already in the cart
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.product_id === product_id) {
          return {...item, amount: cartItem.amount + 1}
        } else {
            return item
        }
      })
      setCart(newCart)
    } else {
      setCart([...cart, newItem]);
    }
  }

  //remove from cart
  const removeFromCart = (product_id) => {
    const newCart = cart.filter(item => {
      return item.product_id !== product_id
    })
    setCart(newCart)
  }

  //clear cart
  const clearCart = ()=> {
    setCart([])
  }

  // increase amount
  const increaseAmount = (product_id) => {
    const cartItem = cart.find((item) => item.product_id === product_id)
    addToCart(cartItem, product_id);
  }

  // decrease amount
  const decreaseAmount = (product_id) => {
    const cartItem = cart.find((item) => {
      return item.product_id === product_id
    })
    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.product_id === product_id) {
          return { ...item, amount: cartItem.amount - 1}
        } else {
          return item;
        }
      })
      setCart(newCart)
    }
      
    if (cartItem.amount < 2) {
        removeFromCart(product_id)
    }
  }
  
  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
