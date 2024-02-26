import React from 'react';
import { useGetFavoriteProductsQuery } from '../../../slices/favoriteProductsSlice';
import { Link } from 'react-router-dom';

const AdminFavoriteProducts = () => {
  const { data: userFavoriteProducts, isLoading, isError, refetch } = useGetFavoriteProductsQuery();

  console.log(userFavoriteProducts);

  return (
    <div className='page-container'>
      <div className="heading">
        <h1>Produits favoris</h1>
        <p>Retrouver sur cette page tout les produits que les utilisateurs on ajouter dans leur produits favoris.</p>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {isError?.data?.message}</div>
      ) : (
        <div>
          <div className='flex-container'>
            {userFavoriteProducts.map((favorite) => (
              <div key={favorite._id}>
                <div className='card-like'>
                  <h4><Link to={`/product/${favorite.products._id}`} target='_blank'>{favorite.products.name}</Link> </h4>
                  <div>
                    Utilisateur: <span>{favorite.userId.name} </span> 
                  </div>
                  <div>

                    
                      <a className='btn btn-block ' href={`mailto:${favorite.userId.email}`}>envoyer un email</a>
                  
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFavoriteProducts;
