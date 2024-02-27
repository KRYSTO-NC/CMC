import { Link } from 'react-router-dom'
import './dashboardScreen.css'

// Assurez-vous d'avoir un composant Sidebar séparé

const DashboardScreen = () => {
  return (
    <div className="page-container">
      <div className="heading">
        <h1>Administration</h1>
        <p>administration du site </p>
      </div>
      <div className="btns">
        <Link to={'/admin/categories'} className="btn btn-block">Gestion des catégories</Link>
        <Link to={'/admin/products'} className="btn btn-block">Gestion des produits</Link>
        <Link to={'/admin/orders'}   className="btn btn-block">Gestion des commandes</Link>
        <Link to={'/admin/users'}   className="btn btn-block">Gestion des utilisateurs</Link>
        <Link to={'/admin/favorite-products'}   className="btn btn-block">Les produits ajoutée au favoris</Link>
        <Link to={'/admin/messages'}   className="btn btn-block">Messages</Link>
      </div>
    </div>
  )
}

export default DashboardScreen
