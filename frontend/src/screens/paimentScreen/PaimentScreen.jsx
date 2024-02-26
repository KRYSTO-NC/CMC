import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import { savePaymentMethod } from '../../slices/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className='page-container'>
      <CheckoutSteps step1 step2 step3 />
      <h1>Methode de paiment</h1>
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label>Selectioner une méthode</label>
          <div>
            <input
              type='radio'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='PayPal'>PayPal or Credit Card</label>
          </div>
        </div>

        <button className='btn btn-block' type='submit'>Continuer</button>
      </form>
    </div>
  );
};

export default PaymentScreen;
