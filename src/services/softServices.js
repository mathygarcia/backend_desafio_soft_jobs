const softJobsDB = require('../database/conexion');
const bcrypt = require('bcryptjs');

const getUser = async (email) => { 
    const valor = [email]           
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: usuarios } = await softJobsDB.query(consulta, valor);
    return usuarios;
};

const registerUser = async (usuario) => {
    const { email, password, rol, lenguage } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password);
    const valores = [email, passwordEncriptada, rol, lenguage];
    const consulta = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)';
    await softJobsDB.query(consulta, valores);
};

const verifyUser = async(email, password) => {
    const valor = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const { rows: [usuario], rowCount } = await softJobsDB.query(consulta, valor);
    if (!usuario) {
        throw { code: 401, message: "Email o contraseña incorrecta" };
    }
    const passwordEsCorrecta = bcrypt.compareSync(password, usuario.password);
    if (!passwordEsCorrecta) {
        throw { code: 401, message: "Email o contraseña incorrecta" };
    }
};

module.exports = { getUser, registerUser, verifyUser };