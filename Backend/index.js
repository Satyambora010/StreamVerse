import cookieParser from 'cookie-parser';
import express from 'express';
import { dbConnection } from './Config/db.js';
import { ENV_VARS } from './Config/envVars.js';
import { protectRoute } from './Middleware/protectRoute.js';
import authRoute from './Routes/auth.route.js';
import moviesRoute from './Routes/movies.route.js';
import paymentRoute from './Routes/payment.route.js';
import recentWatchRoute from './Routes/recent.watch.route.js';
import searchRoute from './Routes/search.route.js';
import tvRoute from './Routes/tv.route.js';
const app = express()
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/movie', protectRoute, moviesRoute);
app.use('/api/tv', protectRoute, tvRoute);
app.use('/api/search', protectRoute, searchRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/recent', recentWatchRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbConnection();
})

