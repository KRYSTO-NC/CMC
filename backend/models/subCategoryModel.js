import mongoose from 'mongoose'

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    // Ajoutez d'autres champs spécifiques à votre modèle de sous-catégorie si nécessaire
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// REVERSE POPULATE WITH VIRTUALS
subCategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'subCategory',
  justOne: false,
})

const SubCategory = mongoose.model('SubCategory', subCategorySchema)

export default SubCategory
