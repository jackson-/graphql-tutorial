const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})