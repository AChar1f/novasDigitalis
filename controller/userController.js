import express from 'express'
import bodyParser from 'body-parser'
import {  users } from '../model/index.js'
import { cart } from '../model/index.js'

const userRouter = express.Router()
userRouter.use(bodyParser.json())

const cartRouter = express.Router()
cartRouter.use(bodyParser.json())

userRouter.get('/', (req, res) => {
    users.fetchUsers(req, res)
})

userRouter.get('/:id', (req, res) => {
    users.fetchUser(req, res)
})

userRouter.patch('/update/:id', (req, res) => {
    users.updateUser(req, res)
})

userRouter.post('/register', (req, res) => {
    users.registerUser(req, res)
})

userRouter.post('/login', (req, res) => {
    users.login(req, res)
})

userRouter.delete('/delete/:id', (req, res) => {
    users.deleteUser(req, res)
})


cartRouter.get('/:id/carts', (req, res) => {
    cart.fetchCart(req, res)
})

cartRouter.post('/:id/cart', (req, res) => {
    cart.addToCart(req, res)
})

cartRouter.patch('/:id/cart/:oid', (req, res) => {
    cart.updateCart(req, res)
})

cartRouter.delete('/:id/cart', (req,res) => {
    console.log(req.params.id);
    cart.clearCart(req,res)
    
})

cartRouter.delete('/:id/cart/:oid', (req, res) => {
    cart.deleteItem(req, res)
})
export {
    userRouter,
    express,
    cartRouter
}