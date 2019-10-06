const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
 } = graphql;


const books = [
    {name : 'Harry Potter', genre: 'Fantasy', id: '1', authorId: '1'},
    {name : 'Eragon', genre: 'Fantasy', id: '2', authorId: '2'},
    {name : 'Drizzt', genre: 'Fantasy', id: '3', authorId: '3'},
];

const authors = [
    {name : 'Harry Hoozawitz', age: 19, id: '1'},
    {name : 'Julie Jahosefatts', 27: 'Fantasy', id: '2'},
    {name : 'Rudy Rambo', 44: 'Fantasy', id: '3'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type:AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(books, {id: args.id})
            }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parents, args){
                return _.find(authors, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: RootQuery
})