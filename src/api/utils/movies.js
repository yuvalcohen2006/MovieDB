const axios = require("axios");

const getMovie = (name) => {
  const url = `http://www.omdbapi.com/?t=${name}&apikey=${process.env.MOVIE_API_KEY}`;
  return axios.get(url).then((res) => res.data);
};

module.exports = getMovie;
