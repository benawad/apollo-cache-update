import { Field, Form, Formik } from "formik";
import * as React from "react";
import {
  BooksDocument,
  BooksQuery,
  useCreateBookMutation
} from "../generated/ApolloComponents";

interface Props {}

export const CreateBookManual: React.FC<Props> = () => {
  const createBook = useCreateBookMutation();

  return (
    <Formik
      initialValues={{ title: "", author: "" }}
      onSubmit={({ title, author }) => {
        createBook({
          variables: { title, author },
          update: (store, { data }) => {
            // you could wrap this in a try/catch
            const bookData = store.readQuery<BooksQuery>({
              query: BooksDocument
            });

            store.writeQuery<BooksQuery>({
              query: BooksDocument,
              data: {
                books: [...bookData!.books, data!.createBook]
              }
            });
          }
        });
      }}
    >
      {() => (
        <Form>
          <Field name="title" />
          <Field name="author" />
          <button type="submit">save</button>
        </Form>
      )}
    </Formik>
  );
};
