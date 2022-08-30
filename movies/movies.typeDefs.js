import {gql} from "apollo-server";

const typeDefs = gql`
type Movie{
    id: Int!
    title: String!
    year: Int!
    genre:    String
    createdAt: String!
    updatedAt: String!
}
type Query {
    movies: [Movie]
    movie: Movie
}
type Mutation {
    createMovie(title: String!, year: Int!, genre:String): Movie
    deleteMovie(id: Int!): Movie
}
`;