const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); 
const port =process.env.DB_port || 8003
const authRoute = require('./route/auth');
const userRoute = require('./route/users')
const bodyParser = require('body-parser');


app.listen(port, ()=>{  
  console.log('listening to port 8003 ')  ;
  db_connect();
  
})

const uri = 'mongodb+srv://warizshowclassic:w1234567890@node-crashcourse.ofrrsdo.mongodb.net/datingApp?retryWrites=true&w=majority'

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
app.use(authRoute)
app.use('update' ,userRoute)