const graphql = require('graphql')

// getting the models 
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType, 
    GraphQLString,  
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

///////////////////////////////////////////////////////////

// Dummy Data

// var books = [
//     {name: 'Maid Sama', genre: 'romcom', id: '1', authorId: '1'},
//     {name: 'Demon Slayer', genre: 'action', id: '2', authorId: '2'},
//     {name: 'HxH', genre: 'Adventure', id: '3', authorId: '3'},
//     {name: 'One Piece', genre: 'Peak', id: '4', authorId: '1'},
//     {name: 'JJK', genre: 'Sorcery', id: '5', authorId: '3'},
//     {name: 'Haikyuu', genre: 'Sports', id: '6', authorId: '1'},
//     {name: 'Blue Lock', genre: 'Ego', id: '7', authorId: '3'},
//     {name: 'Hells Paradise', genre: 'Horror', id: '8', authorId: '2'},
// ]

// var authors = [
//     {name: 'Luffy', age: 42, id: '1'}, //6883eea448269ec6c8152091
//     {name: 'Tanjiro', age: 27, id: '2'}, //6883ee9848269ec6c815208f
//     {name: 'Gon', age: 33, id: '3'} //6883eebf48269ec6c8152093
// ]

////////////////////////////////////////////////////////////

//BookType
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // code to get from dummy data
                // return authors.find(author => author.id == parent.authorId )
                // code to get from mongodb
                return Author.findById(parent.authorId)
            }
        }
    })
})


//AuthorType
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // code to get from dummy data
                // return books.filter(book => book.authorId === parent.id)
                // code to get from mongodb
                return Book.find({authorId: parent.id})
            }
        }
    })
})


//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get from dummy data
                // return books.find(book => book.id == args.id)
                // code to get from mongodb
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get from dummy data
                // return authors.find(author => author.id === args.id)
                // code to get from mongodb
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // code to get from dummy data
                // return books
                // code to get from mongodb
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // code to get from dummy data
                // return authors
                // code to get from mongodb
                return Author.find({})
            }
        }
    }
})

//mutation (add data to database)
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: { 
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})