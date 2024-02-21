import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import './productsScreen.css';
import Loader from '../../components/shared/loader/Loader';
import Paginate from '../../components/utils/Paginate';
import ProductCards from '../../components/products/ProductCards';
import ProductsHeaderSearch from '../../components/products/ProductsHeaderSearch';
import Message from '../../components/shared/message/Message';

const ProductsScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
    }, 1000); // 2000 milliseconds (2 seconds)

    // Cleanup function to clear the timer in case the component unmounts before the timeout
    return () => clearTimeout(loaderTimer);
  }, []);

  return (
    <div>
      <ProductsHeaderSearch />
      {error && <Message><p>Une erreur est survenue</p></Message>}
      {showLoader && <Loader />}
      {!showLoader && data && (
        <>
          <div className="heading">
            <h2>Résultat de votre recherche</h2>
            <p>{data.products.length} Produits trouvée(s)</p>
          </div>
          <section className="card-container">
            {data.products.map((product) => (
              <div key={product._id}>
                <ProductCards product={product} />
              </div>
            ))}
          </section>
          <Paginate
            pages={data.pages ? data.pages : 0}
            page={data.page ? data.page : 0}
            keyword={keyword || ''}
          />
        </>
      )}
    </div>
  );
}

export default ProductsScreen;
