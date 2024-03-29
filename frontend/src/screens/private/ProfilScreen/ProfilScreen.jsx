import React from 'react';
import { useSelector } from 'react-redux';

import Message from '../../../components/shared/message/Message';
import Loader from '../../../components/shared/loader/Loader';
import { useGetUserDetailsQuery } from '../../../slices/userApiSlice';

const ProfilScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: profil, isLoading, error } = useGetUserDetailsQuery(userInfo._id);



  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error || !profil ? (
            <Message
              messageTitle={"Oups !"}
              messageTxt={"Une erreur s'est produite lors du chargement du profil."}
            />
          ) : (
            <>
              <div className="page-container">
                <div className="heading">
                  <h2> Bienvenue sur votre Profil {profil.name}</h2>
                  <p>Vous pouvez depuis cette page modifier les informations vous concernant</p>
                </div>

                

                <h2>{profil.name}</h2>
                <p>Email: {profil.email}</p>
               
              <button className='btn btn-block' style={{background:"red"}}>Supprimer mon compte</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilScreen;
