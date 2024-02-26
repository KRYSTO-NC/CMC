import { Link, useNavigate } from 'react-router-dom';
import './productCard.css';
import { FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateFavoriteProductMutation,
  useGetFavoriteProductsQuery,
  useUpdateFavoriteProductMutation,
} from '../../slices/favoriteProductsSlice.js';

const ProductCards = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { userInfo } = useSelector((state) => state.auth);
 
  console.log(userInfo);
  const [createFavoriteProductMutation] = useCreateFavoriteProductMutation();

  const updatedFavoriteProductMutation = useUpdateFavoriteProductMutation();
  const { data: userFavoriteProducts, refetch: refetchFavoriteProducts } = useGetFavoriteProductsQuery();

  const isProductInFavorites = (userFavoriteProducts || []).some((favProduct) => favProduct._id === product._id);
    console.log(product);
 
    const handleAddToFavorites = async () => {
      try {
        if (!userInfo) {
          // Gérez le cas où l'utilisateur n'est pas connecté
          navigate('/login');
          return;
        }
  
          // Le produit n'est pas dans les favoris, donc ajoutez-le à la liste des favoris
   await createFavoriteProductMutation({ userId: userInfo._id, products: product._id });
        
       
        // Mettez à jour les favoris en refetchant les données avec useGetFavoriteProductsQuery
        refetchFavoriteProducts();
        toast.success('Produit ajouté aux favoris avec succès');
      } catch (error) {
        console.error("Erreur lors de l'ajout du produit aux favoris :", error);
        toast.error("Erreur lors de l'ajout du produit aux favoris");
      }
    };
  const addToCartHandler = () => {
    if (qty <= product.countInStock) {
      dispatch(addToCart({ ...product, qty }));
      toast.success('Produit ajouté au panier');
    } else if (product.countInStock === 0) {
      toast.error('Ce produit est en rupture de stock');
    } else {
      toast.error('Quantité non disponible');
    }
  };

  const formattedPrice = product.price.toLocaleString('fr-FR');

  return (
    <div className="product-card">
      <div className="badge">{product.category.name}</div>
      {product.countInStock === 0 && <div className="out-of-stock">En rupture de stock</div>}
      <div className="product-thumb">
        <Link to={`/product/${product._id}`}>
          {product.images && product.images.length > 0 && <img src={product.images[0]} alt={product.name} />}
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
          <button onClick={handleAddToFavorites}>
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
