// apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define your GraphQL endpoint
// const httpLink = new HttpLink({
//   uri: 'https://jobtracker-dgfka2b8g9h7brbn.canadacentral-01.azurewebsites.net/graphql', // replace with your GraphQL API endpoint
// });

const httpLink = new HttpLink({
  uri: 'http://localhost:5229/graphql', // replace with your GraphQL API endpoint
});

// Add the access token to the Authorization header
const createApolloClient = (accessToken: any) => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  }));

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
