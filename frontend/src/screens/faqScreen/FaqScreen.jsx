import React, { useState } from 'react';
import {
  FaChevronCircleDown,
  FaChevronDown,
  FaTimes,
} from 'react-icons/fa';
import './faqScreen.css';

const FaqScreen = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='container'>
      <section className="heading">
        <h1>FAQ</h1>
        <p>Foire aux questions</p>
      </section>

      <section className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq ${activeIndex === index ? 'active' : ''}`}
          >
            <h3 className="faq-title" onClick={() => toggleFaq(index)}>
              {faq.question}
            </h3>
            <p className="faq-text">{faq.answer}</p>
            <button className='faq-toggle' onClick={() => toggleFaq(index)}>
              {activeIndex === index ? <FaTimes className='times' /> : <FaChevronDown className='chevron' />}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

const faqs = [
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les paiements par carte bancaire, par chèque et par virement bancaire.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Les délais de livraison varient en fonction de la destination et du mode de livraison choisi. Pour plus d'informations, veuillez consulter notre page dédiée à la livraison.",
  },
  {
    question: "Comment retourner un article ?",
    answer: "Pour retourner un article, veuillez vous rendre"
  },
  {
    question: "Comment contacter le service client ?",
    answer: "Pour contacter notre service client, veuillez nous envoyer un e-mail à l'adresse suivante : recherchescaledoniemoinscher@gmail.com ou nous appeler au 71.99.27."
  },
  {
    question: "Comment suivre ma commande ?",
    answer: "Pour suivre votre commande, veuillez vous rendre sur la page suivre ma commande et entrer votre numéro de commande."

  },
  {
    question: "Comment utiliser un code promo ?",
    answer: "Pour utiliser un code promo, veuillez entrer le code lors de la validation de votre commande."
  },
  {
    question: "Comment créer un compte ?",
    answer: "Pour créer un compte, veuillez vous rendre sur la page d'inscription et remplir le formulaire."
  },
  {
    question: "Comment modifier mon mot de passe ?",
    answer: "Pour modifier votre mot de passe, veuillez vous rendre sur la page de connexion et cliquer sur le lien mot de passe oublié."
  },
  {
    question: "Comment supprimer mon compte ?",
    answer: "Pour supprimer votre compte, veuillez nous envoyer un e-mail à l'adresse suivante :recherchescaledoniemoinscher@gmail.com"
  },
  {
    question: "Comment contacter le service client ?",
    answer: "Pour contacter notre service client, veuillez nous envoyer un e-mail à l'adresse suivante :recherchescaledoniemoinscher@gmail.com ou par tèlèphone au 71.99.27."
  },
  
];

export default FaqScreen;
