import { Router } from "express";
const router = Router();
import usuario from "../models/Usuario.js";
import mongoose from 'mongoose';
const { connection } = mongoose;

// POST - Crear un nuevo usuario
router.post('/', function (req, res, next) {
  usuario.create(req.body, function (error, usuarioInfo) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// DELETE - Eliminar un usuario identificado por su _id
router.delete('/delete/:id', function (req, res) {
  usuario.findByIdAndDelete({ '_id': req.params.id }, function (error) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// PUT - Actualizar una usuario identificado por su _id
router.put('/update/:id', function (req, res) {
  usuario.findByIdAndUpdate({ '_id': req.params.id }, req.body, function (error) {
    if (error) res.status(500).send(error);
    else res.sendStatus(200);
  });
});

// GET - Listar un único usuario por su _id
router.get('/:id', function(req, res) {
  usuario.findById({ '_id': req.params.id }, function(error, usuarioInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(usuarioInfo);;
  });
});

// GET - Listado de usuarios
router.get('/', function (req, res, next) {
    usuario.find().exec(function (error, usuarioInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(usuarioInfo);
    });
});

export default router;