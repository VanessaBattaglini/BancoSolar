import express from 'express';
const router = express.Router();
import pool from '../config/db.js'

import path from 'path';
const __dirname = import.meta.dirname;

import {
    getDate,
    addUserQuery,
    getUserQuery,
    editUserQuery,
    deleteUserQuery,
    addTransferQuery,
    getTransferQuery
} from "../queries/crud.js";

//Ruta raíz

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

//Ruta de prueba
router.get("/date", async (req, res) => {
    const results = await pool.query('SELECT NOW()');
    res.send(results.rows)
});

//Ruta para agregar datos
router.post('/usuario', async (req, res) => {
    try {
        const { nombre, balance } = req.body;
        const datos = [nombre, balance];

        const result = await addUserQuery(datos);
        console.log(result.rows)
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
//Mostrar los registros
router.get('/usuarios', async (req, res) => {
    try {
        const result = await getUserQuery();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
//Ruta para editar los registros
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
//Ruta para eliminar registros
router.delete('/usuario', async (req, res) => {
    try {
        const { id } = req.query;
        const result = await deleteUserQuery(id);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
//Ruta de transferencias
router.post('/transferencia', async (req, res) => {
    try {
        console.log("body", req.body);
        const { emisor, receptor, monto } = req.body;
        const datos = [emisor, receptor, monto];
        const result = await addTransferQuery(datos);
        console.log(datos)
        res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    });

router.get('/transferencias', async (req, res) => {
    try {
        const result = await getTransferQuery();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

    
//Ruta genérica
router.get('*', (req, res) => {
    res.send('<h1><center>Error 404 - Page no Found</center></h1>')
});

    export default router;