import { Field, Form, Formik } from "formik";
import produce from "immer";
import * as React from "react";
import {
  BooksDocument,
  useCreateBookMutation
} from "../generated/ApolloComponents";

interface Props {}

export const DeepNested: React.FC<Props> = () => {
  const createBook = useCreateBookMutation();

  return (
    <Formik
      initialValues={{ title: "", author: "" }}
      onSubmit={({ title, author }) => {
        createBook({
          variables: { title, author },
          update: (store, { data }) => {
            // you could wrap this in a try/catch
            const bookData = store.readQuery<any>({
              query: BooksDocument
            });

            store.writeQuery({
              query: BooksDocument,
              data: {
                collection: {
                  ...bookData!.collection,
                  authors: bookData!.collection.authors.map((author: any) => {
                    return {
                      ...author,
                      books:
                        data!.createBook.author === author.name
                          ? data!.createBook
                          : author.books
                    };
                  })
                }
              }
            });

            store.writeQuery({
              query: BooksDocument,
              data: produce(bookData, x => {
                x.collection.authors[0].books.push(data!.createBook);
              })
            });

            // store.writeQuery({
            //   query: RecentBooksDocument,
            //   data: produce(bookData, x => {
            //     x.collection.authors[0].books.push(data!.createBook);
            //   })
            // });
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
