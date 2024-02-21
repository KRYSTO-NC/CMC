import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import { calcPrices } from '../utils/calcPrices.js'
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js'

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    })

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id,
      )
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      }
    })

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(
      dbOrderItems,
    )

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json(orders)
})

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  )

  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404)
    throw new Error('Commande introuvable')
  }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const { verified, value } = await verifyPayPalPayment(req.body.id)
    console.log('Verified:', verified)
    console.log('PayPal Value:', value)

    if (!verified) throw new Error('Payment not verified')

    // check if this transaction has been used before
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id)
    console.log('Is New Transaction:', isNewTransaction)

    if (!isNewTransaction) throw new Error('Transaction has been used before')

    const order = await Order.findById(req.params.id)
    console.log('Order:', order)

    if (order) {
      // Convert order total price and PayPal value to numbers

      const total = order.totalPrice / 119.332

      const orderTotalPrice = Number(total.toFixed(2))
      const paypalValue = Number(value)

      // check the correct amount was paid with a tolerance of 0.01
      const tolerance = 10
      const paidCorrectAmount =
        Math.abs(orderTotalPrice - paypalValue) < tolerance

      if (!paidCorrectAmount) throw new Error('Incorrect amount paid')

      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }

      const updatedOrder = await order.save()

      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  } catch (error) {
    console.error('Error in updateOrderToPaid:', error.message)
    res.status(500).json({ error: error.message })
  }
})

// @desc Update order to delivered
// @route PUT /api/orders/:id/delever
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updatedOrder = await order.save()
    res.status(200).json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Commande introuvable')
  }
})

// @desc all orders
// @route GET /api/orders/:id/delever
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.status(200).json(orders)
})

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
}
