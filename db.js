let mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let connectionString = process.env.CONNECTION_STRING

const PORT = process.env.PORT || 3000

const options = {
    useNewUrlParser: true,
    useUnifierTopology: true
};

mongodb.connect(connectionString, options, (err, client) => {

    if(!err) {
    module.exports =client.db();
    const app = require('./app');
    app.listen(PORT)
    console.log(`server is listening on port : ${PORT}`)
}
})