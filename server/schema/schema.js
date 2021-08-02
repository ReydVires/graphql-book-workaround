const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
} = require("graphql");

const BookModel = require("../models/book");
const AuthorModel = require("../models/author");

const BookType = new GraphQLObjectType({
	name: "Book",
	// Use function instead of direct object, so will run properly by step execute!
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType, // Make an associate 1 on 1
			resolve: (parent, args) => {
				// parent is ref for Book data
				// return authors.find((item) => item.id === parent.authorId);
				return AuthorModel.findById(parent.authorId);
			},
		}
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		book: {
			type: new GraphQLList(BookType), // Make an associate list
			resolve: (parent, args) => {
				// return books.filter((item) => item.authorId === parent.id);
				return BookModel.find({ authorId: parent.id });
			},
		}
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				// Code to get data from db
				// return books.find((item) => item.id === args.id);
				return BookModel.findById(args.id);
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => {
				return BookModel.find({});
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID }
			},
			resolve: (parent, args) => {
				// return authors.find((item) => item.id === args.id);
				return AuthorModel.findById(args.id);
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve: (parent, args) => {
				return AuthorModel.find({});
			}
		}
	}),
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve: (parent, args) => {
				const author = new AuthorModel({
					name: args.name,
					age: args.age,
				});
				return author.save(); // Save at db
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: (parent, args) => {
				const book = new BookModel({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				});
				return book.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});