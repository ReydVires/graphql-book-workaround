import './index.css';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
