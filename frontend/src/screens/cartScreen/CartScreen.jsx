import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaBatteryEmpty, FaExclamation, FaTrash } from 'react-icons/fa'
import { addToCart, removeFromCart } from '../../slices/cartSlice'
import './cartScreen.css'

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
        <h2>Votre Panier</h2>
        <p></p>
      </section>

      {cartItems.length === 0 ? (
        <>
          <p className="empty"> Votre panier est vide <FaExclamation/> </p>
          <Link className="btn" to={'/nos-produits'}>Retour à la boutique</Link>
        </>
      ) : (
        <>
     
        <Link className="btn" to={'/nos-produits'}>Retour à la boutique</Link>
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="cart-image">
                  <img src={item.images[0]} alt={item.name} />
                </div>
                <div className="cart-details">
                  <Link className="productName" to={`/product/${item._id}`}>
                    {item.name}
                  </Link>
                  <p>
                    {item.price.toLocaleString()} XPF x {item.qty} ={' '}
                    <span>{(item.price * item.qty).toLocaleString()} </span> XPF
                  </p>
                  <div className="cart-action">
                    <p className="qty">Modifier la quantité</p>
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
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>
              Sous-total: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              articles{' '}
            </h2>
            <p>
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toLocaleString()}{' '}
              <span className='spanPrice'>XPF</span>
            </p>
            <div className="cart-actions">
              <button className="btn" onClick={checkoutHandler}>
                Passer la commande
              </button>
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  )
}

export default CartScreen
