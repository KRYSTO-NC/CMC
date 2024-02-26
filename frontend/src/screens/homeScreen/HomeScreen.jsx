import './homeScreen.css'
import { Link } from 'react-router-dom'
import ContactsBanner from '../../components/home/contactsBanner/ContactsBanner'
import AboutSection from '../../components/home/aboutSection/AboutSection'

const HomeScreen = () => {
  return (
    <>
      <div className="home-hero">
        <div className="content">
          <h1>La Calédonie Moins cher</h1>

          <p>Sur plus de 5000 refférences</p>
          <Link to="/nos-produits" className="btn btn-outline">
            CLiquer ici pour voir nos produits
          </Link>
        </div>
      </div>

   
      <ContactsBanner />
        <AboutSection/>
    </>
  )
}

export default HomeScreen
