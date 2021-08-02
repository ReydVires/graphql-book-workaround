import { AddBook } from "./components/AddBook";
import { BookList } from "./components/BookList";

const App = () => {
  return (
    <div className="main">
      <h1>Book reading list!</h1>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;
