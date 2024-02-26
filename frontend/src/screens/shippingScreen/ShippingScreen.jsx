import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CheckoutSteps from '../../components/CheckoutSteps';
import { saveShippingAddress } from '../../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <>
    <div className="page-container">

      <CheckoutSteps step1 step2 />
      <h1>Adresse de livraison</h1>
      <form className='form' onSubmit={submitHandler}>
        <div className="form-group">
            <label htmlFor="address">Adresse</label>
            <input type="text" id="address" placeholder="Entrer votre adresse" value={address} onChange={(e) => setAddress(e.target.value)} required/>
        </div>
        <div className="form-group">
            <label htmlFor="city">Ville</label>
            <input type="text" id="city" placeholder="Entrer votre ville" value={city} onChange={(e) => setCity(e.target.value)} required/>
        </div>
        <div className="form-group">
            <label htmlFor="postalCode">Code postal</label>
            <input type="text" id="postalCode" placeholder="Entrer votre code postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required/>
        </div>
        <div className="form-group">
            <label htmlFor="country">Pays</label>
            <input type="text" id="country" placeholder="Entrer votre pays" value={country} onChange={(e) => setCountry(e.target.value)} required/>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-block">
                Continuer
            </button>
        </div>

        
      </form>
    </div>
    </>
  );
};

export default ShippingScreen;
