import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCreateReviewMutation, useGetProductDetailsQuery } from '../../slices/productsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../slices/cartSlice';

import ProductReview from '../../components/productPageComponents/productReview/ProductReview';
import ProductHeader from '../../components/productPageComponents/productHeader/ProductHeader';
import Loader from '../../components/shared/loader/Loader';
import './productScreen.css'
import Modal from '../../components/shared/modal/Modal';
const ProductDetails = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [
    createReview,
    { isLoading: loadingProductReview },
  ] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Merci pour votre avis !');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error?.data?.message}</div>
      ) : (
        <>
         <ProductHeader product={product} addToCartHandler={addToCartHandler} />
<div className="container-tab">

         <table className='options'>

  <tbody>
    {product.options.map((option, index) => (
      <tr key={index}>
        <td className='colored'>{option.name}</td>
        <td>{option.value}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
    <div className="review-container">

          <section>
            <h2>Votre avis nous intéresse</h2>
            {userInfo ? (

              <Modal modalBtn={"Laissez votre avis"}>

              <form onSubmit={submitHandler} className='form'>
                <div className='form-group'>
                  <label htmlFor='rating'>Note</label>
                  <select
                    id='rating'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    >
                    <option value=''>Sélectionner...</option>
                    <option value='1'>1 - Mauvais</option>
                    <option value='2'>2 - Passable</option>
                    <option value='3'>3 - Bien</option>
                    <option value='4'>4 - Très bien</option>
                    <option value='5'>5 - Excellent</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='comment'>Commentaire</label>
                  <textarea
                    id='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>
                <div className='form-group'>
                  <button
                    disabled={loadingProductReview}
                    type='submit'
                    className='btn btn-block'
                    >
                    Soumettre
                  </button>
                </div>
              </form>
            </Modal>
            ) : (
              <p>
                Merci de <Link to='/login'>vous connecter</Link> pour laisser un avis
                sur cet article.
              </p>
            )}
          </section>
          </div>
          <ProductReview reviews={product.reviews} />
          </>
      )}
    </>
  );
};

export default ProductDetails;
