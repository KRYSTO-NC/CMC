import React, { useState } from 'react';
import Rating from '../../Rating';
import './productheaderCover.css';
import Slider from '../../shared/slider/Slider';

const ProductHeader = ({ product, addToCartHandler }) => {
  // State pour la quantité
  const [qty, setQty] = useState(1);

  console.log('====================================');
  console.log(product);
  console.log('====================================');

  return (
    <div className='container-header-product'>
     

     <div className="actions">
      <button className='btn'>Demander un devis</button>
      <button className='btn'>Demander des renseignements</button>
   
     </div>

<div className="product_cover">

<Slider product={product}/>
</div>
  <div className="product_infos">
    <div className="product-general">

        <h1>{product.name}</h1>
        <Rating value={product.rating}/>
        <p>{product.description}</p>
        <p>{product.price} XPF</p>
        {/* Quantité Select */}
    </div>
    <div className="product-add-tocart">

      {product.countInStock > 0 && (
          <form className='form'>
          <div className='form-group'>
            <label htmlFor='qty'>Quantité</label>
            <select
              id='qty'
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              >
              {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <button
              className='btn-block'
              type='button'
              disabled={product.countInStock === 0}
              onClick={() => addToCartHandler(qty)}
              >
              Ajouter au panier
            </button>
          </div>
        </form>
      )}

      </div>
  </div>
  
  

      
    </div>
  );
};

export default ProductHeader;
