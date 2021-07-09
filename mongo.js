const mongoose = require('mongoose')
const mongoPath = 'mongodb+srv://VT:l1Jsd3B0sfy0i9Vv@vt.3v8oy.mongodb.net/VT-Data?retryWrites=true&w=majority'

module.exports = async () => {
	await mongoose.connect(mongoPath, {
		useNewUrlParser : true,
		useUnifiedTopology : true
	})

	return mongoose
}
