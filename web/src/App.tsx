import React from "react";
import { useQuery } from "react-apollo-hooks";
import { booksQuery } from "./graphql/books/queries/books";

const App = () => {
  const { data } = useQuery(booksQuery);

  console.log(data);

  return <div className="App">yolo</div>;
};

export default App;
