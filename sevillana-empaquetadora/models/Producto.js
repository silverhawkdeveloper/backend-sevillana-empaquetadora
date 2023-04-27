import mongoose from 'mongoose';
const { Schema: _Schema, connection } = mongoose;

const productoSchema = new _Schema({
    tipo: {
        type: String,
        enum: ['Ortoedro', 'Cubo', 'Cilindro', 'Esfera'],
        default: 'Cubo'
    },
    descripcion: { type: String, required: true },
    alto: { type: Number, required: true },
    ancho: { type: Number, required: true },
    profundo: { type: Number, required: true }
});

export default connection.model('Producto', productoSchema);