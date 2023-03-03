require('./db/connect');
const express = require("express");
const app = express();
const path = require('path')
const port = 3000;
const bodyParser = require('body-parser')
const routes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const JWT_SECRET = "secret";
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const notFoundMiddleware = require('./middleware/not-found');

//db connection
const connectDB = require('./db/connect');

app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.use(cookieParser(JWT_SECRET));

//routers
app.use('/', routes);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);

//middleware
app.use(notFoundMiddleware);

const start = async () => {
    try {
        await connectDB('mongodb://enteryourlocalhost/users');
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();