import React from 'react'

import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from './store'
import PrivateRoute from './components/utils/PrivateRoute'
import AdminRoute from './components/utils/AdminRoute'
import HomeScreen from './screens/homeScreen/HomeScreen'
import App from './App'
import LoginScreen from './screens/loginScreen/LoginScreen'
import RegisterScreen from './screens/registerScreen/RegisterScreen'
import ProductsScreen from './screens/productsSreen/ProductsScreen'
import ProductScreen from './screens/productScreen/ProductScreen'
import CartScreen from './screens/cartScreen/CartScreen'
import DashboardScreen from './screens/admin/dashboardScreen/DashboardScreen'
import ProfilScreen from './screens/private/ProfilScreen/ProfilScreen'
import FavoriteProductScreen from './screens/private/FavoriteProductScreen/FavoriteProductScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path={'/login'} element={<LoginScreen />} />
      <Route path={'/register'} element={<RegisterScreen />} />

      {/* Products  */}
      <Route path="/nos-produits" element={<ProductsScreen />} />
      <Route path="/search/:keyword" element={<ProductsScreen />} />
      <Route path="/page/:pageNumber" element={<ProductsScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<ProductsScreen />}
      />

      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="private/mon-profil" element={<ProfilScreen />} />
        <Route path="private/mes-favoris" element={<FavoriteProductScreen />} />
      </Route>
      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<DashboardScreen />} />
      </Route>
    </Route>,
  ),
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
