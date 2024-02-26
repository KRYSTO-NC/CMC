import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery, useCreateCategoryMutation } from '../../../slices/categoriesSlice';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CategoriesScreen = () => {
  const { data, isLoading, error, refetch } = useGetCategoriesQuery();

  const [createCategory, { isLoading: loadingCreate }] = useCreateCategoryMutation();

  const createCategoryHandler = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir ajouter une catégorie ?')) {
      try {
        await createCategory();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  console.log('====================================');
  console.log(data);
  console.log('====================================');

  return (
    <div className='page-container'>
      <section className="heading">
        <h1>Categories</h1>
        <p>Gestion catégories</p>
        <button className='btn' onClick={createCategoryHandler}>
          <FaPlus /> Ajouter une catégorie
        </button>
      </section>
      {loadingCreate && <p>Loading...</p>}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="categoryContainer">
          {data.map((category) => (
            <Link className='btn' to={`/admin/category/${category._id}`} key={category._id}>
              <div >
                <h3>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesScreen;
