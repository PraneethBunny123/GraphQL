const graphql = require('graphql')

const {GraphQLObjectType, GraphQLstring, GraphQLSchema} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLstring},
        name: {type: GraphQLstring},
        genre: {type: GraphQLstring}
    })
})

// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     fields: () => ({
//         name: {type: GraphQLstring},
//         age: {type: GraphQLstring}
//     })
// })

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {type: GraphQLstring},
            resolve(parent, args) {
                // code to get data from DB 
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})