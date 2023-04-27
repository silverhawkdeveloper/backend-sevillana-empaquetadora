import mongoose from 'mongoose';
const { Schema: _Schema, connection } = mongoose;
import Usuario from '../models/Usuario.js';
import Producto from '../models/Producto.js';
import Caja from '../models/Caja.js';

const pedidoSchema = new _Schema({
    usuario: [{
        type: _Schema.ObjectId,
        ref: 'Usuario',
        default: null
    }],
    caja: [{
        type: _Schema.ObjectId,
        ref: 'Caja',
        default: null
    }],
    producto: [{
        type: _Schema.ObjectId,
        ref: 'Producto',
        default: null
    }],
    cantidad: { type: Number, required: true },
    merma: { type: Number, required: true },
    fecha: { type: Date, required: true, default: Date.now }
});

export default connection.model('Pedido', pedidoSchema);