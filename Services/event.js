import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(BASE_URL+`/popular?api_key=${API_KEY}`);
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
      BASE_URL+`/${movieId}?api_key=${API_KEY}`
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
      BASE_URL+`/${movieId}/similar?api_key=${API_KEY}`
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