import { FaEye, FaTrash } from 'react-icons/fa';
import { useDeleteFavoriteProductMutation } from '../../slices/favoriteProductsSlice';
import { Link } from 'react-router-dom';
import './favoriteCard.css'

const FavoriteCard = ({ product , refetch}) => {


  const [deleteFavoriteProductMutation] = useDeleteFavoriteProductMutation(); // Assurez-vous d'utiliser la destructuration correcte ici
  console.log(product);
  const handleDeleteFavorite = async () => {
    try {
      // Utilisez la mutation pour supprimer le produit des favoris
      await deleteFavoriteProductMutation(product.id);
      refetch();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit des favoris :", error);
      // Gérez l'erreur selon vos besoins
    }
  };

  return (
    <div className='favorite-card'>
      <div className="favorite-card-thumbs">
        <img src={product.products.images[0]} alt={product.products.name} />
      </div>
      <div className='favorite-card-info'>
        <h3>{product.products.name}</h3>
        <p>{product.products.price.toLocaleString('fr-FR')} <span>XPF</span></p>
      </div>
      <div className="favorite-card-actions">
        <button className='btn-card red' onClick={handleDeleteFavorite}><FaTrash /></button>
        {/* Ajoutez ici le lien vers la page du produit si nécessaire */}
        <Link to={`/product/${product.products._id}`} className='btn-card orange'><FaEye /></Link>
      </div>
    </div>
  );
}

export default FavoriteCard;
