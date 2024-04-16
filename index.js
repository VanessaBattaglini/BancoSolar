import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
process.loadEnvFile();
import router from './routes/router.js';

//Middlewares
app.use(express.json())
app.use('/', router);



app.listen(PORT, () => {
console.log(`El servidor se ha levantado en el PORT http://localhost:${PORT}`)
});