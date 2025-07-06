import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { contactoRouter } from '../routes/contacto';
import { SocialesRoutes } from '../routes/sociales';
import { LoginRouter } from '../routes/login';
import { PreguntasRoutes } from '../routes/preguntas';
import { UsuarioRouter } from '../routes/datausuario';
import { ServiciosRoutes } from '../routes/servicios';


const PORT = 3000

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // para herramientas como Postman

        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('El CORS no permite el acceso desde este origen.'), false);
        }

        return callback(null, true);
    },
    credentials: true,
}));

app.use(cookieParser());


app.use('/api/contacto', contactoRouter);
app.use('/api/sociales', SocialesRoutes);
app.use('/api/login', LoginRouter);
app.use('/api/preguntas', PreguntasRoutes);
app.use('/api/usuario', UsuarioRouter);
app.use('/api/servicios', ServiciosRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
