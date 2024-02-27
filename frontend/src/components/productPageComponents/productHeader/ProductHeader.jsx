import React, { useState } from 'react';
import Rating from '../../Rating';
import './productheaderCover.css';
import Slider from '../../shared/slider/Slider';
import Modal from '../../shared/modal/Modal';

const ProductHeader = ({ product, addToCartHandler }) => {
  // State pour la quantité
  const [qty, setQty] = useState(1);

  return (
    <div className='container-header-product'>
     

     <div className="actions">

      <Modal modalBtn={'Demander une proformat'}  >
        <form className="form">
          <div className="form-group">
            <label htmlFor="object">Objet de votre demande</label>
            <input type="text" id="name" placeholder="Votre nom" />
          </div>
          <div className="form-group">
            <label htmlFor="object">Nombres d'articles</label>
            <input type="number" id="name" placeholder="Nombres d'articles souhaiter" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Votre demande</label>
            <textarea type="text" id="name" placeholder="ecrivez votre demande ..." />
          </div>
    <div className="form-group">
      <button type="submit" className="btn-block">Envoyer</button>
    </div>
        </form>
      </Modal>
    
      <Modal modalBtn={'Obtenir des renseignements'} ></Modal>
   
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
