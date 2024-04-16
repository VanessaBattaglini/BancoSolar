import express from 'express';
const router = express.Router();

import path from 'path';
const __dirname = import.meta.dirname;
import pool from "../config/db.js";
import { getDate, addUserQuery } from "../controllers/crud.js";

//Ruta raíz

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

//Ruta de prueba
router.get("/date", async (req, res) => {
    const results = await pool.query('SELECT NOW()');
    res.send(results.rows)
});

//Obtener datos
router.post('/usuario', async (req, res) => {
    try {
        const { nombre, balance } = req.body;
        const datos = [nombre, balance];
        const result = await addUserQuery(datos);

    } catch (error) {
        console.log(error.status)
    }
    
    
})

//Ruta genérica
router.get('*', (req, res) => {
    res.send('<h1><center>Error 404 - Page no Found</center></h1>')
});

export default router;