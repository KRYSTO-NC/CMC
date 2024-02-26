// Importez les styles nécessaires
import './navbar.css'
import {
  FaMoneyBillAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaArrowAltCircleRight,
  FaStop,
  FaShoppingCart,
  FaProductHunt,
} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../slices/authSlice'
import { resetCart } from '../../../slices/cartSlice'
import React, { useEffect, useState } from 'react'
import { useLogoutMutation } from '../../../slices/userApiSlice'

// Composant NavLink
const NavLink = ({ to, label, icon }) => (
  <li>
    <Link to={to}>
      {' '}
      {icon} {label}
    </Link>
  </li>
)

// Composant Navbar
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)
  const [cartItemCount, setCartItemCount] = useState(0)
  const { userInfo } = useSelector((state) => state.auth)
  const [logoutApiCall] = useLogoutMutation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      dispatch(resetCart())
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  // Utilisez useEffect pour mettre à jour le nombre d'articles dans le panier
  useEffect(() => {
    const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0)
    setCartItemCount(cartItemCount)
  }, [cartItems])


  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <FaMoneyBillAlt />
          <Link to="/"> Calédonie Moins Cher </Link>
        </div>

        {userInfo ? (
          <>
            <ul className={`links ${isMenuOpen ? 'open' : ''}`}>
              <li>
                {' '}
                <NavLink to="/nos-produits" label="Produits" />
              </li>
              <li>
                <NavLink to="/order" label="Mes commandes" />
              </li>
              <li>
                <NavLink to="/favorite-products" label="Ma liste de produits" />
              </li>
              {userInfo.isAdmin && (
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    label="Dashboard Admin"
                    className="connected"
                  />
                </li>
              )}
            </ul>

            <div className="action-container">
              <Link to={'/private/mon-profil'} className="action_btn btn">
                <FaArrowAltCircleRight /> {userInfo.name}
              </Link>
              <Link
                to={'/'}
                onClick={logoutHandler}
                className="action_btn btn logout"
              >
                <FaStop /> Deconnection
              </Link>
            </div>
          </>
        ) : (
          <>
            <ul className={`links ${isMenuOpen ? 'open' : ''}`}>
              <li>
              <NavLink
            to="/cart"
            label={`Mon Panier (${cartItemCount})`}
            icon={<FaShoppingCart />}
          />
              </li>
              <li>
                <NavLink to="/nos-produits" label="Nos produits" />
              </li>
            </ul>
            <div className="action-container">
              <Link to={'/register'} className="action_btn btn">
                <FaUser /> S'enregistrer
              </Link>
              <Link to={'/login'} className="action_btn btn">
                <FaArrowAltCircleRight /> Connection
              </Link>
            </div>
          </>
        )}

        <div className="toggle_btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      <div className={`dropdown_menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {userInfo ? (
            <>
              <li>
                <NavLink className="mini-link" to="/order" label="Orders" />
              </li>
              {userInfo.isAdmin && (
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    label="Dashboard Admin"
                    className="mini-link"
                  />
                </li>
              )}
              <li>
                <Link to={'/private/mon-profil'}  className="action_btn btn">
                  <FaArrowAltCircleRight /> {userInfo.name}
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  onClick={logoutHandler}
                  className="action_btn btn"
                >
                  <FaUser /> Deconnection
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  className="mini-link"
                  to="/nos-produits"
                  label="Nos produits"
                  icon={<FaProductHunt />}
                />
              </li>
              {/* <NavLink to='/products' label='Produits' /> */}
              <li>
              <NavLink
            className="mini-link"
            to="/cart"
            label={`Mon Panier (${cartItemCount})`}
            icon={<FaShoppingCart />}
          />
   
              </li>
              <div className="action-container">
                <li>
                  <Link to="/login" label="Connexion" className="btn action-btn">
                    {' '}
                    <FaUser /> Connexion{' '}
                  </Link>
                </li>
                <li>
                  <Link to="/register" label="S'inscrire" className="btn action-btn">
                    {' '}
                    S'enregistrer{' '}
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Navbar
