import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../../slices/productsApiSlice'
import './productsScreen.css'
import Loader from '../../components/shared/loader/Loader'
import Paginate from '../../components/utils/Paginate'
import ProductCards from '../../components/products/ProductCards'
import ProductsHeaderSearch from '../../components/products/ProductsHeaderSearch'
import Message from '../../components/shared/message/Message'
import { useGetCategoriesQuery } from '../../slices/categoriesSlice'

const ProductsScreen = () => {
  const { pageNumber, keyword } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  })
  const { data: categories, isError } = useGetCategoriesQuery()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const [showLoader, setShowLoader] = useState(true)
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value
    setSelectedCategory(newCategory)
  }

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setShowLoader(false)
    }, 1000) // 2000 milliseconds (2 seconds)

    // Cleanup function to clear the timer in case the component unmounts before the timeout
    return () => clearTimeout(loaderTimer)
  }, [])
if (isLoading) {
    return <Loader />
  }
  return (
    <div>
      <ProductsHeaderSearch />
      <div className="category-filter">
        <select
          name="category"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">Toutes les catégories</option>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      {error && (
        <Message
          messageTitle={'OUPS !'}
          messageTxt={'Une erreur est survenue merci de reesayer'}
        />
      )}
      {showLoader && <Loader />}
      {!showLoader && data && (
        <div>
          <div className="heading">
            <h2>Résultat de votre recherche</h2>
            <p>{data.products.length} Produits trouvée(s)</p>
          </div>
          <section className="card-container">
            {data.products
              .filter(
                (product) =>
                  selectedCategory === 'all' ||
                  product.category._id === selectedCategory,
              )
              .map((product) => (
                <div key={product._id}>
                  <ProductCards product={product} />
                </div>
              ))}
          </section>
          <Paginate
            pages={data.pages ? data.pages : 0}
            page={data.page ? data.page : 0}
            keyword={keyword || ''}
          />
        </div>
      )}
    </div>
  )
}

export default ProductsScreen
