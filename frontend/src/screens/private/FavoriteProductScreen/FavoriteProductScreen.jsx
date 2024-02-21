import React from 'react';
import './favouriteProductScreen.css';
import { useSelector } from 'react-redux';
import { useGetUserDetailsQuery } from '../../../slices/userApiSlice';
import Message from '../../../components/shared/message/Message';
import Loader from '../../../components/shared/loader/Loader';
import ProductCards from '../../../components/products/ProductCards';
import { Link } from 'react-router-dom';
// Assurez-vous de fournir le bon chemin

const FavoriteProductScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: profil, isLoading, error } = useGetUserDetailsQuery(
    userInfo._id,
  );

  console.log('====================================');
  console.log('profil', profil);
  console.log('====================================');

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error || !profil ? (
            <Message
              messageTitle={'Oups !'}
              messageTxt={
                "Une erreur s'est produite lors du chargement du profil."
              }
            />
          ) : (
            <div className="page-container">
              <div className="heading">
                <h2>Ma liste de favoris</h2>
                <p>Retrouvez ici la liste de vos produits favoris.</p>
                {profil?.favoriteProducts?.length === 0 && (
                    <>
                     <p>Vous n'avez pas encore de favoris.</p>
                     <Link to={'/nos-produits'} className='btn'>Retour à la boutique</Link>
                    </>
                )}
              </div>
              <div className="card-container">
                {profil?.favoriteProducts?.map((product) => (
                  <div key={product._id}>
                    <ProductCards product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoriteProductScreen;
