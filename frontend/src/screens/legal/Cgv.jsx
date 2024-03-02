import React from 'react'
import { Link } from 'react-router-dom'

const Cgv = () => {
  return (
    <div className="page-container">
      <div className="heading">
        <h1>Conditions géneral de ventes</h1>
      </div>

      <p>
        Les conditions générales de vente (CGV) encadrent les relations
        commerciales. Elles informent vos clients, de manière lisible et
        compréhensible, de leurs droits et obligations lors de la vente de vos
        produits et/ou de vos services. Cette obligation de transparence permet
        de réduire considérablement le risque de litige entre vos clients et
        vous-même. Le caractère obligatoire et le contenu des conditions
        générales de vente varient selon que votre offre de biens ou de services
        est adressée à des particuliers ou à des professionnels.
      </p>

      <h2>Les mentions obligatoires des CGV</h2>
      <h3>
        Clients particuliers :
      </h3>
      <p>
      Les CGV doivent figurer obligatoirement sur votre site internet.
      </p>
      <p>
      Le non-respect de cette obligation d'information est puni de 3 000 € d'amende pour l'entreprise individuelle (dont micro-entrepreneur) et 15 000 € pour une société (SARL, SA, SAS, etc.).
      </p>
      <h5>
      Les conditions générales de vente doivent contenir les informations suivantes :
      </h5>
      <ul>
        <li>Caractéristiques essentielles des biens et/ou services</li>
        <li>Prix TTC: TTC : Toutes taxes comprises en XPF</li>
        <li>Frais, date et modalités de livraison</li>
        <li>Modalités d'exécution du contrat</li>
        <li>Modalités de paiement : modes de paiement autorisés et question du retard de paiement.</li>
        <li>Droit de rétractation : délai et conditions pour annuler et renvoyer la commande.</li>
        <li>Garantie légale de conformité: titleContent et garantie des vices cachés</li>
        <li>Garantie commerciale et service après vente : coût de la communication à distance</li>
        <li>Durée du contrat et conditions de résiliation, s'il y a lieu</li>
        <li>Caution ou garantie à fournir par le client, s'il y a lieu</li>
        <li>Durée minimale des obligations contractuelles du client, s'il y a lieu</li>
        <li>Existence d'un code de conduite applicable au contrat, s'il y a lieu</li>
        <li>Modalités de règlement des litiges : tribunal compétent et possibilité de recourir à un médiateur</li>
      </ul>
      <h6>À noter</h6>
      <i>Vous devez également fournir un lien vers la <Link to={"https://entreprendre.service-public.fr/vosdroits/R48100"} target='_blank' >plateforme européenne de règlement en ligne des litiges (RLL).</Link> </i>
       
      <h3>
        Clients professionnels : :
      </h3>
        

    <p>Entre professionnels, les CGV: CGV : Conditions générales de vente sont facultatives, mais elles doivent pouvoir être communiquées sur simple demande.</p>
     <p>
     Le refus de communication est puni de 15 000 € d'amende pour l'entreprise individuelle (dont micro-entrepreneur) et 75 000 € pour une société (SARL, SA, SAS, etc.).
     </p>
     <h5> 
     Les conditions générales de vente doivent contenir les informations suivantes :
     </h5>
     <ul>
      <li>Prix HT: HT : Hors taxes en xpf : barèmes de prix ou méthode de calcul du prix</li>
      <li>Rabais et ristourne : réductions de prix, remises promotionnelles ponctuelles et ristournes différées. Elles doivent être fixées selon des critères précis et objectifs.</li>
      <li>Escomptes commerciaux : réduction accordée à un client en cas de paiement anticipéModalités de paiement : modes de paiement autorisés et pénalités appliquées en cas de retard</li>
      <li>Frais et date de livraison</li>
      <li>Modalités de règlement des litiges : tribunal compétent</li>
     </ul>
     <p>
     Vous avez également la possibilité d'ajouter une clause de réserve de propriété: titleContent, une clause de limitation de responsabilité, une clause relative aux cas de force majeure: titleContent ou encore les conditions de résiliation du contrat.
     </p>
     <h6> À noter </h6>
     <i>Vous avez le droit d'imposer des CGV distinctes pour chaque catégorie de clients (grossistes, détaillants...). Dans ce cas, les clients d'une catégorie ne peuvent exiger la communication que des seules CGV qui les concernent.</i>
    </div>
  )
}

export default Cgv
