import axios from "axios";

const API_KEY = "0495430129e2b5effe471116f8e7e303";
const POPULAR_MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(POPULAR_MOVIE_URL);
    const popularMovies = response.data.results;
    console.log(popularMovies);
    return popularMovies;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

export const getMovieDetails = async ({ movieId }) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );
    if (response && response.data) {
      return response.data;
    } else {
      console.error("No data received from the API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
export const getSimilarMovie = async ({ movieId }) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`
    );
    if (response && response.data) {
      return response.data;
    } else {
      console.error("No data received from the API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};