import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from 'mongoose';
import authRouter from "./routes/auth.js";
import authTokenRouter from "./routes/auth_token.js";
import usuarioRouter from "./routes/usuario.js";
import productoRouter from "./routes/producto.js";
import pedidoRouter from "./routes/pedido.js";
import cajaRouter from "./routes/caja.js";

dotenv.config();
const PORT = process.env.PORT;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log(`Conexión a MongoDB`))
  .catch((err) => console.error(err));
const { connection } = mongoose;

const expressApp = express();

expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use("/auth", authRouter);
expressApp.use("/auth-token", authTokenRouter);
expressApp.use("/usuario", usuarioRouter);
expressApp.use("/producto", productoRouter);
expressApp.use("/pedido", pedidoRouter);
expressApp.use("/caja", cajaRouter);

expressApp.listen(PORT, () =>
  console.log(`Servidor levantado en el puerto ${PORT}`)
);
