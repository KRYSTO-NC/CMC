import { createSlice } from '@reduxjs/toolkit'
import { updatedCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }

const cardSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x._id === item._id)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x,
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updatedCart(state)
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
      return updatedCart(state)
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      return updatedCart(state)
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      return updatedCart(state)
    },
    clearCartItems: (state, action) => {
      state.cartItems = []
      return updatedCart(state)
    },
  },
  resetCart: (state) => (state = initialState),
})

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cardSlice.actions

export default cardSlice.reducer
