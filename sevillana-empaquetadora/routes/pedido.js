import { Router } from "express";
const router = Router();
import pedido from "../models/Pedido.js";
import mongoose from 'mongoose';
const { connection } = mongoose;

// POST - Crear un nuevo pedido
router.post('/', function (req, res) {
  pedido.create(req.body, function (error) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// DELETE - Eliminar un pedido identificado por su _id
router.delete('/delete/:id', function (req, res) {
  pedido.findByIdAndDelete({ '_id': req.params.id }, function (error) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// PUT - Actualizar un pedido identificado por su _id
router.put('/update/:id', function (req, res) {
  pedido.findByIdAndUpdate({ '_id': req.params.id }, req.body, function (error) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// GET - Listar un único pedido por su _id
router.get('/:id', function(req, res, next) {
  pedido.find({ '_id': req.params.id }, function(error, pedidoInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(pedidoInfo);;
  });
});

// GET - Listado de pedidos
router.get('/', function (req, res, next) {
  pedido.find().populate('usuario', { 'email': 1, "_id": 1 })
    .populate('caja', { 'descripcion': 1, "_id": 1 })
    .populate('producto', { 'descripcion': 1, "_id": 1 })
    .exec(function (error, pedidoInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(pedidoInfo);
    });
});

export default router;