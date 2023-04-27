import { Router } from "express";
const router = Router();
import caja from "../models/Caja.js";
import mongoose from 'mongoose';
const { connection } = mongoose;

// POST - Crear una nueva caja
router.post('/', function (req, res, next) {
  caja.create(req.body, function (error, cajaInfo) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// DELETE - Eliminar una caja identificado por su _id
router.delete('/delete', function (req, res, next) {
  caja.findByIdAndDelete(req.body._id, function (error, cajaInfo) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// PUT - Actualizar una caja identificado por su _id
router.put('/update', function (req, res, next) {
  caja.findByIdAndUpdate(req.body._id, req.body, function (error) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// GET - Listar una caja por su _id
router.get('/mostrar', function (req, res, next) {
  caja.findById(req.body._id, function (error, cajaInfo) {
    if (error) res.status(500).send(error);
    else res.status(200).json(cajaInfo);
  });
});

// GET - Listado de cajas
router.get('/', function (req, res, next) {
    caja.find().exec(function (error, cajaInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(cajaInfo);
    });
});

export default router;