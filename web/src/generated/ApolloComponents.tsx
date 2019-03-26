type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Book = {
  id: Scalars["ID"];
  title: Scalars["String"];
  author: Scalars["String"];
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type Mutation = {
  createBook: Book;
  updateBook: Book;
  deleteBook: Scalars["Boolean"];
};

export type MutationCreateBookArgs = {
  title: Scalars["String"];
  author: Scalars["String"];
};

export type MutationUpdateBookArgs = {
  id: Scalars["String"];
  title: Scalars["String"];
  author: Scalars["String"];
};

export type MutationDeleteBookArgs = {
  id: Scalars["String"];
};

export type Query = {
  books?: Maybe<Array<Maybe<Book>>>;
};

export type CreateBookMutationVariables = {
  title: Scalars["String"];
  author: Scalars["String"];
};

export type CreateBookMutation = { __typename?: "Mutation" } & {
  createBook: { __typename?: "Book" } & Pick<Book, "id" | "title" | "author">;
};

export type DeleteBookMutationVariables = {
  id: Scalars["String"];
};

export type DeleteBookMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteBook"
>;

export type UpdateBookMutationVariables = {
  id: Scalars["String"];
  title: Scalars["String"];
  author: Scalars["String"];
};

export type UpdateBookMutation = { __typename?: "Mutation" } & {
  updateBook: { __typename?: "Book" } & Pick<Book, "id" | "title" | "author">;
};

export type BooksQueryVariables = {};

export type BooksQuery = { __typename?: "Query" } & {
  books: Maybe<
    Array<
      Maybe<{ __typename?: "Book" } & Pick<Book, "id" | "title" | "author">>
    >
  >;
};

import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";

export const CreateBookDocument = gql`
  mutation CreateBook($title: String!, $author: String!) {
    createBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

export function useCreateBookMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateBookMutation,
    CreateBookMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateBookMutation,
    CreateBookMutationVariables
  >(CreateBookDocument, baseOptions);
}
export const DeleteBookDocument = gql`
  mutation DeleteBook($id: String!) {
    deleteBook(id: $id)
  }
`;

export function useDeleteBookMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteBookMutation,
    DeleteBookMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteBookMutation,
    DeleteBookMutationVariables
  >(DeleteBookDocument, baseOptions);
}
export const UpdateBookDocument = gql`
  mutation UpdateBook($id: String!, $title: String!, $author: String!) {
    updateBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

export function useUpdateBookMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateBookMutation,
    UpdateBookMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateBookMutation,
    UpdateBookMutationVariables
  >(UpdateBookDocument, baseOptions);
}
export const BooksDocument = gql`
  query Books {
    books {
      id
      title
      author
    }
  }
`;

export function useBooksQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<BooksQueryVariables>
) {
  return ReactApolloHooks.useQuery<BooksQuery, BooksQueryVariables>(
    BooksDocument,
    baseOptions
  );
}
