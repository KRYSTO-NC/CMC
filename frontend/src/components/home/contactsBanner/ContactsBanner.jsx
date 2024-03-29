import  { useState } from 'react'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import Modal from '../../shared/modal/Modal';
import { Link } from 'react-router-dom';


const ContactsBanner = () => {
    const [isProfessional, setIsProfessional] = useState(false);
    const [ridet, setRidet] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const formatPhoneNumber = (input) => {
        const numericInput = input.replace(/\D/g, '');
        
        // Ajouter le premier point après deux chiffres
        let formattedValue = numericInput.replace(/^(\d{2})/, '$1.');
    
        // Ajouter un point après chaque paire de chiffres subséquente
        formattedValue = formattedValue.replace(/(\d{2})(?=\d)/g, '$1.');
    
        return formattedValue;
      };
    
      const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatPhoneNumber(inputValue);
        setPhoneNumber(formattedValue);
      };
    
      const handlePhoneFocus = (e) => {
        // Ajouter le premier point dès que le champ de saisie reçoit le focus
        if (!phoneNumber) {
          setPhoneNumber('.');
        }
      };
  return (
    <>
    
    <div className="contact-container">
        <div className="contact-header">
          <h2>
            Vous avez une question ? Besoins de détails sur un de nos produits ?
          </h2>
          <h3>Contactez-nous, Pour toute demande nous vous repondant enntre 24 et 48H</h3>
        </div>
        <div className="contacts">
          <div className="btn-reverse">
            <a href="mailto: caledoniemoinscher@gmail.com">
              <FaEnvelope/>
              caledoniemoinscher@gmail.com
            </a>
          </div>
          <div className="btn-reverse">
            <FaPhone/>
            <a href="tel: (+687)71.99.27">(+687) 71.99.27</a>
          </div>
          <div className="contact phone">
            <Modal modalBtn={"Laissez nous un message"} >
              <h3>Nous envoyer un message</h3>
              <p>Pour toute demande nous vous repondant entre 24 et 48H</p>
          <div className="form">
          <form >
          <div className="form-group">
            <label htmlFor="name">Nom <span>*</span> </label>
            <input
              type="text"
              id="name"
              placeholder="Entrer votre nom"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              required
              />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email <span>*</span> </label>
            <input
              type="email"
              id="email"
              placeholder="Entrer votre email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
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
            <label htmlFor="phoneNumber">Numéro de téléphone</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Entrez votre numéro de téléphone"
              value={phoneNumber}
              onChange={handlePhoneChange}
              onFocus={handlePhoneFocus}
              />
          </div>
            </>
          ) : (
            ''
            )} 

          <div className="form-group">
            <label htmlFor="Votre Message">Votre message</label>
            <textarea></textarea>
          </div>
        
          <div className="form-group">
            <button
              type="submit"
              className="btn-block btn"
              // disabled={isLoading}
              >
              ENVOYER
            </button>
          </div>
          <div className="form-group">
            <p>
             
              <Link className="link" to={`register`}>
               créer un compte 
              </Link>
            </p>
          </div>
        </form>
       
          </div>
          
            </Modal>
          </div>
        </div>
      </div>

    
    
    </>
  )
}

export default ContactsBanner