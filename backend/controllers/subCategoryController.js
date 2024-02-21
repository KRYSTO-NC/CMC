import asyncHandler from '../middleware/asyncHandler.js'
import SubCategory from '../models/subCategoryModel.js'

// @desc    Fetch all subcategories
// @route   GET /api/subcategories
// @access  Public
const getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.find({}).populate('products') // Utilisez populate pour obtenir les détails de la catégorie associée
  res.json(subCategories)
})

// @desc    Fetch single subcategory
// @route   GET /api/subcategories/:id
// @access  Public
const getSubCategoryById = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id).populate(
    'products',
  )
  if (subCategory) {
    res.json(subCategory)
  } else {
    res.status(404)
    throw new Error('Ressource non trouvée')
  }
})

// @desc    Fetch subcategories by category
// @route   GET /api/subcategories/category/:categoryId
// @access  Public
const getSubCategoriesByCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId
  const subCategories = await SubCategory.find({
    category: categoryId,
  }).populate('category', 'name')
  res.json(subCategories)
})

// @desc    Create a subcategory
// @route   POST /api/subcategories
// @access  Private/Admin
const createSubCategory = asyncHandler(async (req, res) => {
  const { name, description, category } = req.body

  const subCategory = new SubCategory({
    name,
    description,
    category,
  })

  const createdSubCategory = await subCategory.save()
  res.status(201).json(createdSubCategory)
})

// @desc    Update a subcategory
// @route   PUT /api/subcategories/:id
// @access  Private/Admin
const updateSubCategory = asyncHandler(async (req, res) => {
  const { name, description, category } = req.body

  const subCategory = await SubCategory.findById(req.params.id)

  if (subCategory) {
    subCategory.name = name
    subCategory.description = description
    subCategory.category = category

    const updatedSubCategory = await subCategory.save()
    res.json(updatedSubCategory)
  } else {
    res.status(404)
    throw new Error('Sous-catégorie non trouvée')
  }
})

// @desc    Delete a subcategory
// @route   DELETE /api/subcategories/:id
// @access  Private/Admin
const deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id)

  if (subCategory) {
    await SubCategory.deleteOne({ _id: subCategory._id })
    res.json({ message: 'Sous-catégorie supprimée' })
  } else {
    res.status(404)
    throw new Error('Sous-catégorie non trouvée')
  }
})

export {
  getSubCategories,
  getSubCategoryById,
  getSubCategoriesByCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
}
