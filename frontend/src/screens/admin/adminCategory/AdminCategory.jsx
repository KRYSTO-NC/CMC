import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetSubCategoriesByCategoryQuery,
  useCreateSubCategoryMutation,
} from '../../../slices/subCategoriesApiSlice';
import { useGetCategoryDetailsQuery } from '../../../slices/categoriesSlice';
import SubCategoryCard from '../../../components/subCategoryCard/SubCategoryCard';
import './adminCategory.css'
import Modal from '../../../components/shared/modal/Modal';
const AdminCategory = () => {
  const { id } = useParams();
  console.log('====================================');
  console.log(id);
  console.log('====================================');
  const { data: categoryDetails, error: categoryError } = useGetCategoryDetailsQuery(id);
  const { data: subcategories, error: subcategoriesError, refetch: refetchSubcategories } = useGetSubCategoriesByCategoryQuery(id);


  const [newSubCategory, setNewSubCategory] = useState({
    name: '',
    description: '',
    category: categoryDetails && categoryDetails._id ? categoryDetails._id : '', // Utiliser l'ID de la catégorie pour créer une sous-catégorie
  });
  

  const [createSubCategory, { isLoading: creatingSubCategory }] = useCreateSubCategoryMutation();
  const handleCreateSubCategory = async () => {
    try {
      const trimmedName = newSubCategory.name.trim();
      const trimmedDescription = newSubCategory.description.trim();
  
      // Vérifier si le nom et la description sont définis
      if (!trimmedName || !trimmedDescription) {
        console.error('Name and description are required for creating a subcategory.');
        return;
      }
  
      // Vérifier si la catégorie est également définie
      if (!newSubCategory.category) {
        console.error('Category is required for creating a subcategory.');
        return;
      }
  
      const { data: createdSubCategory, error } = await createSubCategory({
        name: trimmedName,
        description: trimmedDescription,
        category: newSubCategory.category,
      });
  
      if (createdSubCategory) {
        console.log('Subcategory created successfully:', createdSubCategory);
        setNewSubCategory({
          name: '',
          description: '',
          category: categoryDetails && categoryDetails._id ? categoryDetails._id : '',
        });
  
        // Rafraîchir la liste des sous-catégories après la création
        refetchSubcategories();
      } else if (error) {
        console.error('Error creating subcategory:', error);
      }
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };
  

  useEffect(() => {
    if (categoryDetails && categoryDetails._id) {
      setNewSubCategory((prev) => ({
        ...prev,
        category: categoryDetails._id,
      }));
    }
  }, [categoryDetails]);

  useEffect(() => {
    if (subcategories) {
      console.log('Subcategories:', subcategories);
    }
  }, [subcategories]);
if (!categoryDetails) {
    return <p>Loading...</p>;
} else
  return (
    <div className='page-container'>
      <section className="heading">
        <h2>Catégorie : {categoryDetails?.name}</h2>
        <p>{categoryDetails?.description}</p>
      </section>
     
      {categoryError && <p>Error fetching category: {categoryError.message}</p>}
      {subcategoriesError && <p>Error fetching subcategories: {subcategoriesError.message}</p>}
<Modal modalBtn={"Ajouter une sous-catégorie"}>

      <div>
        <h3>Ajouter une sous-catégorie</h3>
        <form className='form' onSubmit={(e) => e.preventDefault()}>
         
         <div className="form-group">

          <label>Nom:
            <input
              type="text"
              value={newSubCategory.name}
              onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}
              />
          </label>
              </div>
              <div className="form-group">

          <label>Description:
            <input
              type="text"
              value={newSubCategory.description}
              onChange={(e) => setNewSubCategory({ ...newSubCategory, description: e.target.value })}
              />
          </label>
              </div>
          <button className='btn btn-block' onClick={handleCreateSubCategory} disabled={creatingSubCategory}>
            Ajouter
          </button>
        </form>
      </div>
      </Modal>

      {subcategories && (
        <div>
          <h3>Sous-catégories</h3>
          <div className='subCategoryCard-container'>
            {subcategories.map((subcategory) => (
              <SubCategoryCard key={subcategory._id} subcategory={subcategory} />
              ))}
          </div>
        </div>
      )}


      
    </div>
  );
};

export default AdminCategory;
