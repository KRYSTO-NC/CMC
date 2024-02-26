import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSubCategoryDetailsQuery } from '../../../slices/subCategoriesApiSlice'
import Loader from '../../../components/shared/loader/Loader'
import ProductCards from '../../../components/products/ProductCards'
import MiniCardProduct from '../../../components/miniCardProduct/MiniCardProduct'

const AdminSubCategories = () => {
  const { id } = useParams()

  const { data, isLoading, isError, refetch } = useGetSubCategoryDetailsQuery(
    id,
  )

  return (
    <div className="page-container">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error: {isError?.data?.message}</div>
      ) : (
        <>
          <div className="heading">
            <h1>{data.name}</h1>
            <p>Cette sous-catégorie contient {data.products.length} produits</p>
          </div>
<div className="flex-container">

          {data.products.map((product) => (
            <div key={product._id}>
              <MiniCardProduct product={product} />
            </div>
          ))}
          </div>
        </>
      )}
    </div>
  )
}

export default AdminSubCategories
