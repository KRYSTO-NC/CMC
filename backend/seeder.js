import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import categories from './data/categories.js'
import subCategories from './data/subCategories.js'
import messages from './data/messages.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Category from './models/categoryModel.js'
import SubCategory from './models/subCategoryModel.js'
import Order from './models/orderModel.js'
import Message from './models/messageSchema.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Message.deleteMany()
    await Category.deleteMany()
    await SubCategory.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Message.insertMany(messages)
    await Category.insertMany(categories)
    await SubCategory.insertMany(subCategories)
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Message.deleteMany()
    await Category.deleteMany()
    await SubCategory.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
