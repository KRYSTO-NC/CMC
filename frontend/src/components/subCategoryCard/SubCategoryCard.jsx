import { Link } from 'react-router-dom'
import './subCategory.css'

const SubCategoryCard = ({subcategory}) => {
  return (
    <Link to={`/admin/sub-category/${subcategory._id}`} className='subCategoryCard'>
        <p>{subcategory.name}</p>
    </Link>
  )
}

export default SubCategoryCard