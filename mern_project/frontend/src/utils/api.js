const API = 
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : process.env.REACT_APP_API_URL;

export default API;