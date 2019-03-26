import { Field, Form, Formik } from "formik";
import * as React from "react";
import {
  BooksDocument,
  useCreateBookMutation
} from "../generated/ApolloComponents";

interface Props {}

export const CreateBookRefetch: React.FC<Props> = () => {
  const createBook = useCreateBookMutation();

  return (
    <Formik
      initialValues={{ title: "", author: "" }}
      onSubmit={({ title, author }) => {
        createBook({
          variables: { title, author },
          refetchQueries: [{ query: BooksDocument }]
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
