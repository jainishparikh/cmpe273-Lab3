import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, withApollo } from 'react-apollo';

const client = new ApolloClient( {
  uri: 'http://localhost:3001/graphql'
} );
export class App extends Component {
  render () {
    return (
      <ApolloProvider client={ client }>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </ApolloProvider >
    )
  }
}


export default App;
