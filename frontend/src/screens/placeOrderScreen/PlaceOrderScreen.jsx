import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import CheckoutSteps from '../../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'

import { useCreateOrderMutation } from '../../slices/ordersApiSlice'
import { clearCartItems } from '../../slices/cartSlice'

import './placeOrderScreen.css'
import Loader from '../../components/shared/loader/Loader'
import { FaPaypal } from 'react-icons/fa'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const [createOrder, { isLoading, error }] = useCreateOrderMutation()

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      dispatch(clearCartItems())
      navigate(`/order/${res._id}`)
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className="page-container">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="place-order-content">
        <div className="shipping-section">
          <div>
            <h2>Addresse de livraison</h2>

            <p>{cart.shippingAddress.address}, </p>
            <p>
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.city}{' '}
            </p>
            <p>{cart.shippingAddress.country}</p>
          </div>

          <div className="payment-method-section">
            <h2>Méthode de paiment</h2>
            <p>
              <FaPaypal />
              {cart.paymentMethod}
            </p>
          </div>
        </div>

        <div className="order-items-section">
          <h2>Articles de votre commande</h2>
          {cart.cartItems.length === 0 ? (
            <p>Votre panier est vide</p>
          ) : (
            <div className="order-items-list">
              {cart.cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="order-item-img">
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="order-summary-section">
        <div className="order-summary">
          <h2>Récapitulatif de la commande</h2>
          <div>
            <h5>Articles</h5>
            <p>{cart.itemsPrice} <span>XPF</span></p>
          </div>
          <div>
            <h5>Transport</h5>
            <p>{cart.shippingPrice} <span>XPF</span></p>
          </div>
          <div>
            <h5>Taxes</h5>
            <p>{cart.taxPrice} <span>XPF</span></p>
          </div>
          <hr />
          <div className='total-price'>
            <h5>Total de votre commande</h5>
            <p >{cart.totalPrice} <span>XPF</span></p>
          </div>
          <hr />
          {error && <p className="error-message">{error.data.message}</p>}
          <button
            type="button"
            className="btn-block btn"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Valider la commande
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen
