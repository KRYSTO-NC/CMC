import React from 'react';
import { Link } from 'react-router-dom';
import './checkoutStep.css';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='checkout-steps'>
      <div className={`step ${step1 ? 'active' : 'disabled'}`}>
        {step1 ? (
          <Link to='/login'>Connection</Link>
        ) : (
          <span>Connection</span>
        )}
      </div>

      <div className={`step ${step2 ? 'active' : 'disabled'}`}>
        {step2 ? (
          <Link to='/shipping'>Livraison</Link>
        ) : (
          <span>Livraison</span>
        )}
      </div>

      <div className={`step ${step3 ? 'active' : 'disabled'}`}>
        {step3 ? (
          <Link to='/payment'>Paiment</Link>
        ) : (
          <span>Paiment</span>
        )}
      </div>

      <div className={`step ${step4 ? 'active' : 'disabled'}`}>
        {step4 ? (
          <Link to='/placeorder'>Commande</Link>
        ) : (
          <span>Commande</span>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
