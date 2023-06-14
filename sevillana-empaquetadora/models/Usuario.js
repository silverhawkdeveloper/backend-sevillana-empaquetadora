import mongoose from 'mongoose';
const { Schema: _Schema, connection } = mongoose;
import bcrypt from 'bcryptjs';
const SALT_WORK_FACTOR = 10;

const usuarioSchema = new _Schema({
    role: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    },
    nombre: { type: String, required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true },
    contrasenia: { type: String, required: true }
});

//Para la encriptación del contrasenia
usuarioSchema.pre('save', function(next) {
    const usuario = this;
    // solo aplica una función hash al contrasenia si ha sido modificado (o es nuevo)
    if (!usuario.isModified('contrasenia')) return next();
    // genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // aplica una función hash al contrasenia usando la nueva salt
        bcrypt.hash(usuario.contrasenia, salt, function(err, hash) {
            if (err) return next(err);
            // sobrescribe el contrasenia escrito con el “hasheado”
            usuario.contrasenia = hash;
            next();
        });
    });
});

usuarioSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.contrasenia, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default connection.model('Usuario', usuarioSchema);