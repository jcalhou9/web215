const API =
  process.env.NODE_ENV === 'development'
    ? ''
    : process.env.REACT_APP_API_BASE_URL;

export default API;