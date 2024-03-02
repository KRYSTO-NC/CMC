import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    acceptNews: true,
    acceptPromotions: true,
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    acceptNews: true,
    acceptPromotions: true,
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    acceptNews: true,
    acceptPromotions: true,
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
