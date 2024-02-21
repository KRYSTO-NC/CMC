import React, { useState, useEffect } from 'react';
import { useGetCategoriesQuery } from '../../slices/categoriesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

const ProductsHeaderSearch = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data, isError, isLoading } = useGetCategoriesQuery();

  useEffect(() => {
    if (keyword !== urlKeyword) {
      setKeyword(urlKeyword);
      if (urlKeyword) {
        navigate(`/search/${urlKeyword.trim()}`);
      }
    }
  }, [urlKeyword]);

  const handleSearchChange = (e) => {
    const newKeyword = e.target.value.trim();
    setKeyword(newKeyword);
    
    if (newKeyword === '') {
      // Si l'input est vide, naviguer vers la route '/nos-produits'
      navigate('/nos-produits');
    } else {
      // Sinon, déclencher la recherche automatique
      navigate(`/search/${newKeyword}`);
    }
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
  };

  return (
    <div className='header-search'>
      <div className="search-bar">
        <form>
          <input
            type="text"
            name="q"
            placeholder="Rechercher un produit..."
            value={keyword}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="category-filter">
        <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">Toutes les catégories</option>
          {Array.isArray(data) &&
            data.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default ProductsHeaderSearch;
