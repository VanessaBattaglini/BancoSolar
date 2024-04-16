import pool from "../config/db.js";

//Prueba de conexión
const getDate = async () => {
  const response = await pool.query("SELECT NOW()");
  console.log(response.rows[0]);
};

//Agragar usuarios
const addUserQuery = async (datos) => {
    try {
        const sql = {
            text: 'INSERT INTO usuarios(nombre, balance) VALUES ($1, $2) RETURNING *',
            values: datos
        }
        const result = await pool.query(sql);
        console.log(result.rows)
        return result.rows;
    } catch (error) {
        console.log(error.status)
    }
}
//Ruta get para visualizar los registros
const getUserQuery = async () => {
    try {
        const sql = {
            text: 'SELECT * FROM usuarios'
        }
        const result = await pool.query(sql)
        return result
    } catch (error) {
        console.log(error.message)
    }
};

//Función de cambiar registros
const editUserQuery = async (nombre, balance, id) => {
    try {
        const sql = {
            text: 'UPDATE usuarios SET nombre=$1, balance=$2 WHERE id= $3',
            values: [nombre, balance, id]
        }
        const result = await pool.query(sql);
        //Validación de cambio
        if (result.rowCount === 0) {
            throw new Error("No se cambio el usuario");
        } else {
            result.rows[0];
        }
            return result.rows;
    } catch (error) {
        console.log(error.message)
    }
};

//Función para borrar registros
const deleteUserQuery = async (id) => {
    try {
        const sql = {
            text: "DELETE * FROM usuarios WHERE id= $1 RETUNING *",
            values: [id],
        };
        const result = await pool.query(sql);
        return result;
        //Validación de cambio
        if (result.rowCount === 0) {
            throw new Error("No se eliminó el usuario");
        } else {
            result.rows[0];
        }
    } catch (error) {
        console.log(error.message)
    }
};
//Tabla de transferencia
const addTransferQuery = async (datos) => {
    try {
        const { emisor, receptor, monto } = datos;
        const { id: emisorId } = (
      await pool.query(`SELECT * FROM usuarios WHERE nombre = '${emisor}'`)
        ).rows[0];
        const addTransfer = {
            text: 'INSERT INTO'
        }
    //buscamos el id del receptor
    const { id: receptorId } = (
      await pool.query(`SELECT * FROM usuarios WHERE nombre = '${receptor}'`)
    ).rows[0];
    } catch (error) {
        console.log(error.message)
    }
}

export {
    getDate,
    addUserQuery,
    getUserQuery,
    editUserQuery,
    deleteUserQuery,

};
