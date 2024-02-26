import { Link } from 'react-router-dom'

import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import './miniProductCard.css'

const MiniCardProduct = ({ product }) => {
  const formattedPrice = product.price.toLocaleString('fr-FR')

  return (
    <div className="mini-product-card">
      {product.countInStock === 0 && (
        <div className="mini-out-of-stock">En rupture de stock</div>
      )}
      <div className="mini-product-thumb">
        <Link to={`/product/${product._id}`}>
          {product.images && product.images.length > 0 && (
            <img src={product.images[0]} alt={product.name} />
          )}
        </Link>
      </div>
      <p className="badge">REF : {product.numMail}</p>
      <div className="product-details">
        <h4>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h4>
      </div>
      <hr />
      <div className="actions">
        <Link to={`/admin/product-edit/${product._id}`}>
          <FaEdit />
        </Link>
        <button>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default MiniCardProduct
