export const server_url =
  process.env.NODE_ENV === 'production'
    ? 'https://testapp-onyx.herokuapp.com'
    : 'http://localhost:3001';
