const graphql = require('graphql')

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// Dummy Data

var books = [
    {name: 'Maid Sama', genre: 'romcom', id: '1', authorId: '1'},
    {name: 'Demon Slayer', genre: 'action', id: '2', authorId: '2'},
    {name: 'HxH', genre: 'Adventure', id: '3', authorId: '3'},
    {name: 'One Piece', genre: 'Peak', id: '4', authorId: '1'},
    {name: 'JJK', genre: 'Sorcery', id: '5', authorId: '3'},
    {name: 'Haikyuu', genre: 'Sports', id: '6', authorId: '1'},
    {name: 'Blue Lock', genre: 'Ego', id: '7', authorId: '3'},
    {name: 'Hells Paradise', genre: 'Horror', id: '8', authorId: '2'},
]

var authors = [
    {name: 'Luffy', age: 42, id: '1'},
    {name: 'Tanjiro', age: 27, id: '2'},
    {name: 'Gon', age: 33, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id == parent.authorId )
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(book => book.authorId === parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from DB 
                return books.find(book => book.id == args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return authors.find(author => author.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})