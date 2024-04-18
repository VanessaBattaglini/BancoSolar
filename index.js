import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
process.loadEnvFile();
import router from './routes/router.js';
import path from 'path';
const __dirname = import.meta.dirname;

//Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, './assets')));
app.use('/', router);



app.listen(PORT, () => {
console.log(`El servidor se ha levantado en el PORT http://localhost:${PORT}`)
});