import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMessageDetailsQuery, useUpdateMessageMutation, useUpdateMessageStatusMutation } from '../../../slices/messagesApiSlice';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AdminMessage = () => {
    const { id } = useParams();

    console.log(id);

    const { data: message, isLoading, isError } = useGetMessageDetailsQuery(id);
    const [status, setStatus] = useState(message?.status || '');

    // Hook for updating the message status
    const updateMessageMutation = useUpdateMessageMutation();

    // Function to handle updating the status
    const handleUpdateStatus = async () => {
        try {
            // Call the API to update the status
            await updateMessageMutation.mutateAsync({
                messageId: id,
             status,
            });

            // Optionally, update the local state if the API returns the updated message
        } catch (error) {
            console.error('Error updating message status', error);
        }
    };

    console.log(message);

    return (
        <div className='page-container'>
            <div className="heading">
                <h1>Détails message</h1>
            </div>

            <div className="status-dropdown">
                <label htmlFor="status">Statut du message:</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="A traiter">A traiter</option>
                    <option value="En attente">En attente</option>
                    <option value="Terminé">Terminé</option>
                </select>

                {/* Add a button to trigger the status update */}
                <button onClick={handleUpdateStatus}>
                    Mettre à jour le statut
                </button>
            </div>

            <div className="message-infos">
                <div className='info'>
                    <h2>Utilisateur</h2>
                    <p>Nom: <span>{message?.user.name} </span> </p>
                    <p>Email:  <span>{message?.user.email}</span> </p>
                    <p>Téléphone: <span> {message?.phone}</span></p>
                    <p>Professionnel:  <span> {message?.isProfessional ? <FaCheck style={{color :"green"}}/> : <FaTimes  style={{color :"red"}} />} </span> </p>
                    {message?.isProfessional ?  <p>Ridet:  <span>{message.ridet} </span>  </p> : ""}
                </div>
                <div className='info'>
                    <h2>Produit</h2>

                    <p>Numéro de mail: <span>{message?.product.numMail} </span> </p>
                    <p> Nom: <span>{message?.product.name} </span> </p>
                    <p> Prix: <span> {message?.product.price} XPF </span>  </p>
                </div>
            </div>

            <div className="message-content">
                <h2>Message :</h2>
                <p>{message?.content}</p>
            </div>
        </div>
    );
};

export default AdminMessage;
