import { Products } from './Products.js'
import { Users } from './User.js'
import { Cart } from  './Cart.js'

const products = new Products()
const users = new Users()
const cart = new Cart()

export {
    products,
    users,
    cart
}