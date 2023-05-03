import { Router } from "express";
import { jwtVerify, SignJWT } from "jose";
import validateLogin from "../dto/validate_login.js";
import usuario from "../models/Usuario.js";
import mongoose from 'mongoose';
const router = Router();
const { connection } = mongoose;

//Login con email y contrasenia
router.post("/login", validateLogin, (req, res, next) => {
  //const { email, contrasenia } = req.body;
  const email = JSON.parse(req.body).email;
  const contrasenia = JSON.parse(req.body).contrasenia;
  console.log(email, contrasenia);
  try {
    usuario.findOne({ email: email }, function (error, usuarioInfo) {
      if (error) res.status(500).send('Error del servidor en el usuario');
      // Usuario
      if (usuarioInfo != null) { 
        usuarioInfo.comparePassword(contrasenia, async function (error, isMatch) {
          if (error)
            return next(error);
          // Contrasenia
          if (isMatch)  {
            const _id = usuarioInfo._id.toString();
            //GENERAR TOKEN Y DEVOLVER TOKEN
            const jwtConstructor = new SignJWT({ _id });
            const encoder = new TextEncoder();
            const jwt = await jwtConstructor
              .setProtectedHeader({ alg: "HS256", typ: "JWT" })
              .setIssuedAt()
              .setExpirationTime("1h")
              .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
            return res.send({ jwt });
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

//Solicitud autenticada con token para obtener el perfil del usuario
router.get("/profile", async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    usuario.findOne({ _id: payload._id }, function (error, usuarioInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(usuarioInfo); return usuarioInfo;
    });
  } catch (err) {
    return res.sendStatus(401);
  }
});

export default router;
