import express from 'express';
import itemRoutes from './routes/itemRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
const app = express();
app.use(express.json());
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);
//request -> authMiddleware -> itemRoutes -> itemController
//POST /api/auth/register
//POST /api/auth/login
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map