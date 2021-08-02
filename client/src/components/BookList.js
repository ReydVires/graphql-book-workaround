import { BookDetails } from "./BookDetails";
import { getBooksQuery } from "../queries/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export const BookList = () => {
	const { loading, error, data } = useQuery(getBooksQuery);

	const [selectedBookId, setSelectedBookId] = useState("");

	const handleClickBookList = (bookId) => {
		setSelectedBookId(bookId);
	};

	if (loading) return (<p>Loading books...</p>);
	if (error) {
		console.log("Seek err::", error);
		return (<p>Something happend!</p>);
	}

	return (
		<div>
			<ul id="book-list">
				{
					data.books.map((book) => (
						<li
							key={book.id}
							onClick={() => handleClickBookList(book.id)}
						>
							{book.name} by {book.author.name}
						</li>
					))
				}
			</ul>
			{
				(!!selectedBookId)
				? <BookDetails bookId={selectedBookId} />
				: <p><i>No book selected!</i></p>
			}
		</div>
	);
};