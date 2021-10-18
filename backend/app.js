const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handler')
app.use(cors());
app.options('*', cors())


require('dotenv/config');

//Middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'));
// app.use(authJwt());
app.use(errorHandler)


//Routes
const productRouter = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const usersRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');


const api = process.env.API_URL;

app.use(`${api}/products`, authJwt(), productRouter);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, orderRoutes);


//DataBase
mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log('Database Connection is ready...')
}).catch((err) => {
    console.log(err);
})

//Server
app.listen(3000, () => {

    console.log("server is running http://localhost:3000");
})