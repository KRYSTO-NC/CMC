import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setCredentials } from '../../slices/authSlice'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useRegisterMutation } from '../../slices/userApiSlice'
import Message from '../../components/shared/message/Message'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isProfessional, setIsProfessional] = useState(false) // Ajout de l'état pour le statut professionnel
 // Ajout de l'état pour le statut business
  const [billingAddress, setBillingAddress] = useState('') // Ajout de l'état pour l'adresse de facturation
  const [ridet, setRidet] = useState('') // Ajout de l'état pour le champ ridet

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      <Message messageTitle={"Oups une Erreur !"} messageTxt={"Les mots de passe ne correspondent pas, merci de réessayer !!"}/>

     
      toast.error('Les mots de passe ne coresspoipnde pas !')
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate(redirect)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> S'inscrire
        </h1>
        <p>Créer un compte Sur Calédonie Moins Cher</p>
      </section>
      <section className="form">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Nom <span>*</span> </label>
            <input
              type="text"
              id="name"
              placeholder="Entrer votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email <span>*</span> </label>
            <input
              type="email"
              id="email"
              placeholder="Entrer votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group checkbox">
            <label htmlFor="isProfessional">Êtes-vous un professionnel ?</label>
            <input
              type="checkbox"
              id="isProfessional"
              checked={isProfessional}
              onChange={() => setIsProfessional(!isProfessional)}
            />
          </div>

          {isProfessional === true ? (
            <>
              <div className="form-group">
                <label htmlFor="ridet">Ridet</label>
                <input
                  type="text"
                  id="ridet"
                  placeholder="Entrer votre RIDET"
                  value={ridet}
                  onChange={(e) => setRidet(e.target.value)}
                  
                />
              </div>
              <div className="form-group">
                <label htmlFor="billingAddress">Adresse de facturation</label>
                <input
                  type="text"
                  id="billingAddress"
                  placeholder="Entrer votre adresse de facturation"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
               
                />
              </div>
            </>
          ) : (
            ''
          )}
          <div className="form-group">
            <label htmlFor="password">Mot de passe <span>*</span> </label>
            <input
              type="password"
              id="password"
              placeholder="Entrer votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe <span>*</span> </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmer votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn-block btn"
              disabled={isLoading}
            >
              S'inscrire
            </button>
          </div>
          <div className="form-group">
            <p>
              Vous avez déjà un compte?{' '}
              <Link className="link" to={`/login?redirect=${redirect}`}>
                Connectez-vous
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  )
}

export default RegisterScreen
