import express from 'express';
const router = express.Router();
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  getSubCategoriesByCategory,
} from '../controllers/subCategoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getSubCategories).post(protect, admin, createSubCategory);

router
  .route('/:id')
  .get(checkObjectId, getSubCategoryById)
  .post(protect, admin, createSubCategory) // Ajoutez la virgule ici
  .put(protect, admin, checkObjectId, updateSubCategory)
  .delete(protect, admin, checkObjectId, deleteSubCategory);

// Ajoutez la nouvelle route
router.route('/category/:categoryId').get(getSubCategoriesByCategory);

export default router;
