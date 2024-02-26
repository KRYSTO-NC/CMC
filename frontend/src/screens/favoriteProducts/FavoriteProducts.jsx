import React from 'react'
import { useSelector } from 'react-redux'
import { useGetFavoriteProductsQuery } from '../../slices/favoriteProductsSlice'
import Loader from '../../components/shared/loader/Loader'

import FavoriteCard from './FavoriteCard'

const FavoriteProducts = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const {
    data: userFavoriteProducts,
    isLoading,
    isError,
    refetch,
  } = useGetFavoriteProductsQuery()
  console.log(userFavoriteProducts)
  return (
    <div className="page-container">
      {' '}
      {/* Supprimer la balise `<` en trop */}
      <div className="heading">
        <h1>Mes favoris</h1>
        <p>La liste de vos produits favoris</p>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error: {isError?.data?.message}</div>
      ) : (
        <div>
          <div className='flex-container'>
            {userFavoriteProducts
              .filter(
                (favorite) => userInfo && favorite.userId._id === userInfo._id,
              ) // Filtrer par utilisateur connecté
              .map((favorite) => (
                <div  key={favorite._id}>
                   <FavoriteCard product={favorite} refetch={refetch}/>
              </div>
                
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FavoriteProducts
