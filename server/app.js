const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')

require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

// connect to mongodb atlas
// mongoose.connect('mongodb+srv://bunny:bunny@cluster0.xp1gj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// mongoose.connection.once('open', () => {
//     console.log('connected to database')
// })

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('database connection')
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("Listening for requests on port 4000...")
})