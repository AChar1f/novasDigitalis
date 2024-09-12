import express from 'express'
import bodyParser from 'body-parser'
import { products } from '../model/index.js'
import { verifyToken } from '../middleware/UserAuthentification.js'

const productRouter = express.Router()
productRouter.use(bodyParser.json())

productRouter.get('/', verifyToken, (req, res) => {
    products.fetchProducts(req, res)
})

productRouter.get('/recent', (req, res) => {
    products.recentProducts(req, res)
})

productRouter.get('/:id', verifyToken, (req, res) => {
    products.fetchProduct(req, res)
})

productRouter.post('/addProduct', verifyToken, (req, res) => {
    products.addProduct(req, res)
})

productRouter.patch('/update/:id', verifyToken, (req, res) => {
    products.updateProduct(req, res)
})

productRouter.delete('/delete/:id', verifyToken, (req, res) => {
    products.deleteProduct(req, res)
})

export {
    productRouter
}