const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')

require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

app.use(cors())

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