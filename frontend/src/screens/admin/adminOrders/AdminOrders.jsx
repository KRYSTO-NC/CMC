import React from 'react';
import { useGetOrdersQuery } from '../../../slices/ordersApiSlice';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  console.log('====================================');
  console.log(orders);
  console.log('====================================');

  return (
    <div className='page-container'>
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Une erreur est survenue</p>
      ) : (
        <div>
          <h1>Commandes ({orders?.length})</h1>
          {orders.length === 0 ? (
            <p className='red-info' >Aucune commande</p>
          ) : (
            <table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paiement</th>
              <th>Livraison</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}XPF</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button variant='light' className='btn-sm'>
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
