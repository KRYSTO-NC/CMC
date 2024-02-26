import React from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../../components/shared/loader/Loader';
import { useGetUserDetailsQuery } from '../../../slices/userApiSlice';

const AdminUserEdit = () => {
  const { id } = useParams();

  const { data: user, isLoading, isError } = useGetUserDetailsQuery(id);
  console.log(user);

  return (
    <div className='page-container'>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error: {isError?.data?.message}</div>
      ) : (
        <div>
          <div className="heading">
            <h1>{user.name}</h1>
            <p>Utilisateur créé le {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserEdit;
