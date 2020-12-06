import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/',
  cache: new InMemoryCache()
});

export const ApiProvider = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)