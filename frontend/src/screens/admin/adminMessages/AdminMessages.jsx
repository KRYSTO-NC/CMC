import React from 'react'
import { useGetMessagesQuery } from '../../../slices/messagesApiSlice'
import Loader from '../../../components/shared/loader/Loader'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AdminMessages = () => {
  const { data: messages, isLoading, isError } = useGetMessagesQuery()

  console.log(messages)
  return (
    <div className="page-container">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Une erreur est survenue</p>
      ) : (
        <div>
          <h1>Commandes ({messages?.length})</h1>
          {messages.length === 0 ? (
            <p className="red-info">Aucun messages</p>
          ) : (
            <table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Produit</th>
                  <th>Utilisateur</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Pro</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message._id}>
                    <td>{message.status}</td>
                    <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                    <td>
                      {' '}
                      <Link
                        target="_blank"
                        to={`/product/${message.product._id}`}
                      >
                        {message.product.numMail}{' '}
                      </Link>{' '}
                    </td>
                    <td>{message.user.name}</td>
                    <td>{message.user.email}</td>
                    <td>{message.phone}</td>
                    <td>
                      {message.isProfessional ? (
                        <FaCheck style={{ color: 'green' }} />
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <Link to={`/admin/message/${message._id}`}>
                        <button variant="light" className="btn-sm">
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
  )
}

export default AdminMessages
