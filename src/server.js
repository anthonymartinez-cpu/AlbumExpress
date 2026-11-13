import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 3000;
const {titulo, calificacion, descripcion} = req.body;
// 1. "Base de datos" en memoria
const fotos = [
    { id: 1, titulo: 'Atardecer', calificacion: 4.5, descripcion: 'Playa de Montañita' },
    { id: 2, titulo: 'Malecon', calificacion: 4.0, descripcion: 'Guayaquil de noche' }
];

// 2. Middlewares globales (¡siempre van antes de las rutas!)
app.use(express.json());

app.use((req, res, next) => {
    const hora = new Date().toISOString();
    console.log(`[${hora}] ${req.method} ${req.url}`);
    next();
});

// 3. Rutas de la API
app.get('/api/fotos', (req, res) => {
    res.json(fotos);
});

app.get('/api/fotos/:id', (req, res) => {
    const id = Number(req.params.id);
    const foto = fotos.find(f => f.id === id);
    if (!foto) {
        return res.status(404).json({ mensaje: `Foto ${id} no encontrada` });
    }
    res.json(foto);
});

app.post('/api/fotos', (req, res) => {
    const { titulo, calificacion, descripcion } = req.body;
    if (!titulo) {
        return res.status(400).json({ mensaje: 'El titulo es obligatorio' });
    }
    const nuevo = {
        id: fotos.length + 1,
        titulo,
        descripcion: descripcion || '',
        calificacion: calificacion || 0
    };
    fotos.push(nuevo);
    res.status(201).json(nuevo);
});

// Ruta de error corregida para que coincida con la diapositiva (/api/error)
app.get('/api/error', async (req, res) => {
    throw new Error('Algo salio mal');
});

// 4. Middleware de manejo de errores (¡siempre va al final de las rutas!)
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
});

// 5. Iniciar el servidor (¡va al final de todo!)
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

