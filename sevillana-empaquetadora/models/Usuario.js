import mongoose from 'mongoose';
const { Schema: _Schema, connection } = mongoose;
import bcrypt from 'bcryptjs';
const SALT_WORK_FACTOR = 10;

const usuarioSchema = new _Schema({
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    nombre: { type: String, required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true },
    contrasenia: { type: String, required: true }
});

// Contraseña
usuarioSchema.pre('save', function (next) {
    var user = this;
    // solo aplica una función hash a la contrasenia si ha sido modificado (o es nuevo)
    if (!user.isModified('contrasenia')) return next();
    // genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // aplica una función hash a la contrasenia usando la nueva salt
        bcrypt.hash(user.contrasenia, salt, function (err, hash) {
            if (err) return next(err);
            // sobrescribe la contrasenia escrito con el “hasheado”
            user.contrasenia = hash;
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