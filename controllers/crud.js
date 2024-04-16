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

export {
    getDate,
    addUserQuery
};
