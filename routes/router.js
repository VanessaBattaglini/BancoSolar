import express from 'express';
const router = express.Router();

import path from 'path';
const __dirname = import.meta.dirname;
import pool from "../config/db.js";
import { getDate, addUserQuery, getUserQuery, editUserQuery, deleteUserQuery } from "../controllers/crud.js";

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
        res.status(201).send(result.rows)
    } catch (error) {
        res.status(500).send(error)
    }
});
router.get('/usuarios', async (req, res) => {
    try {
        const result = await getUserQuery();
        res.status(201).send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.put('/usuario', async (req, res) => {
    try {
        const { id } = req.query;
        const { nombre, balance } = req.body;
        const result = await editUserQuery(nombre, balance, id);
        res.status(201).send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/usuario', async (req, res) => {
    try {
        const { id } = req.query;
        const result = await deleteUserQuery(id);
        res.status(201).send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Ruta genérica
router.get('*', (req, res) => {
    res.send('<h1><center>Error 404 - Page no Found</center></h1>')
});

export default router;