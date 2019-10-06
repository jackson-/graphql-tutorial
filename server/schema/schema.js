const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;


const books = [
    {name : 'Harry Potter', genre: 'Fantasy', id: '1'},
    {name : 'Eragon', genre: 'Fantasy', id: '2'},
    {name : 'Drizzt', genre: 'Fantasy', id: '3'},
];

const BookType = GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                _.find(books, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: RootQuery
})