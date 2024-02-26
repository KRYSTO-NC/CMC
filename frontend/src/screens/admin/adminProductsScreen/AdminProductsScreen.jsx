
import { useParams, Link } from 'react-router-dom';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation } from '../../../slices/productsApiSlice';
import { toast } from 'react-toastify';

import './adminProduct.css'
import Paginate from '../../../components/utils/Paginate';
import Loader from '../../../components/shared/loader/Loader';

const AdminProductsScreen = () => {




  const { pageNumber, keyword } = useParams();

    const { data, isLoading, error, refetch } = useGetProductsQuery({
      keyword,
      pageNumber,
    });

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Etes vous sur de vouloir ajouter un nouveau produit ?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };



  return (
    <div className='page-container'>
      <div>
        <h1>Produits ({data?.products?.length})</h1>
      </div>
      <div>
        <button className='btn' onClick={createProductHandler}>
          <FaPlus /> Nouveau produit
        </button>
      </div>

      {loadingCreate && <div>Loading...</div>}
      {loadingDelete && <div>Loading...</div>}
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <div>Error: {error.data.message}</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Mail N°</th>
                <th>Nom</th>
                <th>PRIX</th>
                <th>CATEGORIE</th>
                <th>SOUS CATEGORIE</th>
                <th>MARQUE</th>
                <th>URL</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td className='td-mail' > <Link to={`/product/${product._id}`} target="_blank" > {product.numMail} </Link>  </td>
                  <td>{product.name}</td>
                  <td>XPF{product.price}</td>
                  <td>{product.category?.name}</td>
                  <td>{product.subCategory?.name}</td>
                  <td>{product.brand}</td>
                  <td>    <a href={product.url}> <FaEye style={{color:'green'}}/></a> </td>
                  <td>
                    <Link  style={{ color: 'orange' }} to={`/admin/product-edit/${product._id}`}>
                      <FaEdit />
                    </Link>
                    <button onClick={() => deleteHandler(product._id)}>
                      <FaTrash style={{ color: 'red' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default AdminProductsScreen;
