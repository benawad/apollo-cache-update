import { ApolloServer, gql } from "apollo-server";

let books = [
  {
    id: "1",
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    id: "2",
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Mutation {
    createBook(title: String!, author: String!): Book!
    updateBook(id: String!, title: String!, author: String!): Book!
    deleteBook(id: String!): Boolean!
  }

  type Query {
    books: [Book!]!
  }
`;

type Resolver = (parent: any, args: any) => any;

const resolvers: Record<string, Record<string, Resolver>> = {
  Mutation: {
    createBook: (_, { title, author }) => {
      const book = { id: `${books.length + 1}`, title, author };

      books.push(book);

      return book;
    },
    updateBook: (_, book) => {
      books = books.map(x => (x.id === book.id ? book : x));

      return book;
    },
    deleteBook: (_, { id }) => {
      books = books.filter(x => x.id !== id);

      return true;
    }
  },
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
