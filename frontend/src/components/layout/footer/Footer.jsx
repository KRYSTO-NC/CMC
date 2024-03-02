import './footer.css'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaPinterest, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">
        <div className="row">
          <div className="footer-col">
            <h4>À propos</h4>
            <ul>
              <li><Link to={'/about'}>Notre entreprise</Link></li>
              {/* <li><a href="#!">A propos</a></li>
              <li><a href="#!">Nos services</a></li>
              <li><a href="#!">Politique de confidentialité</a></li> */}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Liens</h4>
            <ul>
              <li><Link to={'/about'}>Obtenir de l'aide</Link></li>
              <li><Link to={'/faq'}>FAQ</Link></li>
              {/* <li><a href="#!">Livraisons</a></li>
              <li><a href="#!">Retours</a></li>
              <li><a href="#!">Commandes</a></li> */}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Légal</h4>
            <ul>
              <li><Link to={'/mentions-legales'}>Mentions légales</Link></li>
              <li><Link to={'/cgv'}>CGV</Link></li>
              <li><Link to={'/cgu'}>CGU</Link></li>
   

            </ul>
          </div>
          <div className="footer-col">
            <h4>Suivez-nous sur les réseaux</h4>
           <div className="social-links">
              <Link target='_blank' to={"https://www.facebook.com/profile.php?id=61556216258230"}><FaFacebook/></Link>
              {/* <a href="#!"><FaInstagram/></a>
              <a href="#!"><FaTwitter/></a>
              <a href="#!"><FaLinkedinIn/></a> */}
           </div>
          </div>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer