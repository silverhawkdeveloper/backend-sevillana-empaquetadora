import mongoose from 'mongoose';
const { Schema: _Schema, connection } = mongoose;

const productoSchema = new _Schema({
    tipo: {
        type: String,
        enum: ['Cubo', 'Ortoedro', 'Cilindro', 'Esfera'],
        required: true
    },
    descripcion: { type: String, required: true },
    arista: { type: Number },
    alto: { type: Number },
    ancho: { type: Number },
    profundo: { type: Number },
    circunferencia: { type: Number }
});

export default connection.model('Producto', productoSchema);