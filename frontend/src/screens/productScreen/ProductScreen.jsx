import { useParams } from 'react-router-dom'
import './productScreen.css'
import { useGetProductDetailsQuery } from '../../slices/productsApiSlice'
import Loader from '../../components/shared/loader/Loader'
import Message from '../../components/shared/message/Message'
import Slider from '../../components/shared/slider/Slider'

const ProductScreen = () => {
  const { id } = useParams()
  const { data: product, isError, isLoading } = useGetProductDetailsQuery(id)
  console.log('====================================')
  console.log(product)
  console.log('====================================')
  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <Message
        messageTitle={'OUPS !'}
        messageTxt={
          "Une erreur c'est produite pendant le chargement du produit."
        }
      />
    )
  }

  if (!product) {
    return (
      <Message
        messageTitle={'OUPS !'}
        messageTxt={"Le produit demandé n'a pas été trouvé."}
      />
    )
  }

  return (
    <div className="page-container">
      <div className="product-header">
       
          {/* Utilisez une boucle map pour afficher toutes les images du tableau */}

          <Slider product={product} />
          
       
      
      </div>
    </div>
  )
}

export default ProductScreen
