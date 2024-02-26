import express from 'express'
const router = express.Router()
import {
  createFavoriteProduct,
  deleteFavoriteProduct,
  getFavoriteProducts,
  getFavoriteProductById,
  updateFavoriteProduct,
} from '../controllers/favoritesProductsController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

router.route('/').get(getFavoriteProducts).post(protect, createFavoriteProduct)

router
  .route('/:id')
  .get(checkObjectId, getFavoriteProductById)
  .put(protect, updateFavoriteProduct)
  .delete(protect, admin, deleteFavoriteProduct)

export default router
