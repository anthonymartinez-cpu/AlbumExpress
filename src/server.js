import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 3000;

// "Base de datos" en memoria (por ahora)
const fotos = [{
    id: 1, titulo: 'Atardecer', calificacion: 4.5,
    descripcion: 'Playa de Montañita'},
    {id: 2, titulo: 'Malecon', calificacion: 4.0,
        descripcion: 'Guayaquil de noche'
}]

app.get('/api/fotos', (req, res) => {res.json(fotos)});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    
});

//Middleware: convierte el cuerpo JSON en req.body
app.use(express.json());

//Middleware propio: registra cada peticion 
app.use((req,res,next)=>{
    const hora = new Date().toISOString();
    console.log(`[${hora}] ${req.method} ${req.url}`);
    next();
})