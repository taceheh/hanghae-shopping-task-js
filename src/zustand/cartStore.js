import { create } from 'zustand';
import {
  resetCartAtLocalStorage,
  setCartToLocalStorage,
  calculateTotal,
} from '../utils/cartUtils';

export const useCartStore = create((set) => ({
  cart: [],
  totalCount: 0,
  totalPrice: 0,
  initCart: (userId) => {
    if (!userId) return;
    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);
    set({
      cart: prevCartItems,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
  },
  resetCart: (userId) => {
    resetCartAtLocalStorage(userId);
    set({
      cart: [],
      totalCount: 0,
      totalPrice: 0,
    });
  },
  addCartItem: (item, userId, count) => {
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].count += count;
      } else {
        state.cart.push({ ...item, count });
      }
      const total = calculateTotal(state.cart);
      state.totalCount = total.totalCount;
      state.totalPrice = total.totalPrice;
      setCartToLocalStorage(state.cart, userId);
    });
  },
  removeCartItem: (itemId, userId) => {
    set((state) => {
      state.cart = state.cart.filter((item) => item.id !== itemId);
      const total = calculateTotal(state.cart);
      state.totalCount = total.totalCount;
      state.totalPrice = total.totalPrice;
      setCartToLocalStorage(state.cart, userId);
    });
  },
  changeCartItemCount: (itemId, count, userId) => {
    set((state) => {
      const itemIndex = state.cart.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        state.cart[itemIndex].count = count;
        const total = calculateTotal(state.cart);
        state.totalCount = total.totalCount;
        state.totalPrice = total.totalPrice;
        setCartToLocalStorage(state.cart, userId);
      }
    });
  },
}));
