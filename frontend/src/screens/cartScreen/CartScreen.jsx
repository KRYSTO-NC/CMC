import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import { addToCart, removeFromCart } from '../../slices/cartSlice'

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }
  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }
  return (
    <div className="page-container">
      <section className="heading">
        <h2> Votre Panier</h2>
      </section>

      {cartItems.length === 0 ? (
        <p> Votre panier est vide</p>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-details">
                <Link to={`/product/${item._id}`}>{item.name}</Link>
                <p>
                  {item.price} XPF x {item.qty} = {item.price * item.qty} XPF
                </p>
              </div>
              <div className="cart-actions">
                <select
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeFromCartHandler(item._id)}
                  className="remove-button"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <h2>
          Sous-total: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
          articles{' '}
        </h2>
        {cartItems
          .reduce((acc, item) => acc + item.qty * item.price, 0)
          .toFixed(2)}{' '}
        XPF
      </div>
      <div className="cart-actions">
        <button className="btn" onClick={checkoutHandler}>
          Passer la commande
        </button>
      </div>
    </div>
  )
}

export default CartScreen
