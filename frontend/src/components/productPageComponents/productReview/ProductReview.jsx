// Import des composants nécessaires
import Rating from '../../Rating';
import Loader from '../../shared/loader/Loader';

import './productReview.css';

// Composant ProductReview avec les avis
const ProductReview = ({ reviews }) => {
  // Affichage des avis dans la console à des fins de débogage
  console.log('====================================');
  console.log(reviews);
  console.log('====================================');

  // Vérification de la présence d'avis, affichage du Loader si non disponible
  if (!reviews) {
    return <Loader />;
  } else {
    // Affichage des avis s'il y en a
    return (
      <section className="product-review-section">
    

        {/* Affichage du message s'il n'y a aucun avis */}
        {reviews?.length === 0 && <div>Aucun avis</div>}

        <div className="reviews-container">
          {/* Affichage des avis */}
          {reviews.map((review) => (
            <div className="review-card" key={review._id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating}>{review.rating}</Rating>
              <p>{new Date(review.createdAt).toLocaleDateString()}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
};


export default ProductReview;
