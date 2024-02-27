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

import FaqScreen from './screens/faqScreen/FaqScreen'

import Cgv from './screens/legal/Cgv'
import Cgu from './screens/legal/Cgu'
import CategoriesScreen from './screens/admin/categoriesScreen/CategoriesScreen'
import AdminProductsScreen from './screens/admin/adminProductsScreen/AdminProductsScreen'
import AdminProductEditScreen from './screens/admin/adminProductEditScreen/AdminProductEditScreen'
import ShippingScreen from './screens/shippingScreen/ShippingScreen'
import PaymentScreen from './screens/paimentScreen/PaimentScreen'
import PlaceOrderScreen from './screens/placeOrderScreen/PlaceOrderScreen'
import OrderScreen from './screens/orderScreen/OrderScreen'
import AdminCategory from './screens/admin/adminCategory/AdminCategory'
import AdminSubCategories from './screens/admin/adminSubCategory/AdminSubCategories'
import AdminUsersList from './screens/admin/adminUsersList/AdminUsersList'
import AdminUserEdit from './screens/admin/adminUserEdit/AdminUserEdit'

import FavoriteProducts from './screens/favoriteProducts/FavoriteProducts'
import AdminOrders from './screens/admin/adminOrders/AdminOrders'
import AdminFavoriteProducts from './screens/admin/adminFavoriteProducts/AdminFavoriteProducts'
import AdminMessages from './screens/admin/adminMessages/AdminMessages'
import AdminMessage from './screens/admin/adminMessage/AdminMessage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path={'/login'} element={<LoginScreen />} />
      <Route path={'/register'} element={<RegisterScreen />} />
      <Route path={'/faq'} element={<FaqScreen />} />
      <Route path={'/cgv'} element={<Cgv />} />
      <Route path={'/cgu'} element={<Cgu />} />
      <Route path={'/favorite-products'} element={<FavoriteProducts />} />

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
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
      </Route>
      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<DashboardScreen />} />
        <Route path="/admin/categories" element={<CategoriesScreen />} />
        <Route path="/admin/products" element={<AdminProductsScreen />} />
        <Route path="/admin/category/:id" element={<AdminCategory />} />
        <Route path="/admin/users" element={<AdminUsersList />} />
        <Route path="/admin/user-edit/:id" element={<AdminUserEdit />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/message/:id" element={<AdminMessage />} />
        <Route
          path="/admin/favorite-products"
          element={<AdminFavoriteProducts />}
        />
        <Route
          path="/admin/product-edit/:id"
          element={<AdminProductEditScreen />}
        />
        <Route
          path="/admin/sub-category/:id"
          element={<AdminSubCategories />}
        />
        <Route
          path="/admin/page/:pageNumber"
          element={<AdminProductsScreen />}
        />
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
