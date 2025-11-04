import express from 'express';

import cartRoutes from './api/cart.routes';

const app = express();
app.use(express.json());

app.use('/api/v1/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Api running on http://localhost:${PORT}`');
})

export default app;

