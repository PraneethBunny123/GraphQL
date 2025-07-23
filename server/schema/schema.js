const graphql = require('graphql')

const {GraphQLObjectType, GraphQLstring, GraphQLSchema} = graphql;

// Dummy Data

var books = [
    {name: 'Maid Sama', genre: 'romcom', id: '1'},
    {name: 'Demon Slayer', genre: 'action', id: '2'},
    {name: 'HxH', genre: 'Adventure', id: '3'}
]

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
                return books.find(book => book.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})