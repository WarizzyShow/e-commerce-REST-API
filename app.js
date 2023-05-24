const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path:"./.env"}); 
const port =process.env.DB_port || 8005
const authRoute = require('./route/auth');
const productRoute = require('./route/product');
const cartRoute = require('./route/cart');
const OrderRoute = require('./route/order');
const bodyParser = require('body-parser');


app.listen(port, ()=>{  
  console.log(`listening to ${port}`)  ;
  db_connect();
  
})



const uri = process.env.DB_URI
const db_connect = async () => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(uri);
		console.log("db connected");
	} catch (err) {
		throw err;
	}
};
mongoose.connection.on("disconnected", () => {
	console.log("mongdb disconnected");
});


app.use(express.urlencoded({ extended : true}));
app.use(bodyParser.json())
app.use(authRoute);
app.use(productRoute);
app.use(OrderRoute);
app.use(cartRoute)