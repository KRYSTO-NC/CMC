import './aboutSection.css';
import shipping from '../../../assets/images/shipping_choice.jpg';
import quality  from '../../../assets/images/quality_products.jpeg';
import price from '../../../assets/images/best_price.jpeg';

const AboutSection = () => {
  return (
    <section>
        <h2 className='titre-section-info'>Tous vos produits aux meilleur prix</h2>
       <div className='section-info'>
        <div className="carte-info">
            <div className="container-info">
                <img src={quality} alt="un client ouvrant un produit de qualité" />
                <h2>Des produits de qualité</h2>
                <p>
                    Nous vous proposons des produits de qualité, provenant des
                    meilleurs fournisseurs. Nous sommes déterminés à vous offrir
                    l'objet de vos rêves.
                </p>
            </div>
        </div>
        <div className="carte-info">
            <div className="container-info">
                <img src={price} alt="Un client choisisant le meilleur prix" />
                <h2>Des prix imbattables</h2>
                <p>
                    Grâce à notre réseau étendu de fournisseurs à travers le
                    monde, nous sommes déterminés à vous offrir l'objet de vos
                    rêves.
                </p>
            </div>
            </div>
            <div className="carte-info">
                <div className="container-info">
                <img src={shipping} alt="d'un transport en bateaux ou en avion cargo" />
                    <h2>Une livraison a votre rythme</h2>
                    <p>
                   Par avion ou par bateau, nous vous livrons vos produits dans les meilleurs délais.
                    </p>
                </div>
      

       </div>
    </div>
    </section>
  )
}

export default AboutSection