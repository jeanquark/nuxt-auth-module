const mongoose = require('mongoose')

const connectDB = async () => {
	console.log('process.env.MONGO_URI: ', process.env.MONGO_URI)
  	const conn = await mongoose.connect(process.env.MONGO_URI, {
  	// const conn = await mongoose.connect('mongodb+srv://jeanquark:1163Etoy@cluster0-pgnfd.mongodb.net/test', {
  	// const conn = await mongoose.connect('mongodb://127.0.0.1:27017/node_express_mongoose_demo', {
    	useNewUrlParser: true,
    	useCreateIndex: true,
    	useFindAndModify: false,
    	useUnifiedTopology: true
  	});

  	console.log(`MongoDB connected! Host: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;