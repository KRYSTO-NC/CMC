import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../../slices/productsApiSlice'
import { useGetCategoriesQuery } from '../../../slices/categoriesSlice'
import { useGetSubCategoriesByCategoryQuery } from '../../../slices/subCategoriesApiSlice'

const AdminProductEditScreen = () => {
  const { id: productId } = useParams()
  const { data: categories } = useGetCategoriesQuery()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState(false)

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId)

  const {
    data: subcategoriesData,
    error: subcategoriesError,
    refetch: refetchSubcategories,
  } = useGetSubCategoriesByCategoryQuery(selectedCategory)

  const [
    updateProduct,
    { isLoading: updateMutationLoading },
  ] = useUpdateProductMutation()

  const [
    uploadProductImage,
    { isLoading: uploadMutationLoading },
  ] = useUploadProductImageMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [numMail, setNumMail] = useState('')
  const [price, setPrice] = useState(0)
  const [imagesArray, setImagesArray] = useState([])
  const [url, setUrl] = useState('')
  const [brand, setBrand] = useState('')
  const [subcategorySelected, setSubcategorySelected] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const [keywords, setKeywords] = useState([''])
  const [options, setOptions] = useState([{ name: '', value: '' }])

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options]
    newOptions[index][field] = value
    setOptions(newOptions)
  }

  const handleKeywordChange = (index, value) => {
    const newKeywords = [...keywords]
    newKeywords[index] = value
    setKeywords(newKeywords)
  }

  const addKeyword = () => {
    setKeywords([...keywords, ''])
  }

  const removeKeyword = (index) => {
    const newKeywords = [...keywords]
    newKeywords.splice(index, 1)
    setKeywords(newKeywords)
  }

  const addOption = () => {
    setOptions([...options, { name: '', value: '' }])
  }

  const removeOption = (index) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoadingUpdate(true)

      await updateProduct({
        productId,
        name,
        numMail,
        url,
        price,
        images: imagesArray,
        brand,
        category: selectedCategory,
        subCategory: subcategorySelected,
        countInStock,
        description,
        options,
      }).unwrap()

      toast.success('Le produit a été mis à jour avec succès')
      refetch()
      navigate('/admin/products')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    } finally {
      setLoadingUpdate(false)
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('images', e.target.files[0])

    try {
      setLoadingUpload(true)
      const res = await uploadProductImage(formData).unwrap()
      setImagesArray((prevImages) => [...prevImages, ...res.images])

     
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    } finally {
      setLoadingUpload(false)
    }
  }

  const removeImage = (index) => {
    const newImagesArray = [...imagesArray]
    newImagesArray.splice(index, 1)
    setImagesArray(newImagesArray)
  }
  useEffect(() => {
   
    setName(product?.name || '')
    setNumMail(product?.numMail || '')
    setPrice(product?.price || 0)
    setImagesArray(product?.images || [])
    setBrand(product?.brand || '')
    setSelectedCategory(product?.category || '')
    setSubcategorySelected(product?.subCategory || '')
    setCountInStock(product?.countInStock || 0)
    setDescription(product?.description || '')
    setUrl(product?.url || '')
    setOptions(product?.options || [])
  }, [product])

  return (
    <>
      <Link to="/admin/products" className="btn btn-sm">
        Retour
      </Link>
      <section>
        <h1 style={{ marginBottom: '1rem' }}>Edit Product</h1>
        {loadingUpdate && <p>Loading...</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div variant="danger">{error.data.message}</div>
        ) : (
          <form className="form" onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Nom:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="numMail">Numéro de mail:</label>
              <input
                type="text"
                id="numMail"
                placeholder="Entrer le numero de mail"
                value={numMail}
                onChange={(e) => setNumMail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">liens</label>
              <input
                type="text"
                id="url"
                placeholder="Entrer le liens Web"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Prix:</label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="images">Images:</label>
              {imagesArray.map((image, index) => (
                <div key={index} className="image-input">
                  <img src={image} alt={`Image ${index + 1}`} />
                  <button
                    type="button"
                    className="btn btn-remove-image"
                    onClick={() => removeImage(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <input
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
              />
              {loadingUpload && product && <p>Loading...</p>}
            </div>
            <div className="form-group">
              <label htmlFor="brand">Marque:</label>
              <input
                type="text"
                id="brand"
                placeholder="Entrer un marque"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="countInStock">Nombre d'articles en Stock:</label>
              <input
                type="number"
                id="countInStock"
                placeholder="Entrer le nombre d'articles en stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            {selectedCategory !== '' && (
              <div className="form-group">
                <label htmlFor="subcategory">Sous-catégorie:</label>
                <select
                  value={subcategorySelected._id}
                  onChange={(e) => setSubcategorySelected(e.target.value)}
                >
                  <option value="">Select Subcategory</option>
                  {subcategoriesData &&
                    subcategoriesData.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <h3>Options:</h3>
              {options.map((option, index) => (
                <div key={index} className="option-input">
                  <label htmlFor="name">Titre</label>
                  <input
                    type="text"
                    placeholder={`Option ${index + 1} Name`}
                    value={option.name}
                    onChange={(e) =>
                      handleOptionChange(index, 'name', e.target.value)
                    }
                  />
                  <label htmlFor="value">Valeur</label>
                  <input
                    type="text"
                    placeholder={`Option ${index + 1} Value`}
                    value={option.value}
                    onChange={(e) =>
                      handleOptionChange(index, 'value', e.target.value)
                    }
                  />

                  <button
                    type="button"
                    style={{ background: 'red' }}
                    className="btn btn-remove-option btn-sm"
                    onClick={() => removeOption(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-add-option"
                onClick={addOption}
              >
                Ajouter une option
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="keywords">Mots-clés:</label>
              {keywords.map((keyword, index) => (
                <div key={index} className="keyword-input">
                  <input
                    type="text"
                    placeholder={`Mot clef ${index + 1}`}
                    value={keyword}
                    onChange={(e) => handleKeywordChange(index, e.target.value)}
                  />
                  
                    <button
                      type="button"
                      style={{ background: 'red' }}
                      className="btn btn-remove-keyword btn-sm"
                      onClick={() => removeKeyword(index)}
                    >
                      <FaTimes />
                    </button>
               
                </div>
              ))}
              <button
                type="button"
                className="btn btn-add-keyword"
                onClick={addKeyword}
              >
                Ajouter un mot-clé
              </button>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Mettre a jour
            </button>
          </form>
        )}
      </section>
    </>
  )
}

export default AdminProductEditScreen
