const Product = require('../models/product');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


function getProduct (req,res){
    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: 'Error con la peticion al product'});
        if (!product) return res.status(404).send({message: 'Error 404'});
        res.status(200).send({product: product});
    });
}

function getProducts(req, res){
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: 'Error con la peticion al product'});
        if (!products) return res.status(404).send({message: 'Error 404'});
        res.send(200, {products: products});
    });
    
}

function saveProduct(req,res){
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;
    
    product.save( (err, productStored) => {
        if (err) res.status(500).send ({message: 'Error al grabar en BD'});
        res.status(200).send({product: productStored});
    });
}

function updateProducts(req,res){
    let productId = req.params.productId;
    let update = req.body;
    Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdated) =>{
        if (err) return res.status(500).send({message: 'Error con la peticion al product'});
        res.status(200).send({product: productUpdated});
    });
}

function deleteProduct(req,res){
    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: 'Error con la peticion al product'});
        product.remove( err => {
            if (err) return res.status(500).send({message: 'Error con la peticion al product'});
            res.status(200).send({message: 'Producto eliminado'});
        })
    });
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProducts,
    deleteProduct
}