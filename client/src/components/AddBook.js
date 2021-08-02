import { addBookMutation, getAuthorsQuery, getBooksQuery } from "../queries/queries";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

export const AddBook = () => {
	const { loading, error, data } = useQuery(getAuthorsQuery);
	const [addBook] = useMutation(addBookMutation);
	const [bookFormData, setBookFormData] = useState({
		name: "",
		genre: "",
		authorId: "",
	});

	useEffect(() => {
		console.log("at loading add?", loading);
	}, [loading]);

	const displayAuthors = () => {
		if (loading) return (<option disabled>Loading authors...</option>);
		if (error) return null;

		return data.authors.map((author) => (
			<option key={author.id} value={author.id}>
				{author.name}
			</option>
		));
	};

	const handleChangeName = (e) => {
		const name = e.target.value;
		setBookFormData({
			...bookFormData,
			name
		});
	};

	const handleChangeGenre = (e) => {
		const genre = e.target.value;
		setBookFormData({
			...bookFormData,
			genre
		});
	};

	const handleChangeAuthorOption = (e) => {
		const authorId = e.target.value;
		setBookFormData({
			...bookFormData,
			authorId
		});
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();
		console.log("handleSubmitForm::", bookFormData);
		addBook({
			variables: bookFormData,
			refetchQueries: [ { query: getBooksQuery } ]
		});
	};

	return (
		<form id="add-book" onSubmit={handleSubmitForm}>

			<div className="field">
				<label>Book name:</label>
				<input
					type="text"
					required
					onChange={handleChangeName}
				/>
			</div>

			<div className="field">
				<label>Genre:</label>
				<input
					type="text"
					required
					onChange={handleChangeGenre}
				/>
			</div>

			<div className="field">
				<label>Author:</label>
				<select required onChange={handleChangeAuthorOption}>
					<option value="">Select author</option>
					{
						displayAuthors()
					}
				</select>
			</div>

			<button type="submit" disabled={loading}>+</button>

		</form>
	);
};