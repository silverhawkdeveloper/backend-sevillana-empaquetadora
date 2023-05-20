import { Router } from "express";
const router = Router();
import producto from "../models/Producto.js";
import mongoose from 'mongoose';
const { connection } = mongoose;

// POST - Crear un nuevo producto
router.post('/', function (req, res, next) {
  producto.create(req.body, function (error, productoInfo) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// DELETE - Eliminar un producto identificado por su _id
router.delete('/delete', function (req, res, next) {
  producto.findByIdAndDelete(req.body._id, function (error, productoInfo) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// PUT - Actualizar un producto identificado por su _id
router.put('/update/:id', function (req, res) {
  producto.findByIdAndUpdate({ '_id': req.params.id }, req.body, function (error) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});
/*
// PUT - Actualizar un producto identificado por su _id
router.put('/update', function (req, res, next) {
  producto.findByIdAndUpdate(req.body._id, req.body, function (error) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});
*/
// POST - Listar un producto por su _id
router.post('/mostrar', function (req, res, next) {
  producto.findById(req.body._id, function (error, productoInfo) {
    if (error) res.status(500).send(error);
    else res.status(200).json(productoInfo);
  });
});

// GET - Listado de productos
router.get('/', function (req, res) {
    producto.find().exec(function (error, productoInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(productoInfo);
    });
});

// GET - Listar un único productos por su _id
router.get('/:id', function(req, res) {
  producto.find({ '_id': req.params.id }, function(error, pedidoInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(pedidoInfo);;
  });
});

export default router;