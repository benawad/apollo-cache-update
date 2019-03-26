import React from "react";
import { CreateBookManual } from "./components/CreateBookManual";
import { CreateBookRefetch } from "./components/CreateBookRefetch";
import { UpdateBook } from "./components/UpdateBook";
import { useBooksQuery } from "./generated/ApolloComponents";

const App = () => {
  const { data } = useBooksQuery();

  return (
    <div className="App">
      {(data!.books || []).map(b => (
        <div key={b.id}>
          {b.title}: {b.author}
        </div>
      ))}
      <CreateBookRefetch />
      <UpdateBook />
      <CreateBookManual />
    </div>
  );
};

export default App;
