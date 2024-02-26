import mongoose from 'mongoose'

const favoriteProductSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Assurez-vous que 'User' est le modèle utilisateur approprié
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Assurez-vous que 'Product' est le modèle de produit approprié
    },

    // Ajoutez d'autres champs spécifiques à votre modèle de sous-catégorie si nécessaire
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

const FavoriteProduct = mongoose.model('FavoriteProduct', favoriteProductSchema)

export default FavoriteProduct
