"use client";
import { fetchPopularMovies, getMovieDetails } from "../../../Services/event";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function MovieRatingCard() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [detailsMovie, setDetailsMovie] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchPopularMovies();
      setMovies(response);
    };
    getMovies();
  }, []);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const handleMoreDetailsClick = async (movieId) => {
    const details = await getMovieDetails({ movieId });
    console.log("Movie Details:", details);
    setDetailsMovie(details);
    if (details) {
      router.push(`/DetailPage/${movieId}`);
    } else {
      console.error("Failed to fetch movie details");
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white shadow-lg rounded-lg">
          <img
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {movie.title}
            </h2>
            <div className="flex items-center mt-2">
              <span className="text-black text-sm line-clamp-2">
                {movie.overview}
              </span>
            </div>
            <div className="pt-4">
              <span className="text-yellow-500 text-xl">⭐</span>
              <span className="text-gray-700 ml-2 text-lg">
                {movie.popularity}
              </span>
            </div>
            <p className="mt-3 text-gray-600 text-sm line-clamp-2">
              {movie.description}
            </p>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700"
                onClick={() => handleMoreDetailsClick(movie.id)}
              >
                More Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieRatingCard;
