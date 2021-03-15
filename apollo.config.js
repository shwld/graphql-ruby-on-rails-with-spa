module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: 'http://localhost:3000/graphql',
    },
    // Files processed by the extension
    includes: [
      'app/javascript/**/*.tsx',
      'app/javascript/**/*.js',
      'app/javascript/**/*.ts',
    ],
  },
}
