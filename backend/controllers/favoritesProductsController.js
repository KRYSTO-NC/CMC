import asyncHandler from '../middleware/asyncHandler.js'
import FavoriteProduct from '../models/favoriteProduct.js'

// @desc    Get all favorite products
// @route   GET /api/favoriteProducts
// @access  Public
const getFavoriteProducts = asyncHandler(async (req, res) => {
  const favoriteProducts = await FavoriteProduct.find().populate(
    'products userId',
  )
  res.json(favoriteProducts)
})

// @desc    Get single favorite product by ID
// @route   GET /api/favoriteProducts/:id
// @access  Public
const getFavoriteProductById = asyncHandler(async (req, res) => {
  const favoriteProduct = await FavoriteProduct.findById(req.params.id)
  if (favoriteProduct) {
    res.json(favoriteProduct)
  } else {
    res.status(404)
    throw new Error('Favorite product not found')
  }
})

const createFavoriteProduct = asyncHandler(async (req, res) => {
  const { userId, products } = req.body

  // Vérifier si l'utilisateur a déjà le même produit dans sa liste
  const existingFavoriteProduct = await FavoriteProduct.findOne({
    userId,
    products,
  })

  if (existingFavoriteProduct) {
    // Si le favori existe déjà, renvoyez un message ou une réponse indiquant que le produit est déjà dans la liste
    return res
      .status(400)
      .json({ message: 'Le produit est déjà dans la liste des favoris' })
  }

  // Si le favori n'existe pas, créez-le
  const favoriteProduct = new FavoriteProduct({
    userId,
    products,
  })

  const createdFavoriteProduct = await favoriteProduct.save()
  res.status(201).json(createdFavoriteProduct)
})

// @desc    Update a favorite product
// @route   PUT /api/favoriteProducts/:id
// @access  Private
const updateFavoriteProduct = asyncHandler(async (req, res) => {
  const { userId, products } = req.body

  const favoriteProduct = await FavoriteProduct.findById(req.params.id)
  if (favoriteProduct) {
    favoriteProduct.userId = userId || favoriteProduct.userId
    favoriteProduct.products = products || favoriteProduct.products

    const updatedFavoriteProduct = await favoriteProduct.save()
    res.json(updatedFavoriteProduct)
  } else {
    res.status(404)
    throw new Error('Favorite product not found')
  }
})

// @desc    Delete a favorite product
// @route   DELETE /api/favoriteProducts/:id
// @access  Private
const deleteFavoriteProduct = asyncHandler(async (req, res) => {
  const result = await FavoriteProduct.findByIdAndDelete(req.params.id)
  if (result) {
    res.json({ message: 'Favorite product removed' })
  } else {
    res.status(404).json({ error: 'Favorite product not found' })
  }
})

export {
  getFavoriteProducts,
  getFavoriteProductById,
  createFavoriteProduct,
  updateFavoriteProduct,
  deleteFavoriteProduct,
}
