import { Field, Form, Formik } from "formik";
import * as React from "react";
import { useUpdateBookMutation } from "../generated/ApolloComponents";

interface Props {}

export const UpdateBook: React.FC<Props> = () => {
  const updateBook = useUpdateBookMutation();

  return (
    <Formik
      initialValues={{ id: "" }}
      onSubmit={({ id }) => {
        updateBook({
          variables: { id, title: "Coding and Coding", author: "ben" }
        });
      }}
    >
      {() => (
        <Form>
          <Field name="id" />
          <button type="submit">set ben as author</button>
        </Form>
      )}
    </Formik>
  );
};
