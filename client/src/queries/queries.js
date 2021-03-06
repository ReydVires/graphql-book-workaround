import { gql } from "@apollo/client";

export const getAuthorsQuery = gql`
	{
		authors {
			id
			name
		}
	}
`;

export const getBooksQuery = gql`
	{
		books {
			id
			name
			author {
				name
			}
		}
	}
`;

export const addBookMutation = gql`
	mutation ($name: String!, $genre: String!, $authorId: ID!) {
		addBook (name: $name, genre: $genre, authorId: $authorId) {
			id
			name
		}
	}
`;

export const getBookQuery = gql`
	query ($id: ID!) {
		book (id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				book {
					id
					name
				}
			}
		}
	}
`;