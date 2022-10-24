import express from 'express'
import cors from 'cors';

import usersRoutes from './routes/users.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express();

app.use(express.json(), cors());

app.use(indexRoutes);
app.use('/api', usersRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;