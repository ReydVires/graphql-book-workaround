const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Allow cross-origin request
app.use(cors());

// Connect to mongodb
const PASS = "12345678910";
const DATABASE_NAME= "test";
mongoose.connect(`mongodb+srv://reydvires:${PASS}@cluster0.l4kgq.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});
mongoose.connection.once("open", () => {
	console.log("Conneted to database!");
});

app.use("/graphql", graphqlHTTP({
	graphiql: true, // This make debug query accessible
	schema,
}));

app.listen(4000, () => {
	console.log("Running server on port 4000!");
});