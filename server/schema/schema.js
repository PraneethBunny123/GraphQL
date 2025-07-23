const graphql = require('graphql')

const {GraphQLObjectType, GraphQLstring} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLstring},
        name: {type: GraphQLstring},
        genre: {type: GraphQLstring}
    })
})