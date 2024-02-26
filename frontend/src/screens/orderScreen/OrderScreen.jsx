import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import Loader from '../../components/shared/loader/Loader';
import { useDelivereOrderMutation, useGetOrdersDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from '../../slices/ordersApiSlice';
import './orderScreen.css';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    error,
    isLoading,
  } = useGetOrdersDetailsQuery(orderId);
  console.log(order);
  const [payOrder, { isLoading: loadingPay}] =
    usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =useDelivereOrderMutation()

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "EUR",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Paiement effectué");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: {payer:{}} });
    refetch();
    toast.success("Paiement effectué");
  }


  function onError(error) {
    toast.error(error.message);
  }


  const orderPriceEuros = order && typeof order.totalPrice === 'number' 
  ? Number((order.totalPrice / 119.33174).toFixed(2))
  : 0;

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: orderPriceEuros,
          },
        },
      ],
    }).then((orderID) => {
      return orderID;
    });
  }

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId );
      refetch();
      toast.success("Commande livrée");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <p>{error.data.message}</p>
  ) : (
    <div className='page-container'>
      <h1>Commande n° : <strong> {order._id} </strong> </h1>
      <div>
        <div className="order-recap">

    
        <div>
          <h2>livraison</h2>
          <p>
            <strong>Nom: </strong> {order.user.name}
          </p>
          <p>
            <strong>Email: </strong>{' '}
            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
          </p>
          <p>
            <strong>Addresse:</strong>
            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          {order.isDelivered ? (
            <p classname='success'>Delivered on {order.deliveredAt}</p>
          ) : (
            <p className='danger'>Not Delivered</p>
          )}
        </div>

        <div >
          <h2>Méthode de réglement</h2>
          <p>
            <strong>Method: </strong>
            {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <p className='success' >Payer le {order.paidAt}</p>
          ) : (
            <p className='danger'>Non régler</p>
          )}
        </div>
        </div>
        <div>
          <h2>Articles</h2>
          {order.orderItems.length === 0 ? (
            <p className='danger'>Votre panier est vide</p>
          ) : (
            <div>
              {order.orderItems.map((item, index) => (
                <div className='item' key={index}>
               
                  <div className="item-info">

                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    {item.qty} x {item.price} Xpf = {item.qty * item.price} Xpf
                  </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='order-sum' >
        
        <div>
          <h2 >Recapitulatif de votre commande</h2>
          <div className='sum'>
            <div>Articles</div> 
            <div>{order.itemsPrice} XPF</div>
          </div>
          <div className='sum'>
            <div>Livraison</div>
            <div>{order.shippingPrice}  XPF</div>
          </div>
          <div className='sum'>
            <div>Taxes</div>
            <div>{order.taxPrice} XPF</div>
          </div>
          <div className='sum'>
            <div>Total</div>
            <div>{order.totalPrice} XPF</div>
          </div>
          {!order.isPaid && (
            <div>
              {loadingPay && <Loader />}

              {isPending ? (
                <Loader />
              ) : (
                <div>
                  {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                  <button
                    style={{ marginBottom: '10px' }}
                    onClick={onApproveTest}
                  >
                    Test Pay Order
                  </button>

                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                </div>
              )}
            </div>
          )}

          {loadingDeliver && <Loader />}

          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <div>
                <button
                  type='button'
                  onClick={deliverHandler}
                >
                  Marquer comme livrée
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
