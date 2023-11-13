const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

// handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught exception`);
    process.exit(1);
})

// Setting up config file
dotenv.config({ path: 'backend/config/config.env'})


// Connecting to Database
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} model.`)
})

// Handle Unhandled Promise rejections
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught exception`);
    server.close(() => {
        process.exit(1)
    })
})
