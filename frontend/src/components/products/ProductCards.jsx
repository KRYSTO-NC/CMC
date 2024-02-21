import { Link, useNavigate } from 'react-router-dom'
import './productCard.css'
import { FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { addToCart } from '../../slices/cartSlice'

import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ProductCards = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)


  const addToCartHandler = () => {
    if (qty <= product.countInStock) {
      dispatch(addToCart({ ...product, qty }));
      toast.success('Produit ajouté au panier');
    } else if (product.countInStock === 0){
      toast.error('Ce produit est en rupture de stock');
    }
    else {
      toast.error('Quantité non disponible');
    }
 
  };
  console.log('====================================');
  console.log(product);
  console.log('====================================');

  const formattedPrice = product.price.toLocaleString('fr-FR') // Utilisez la locale française pour le formatage des nombres
  return (
    <div className="product-card">
      <div className="badge">{product.category.name}</div>
         {/* Si le produit est en rupture de stock, affichez un badge "en rupture de stock" */}
         {product.countInStock === 0 && <div className="out-of-stock">En rupture de stock</div>}
      <div className="product-thumb">
      <Link to={`/product/${product._id}`}>
  {product.images && product.images.length > 0 && (
    <img src={product.images[0]} alt={product.name} />
  )}
</Link>
      </div>
      <div className="product-details">
        <span className="product-category">{product.subCategory.name}</span>
        <h4>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h4>
        <p>{product.description}</p>
      </div>
      <div className="product-bottom-details">
        <div className="product-price">
          {formattedPrice}
          <small>XPF</small>
        </div>
        <div className="product-links">
          <Link to={`/product/${product._id}`}>
            <FaEye />
          </Link>
          <button onClick={addToCartHandler}>
            <FaShoppingCart />
          </button>
          <button to={`/product/${product._id}`}>
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCards
