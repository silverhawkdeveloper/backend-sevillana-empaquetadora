import { Router } from "express";
import usuario from "../models/Usuario.js";
import mongoose from 'mongoose';
const router = Router();
const { connection } = mongoose;

//Endpoint público (No autenticado y no autorizado)
router.get("/publico", (req, res) => res.send("Endpoint público"));

//Endpoint autenticado para todo usuario registrado
router.post("/autenticado", (req, res, next) => {
  //const { email, contrasenia } = req.body;
  const email = JSON.parse(req.body).email;
  const contrasenia = JSON.parse(req.body).contrasenia;
  if (!email || !contrasenia) return res.status(400).send('Sin datos');
  try {
    usuario.findOne({ email: email }, function (error, usuarioInfo) {
      if (error) res.status(500).send('Error del servidor en el usuario');
      //Usuario
      if (usuarioInfo != null) {
        usuarioInfo.comparePassword(contrasenia, async function (error, isMatch) {
          if (error)
            return next(error);
          //Contraseña
          if (isMatch) {
            return res.send(`Usuario ${usuarioInfo.nombre} autenticado`);
          } else {
            res.status(401).send('La contraseña no coincide');
          }
        });
      } else res.status(401).send('Usuario no registrado');
    });
  } catch (err) {
    return res.sendStatus(401);
  }
});

//Endpoint autorizado a administradores
router.post("/autorizado", (req, res, next) => {
  //const { email, contrasenia } = req.body;
  const email = JSON.parse(req.body).email;
  const contrasenia = JSON.parse(req.body).contrasenia;
  if (!email || !contrasenia) return res.status(400);
  try {
    usuario.findOne({ email: email }, function (error, usuarioInfo) {
      if (error) res.status(500).send('Error del servidor en el usuario');
      //Usuario
      if (usuarioInfo != null) {
        usuarioInfo.comparePassword(contrasenia, async function (error, isMatch) {
          if (error)
            return next(error);
          //Contraseña
          if (isMatch) {
            if (usuarioInfo.role !== "admin") {
              res.status(401).send(`admin`);
            } else {
              return res.send(`Usuario ${usuarioInfo.nombre} administrador `);
            }
          } else {
            res.status(401).send('La contraseña no coincide');
          }
        });
      } else res.status(401).send('Usuario no registrado');
    });

  } catch (err) {
    return res.sendStatus(401);
  }
});

export default router;
