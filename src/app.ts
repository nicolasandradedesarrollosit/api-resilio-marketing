import express, { Request, Response, NextFunction } from 'express';
import './helpers/console-block';
import dotenv from 'dotenv';
import cors from 'cors';
import 'dotenv/config';
import MessageRoutes from './routes/messageRoutes';

dotenv.config();
const app = express();


const allowedOrigins = [
  'http://localhost:3000',
  'https://resilio-marketing.vercel.app'
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen CORS no permitido por el servidor.'));
    }
  },
  credentials: true,
}));

app.get('/health-check', async (_req, res) => {
    res.status(200).json({ ok: true, message: 'API corriendo' });
})

app.use(express.json())

if (process.env.DEBUG === 'true') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();
    console.log(`REQUEST → ${req.method} ${req.originalUrl}`);
    console.log('Headers:', req.headers);
    if (Object.keys(req.query || {}).length) console.log('Query:', req.query);
    if (Object.keys(req.params || {}).length) console.log('Params:', req.params);
    if (req.body && Object.keys(req.body || {}).length) console.log('Body:', req.body);

    res.on('finish', () => {
      const [sec, nan] = process.hrtime(start);
      const ms = (sec * 1e3 + nan / 1e6).toFixed(2);
      console.log(`RESPONSE ← ${res.statusCode} ${req.method} ${req.originalUrl} - ${ms} ms`);
    });

    next();
  });
}

app.use('/api', MessageRoutes);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error en request:', {
    path: req.path,
    method: req.method,
    body: req.body,
    error: err.message,
    stack: err.stack
  });
  res.status(500).json({ message: 'Error interno del servidor', detail: err.message });
});

export default app;