import { getBookQuery } from "../queries/queries";
import { useQuery } from "@apollo/client";

export const BookDetails = ({ bookId }) => {
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: { id: bookId }
	});

	if (loading) return (<p>Retrieve book detail...</p>);
	if (error) {
		console.log("Err::", error.message, bookId);
		return (<p>Something happend!</p>);
	}

	return (
		<div id="book-details">
			<h2>{data.book.name}</h2>
			<h3>{data.book.genre}</h3>
			<p>by {data.book.author.name}</p>
			<h4>All books by this Author:</h4>
			<ul className="other-books">
				{
					data.book.author.book.map((item) => (
						<li key={item.id}>
							{ item.name }
						</li>
					))
				}
			</ul>
		</div>
	);
};