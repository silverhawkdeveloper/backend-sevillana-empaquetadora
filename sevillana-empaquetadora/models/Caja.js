import mongoose from 'mongoose';
const { Schema: _Schema, connection } = mongoose;

const cajaSchema = new _Schema({
    descripcion: {
        type: String, required: true
    },
    alto: { type: Number, required: true },
    ancho: { type: Number, required: true },
    profundo: { type: Number, required: true }
});

export default connection.model('Caja', cajaSchema);