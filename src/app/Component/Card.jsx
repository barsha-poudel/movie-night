"use client";
import { fetchPopularMovies, getMovieDetails } from "../../../Services/event";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function MovieRatingCard() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [detailsMovie, setDetailsMovie] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchPopularMovies();
      setMovies(response);
    };
    getMovies();
  }, []);

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
    <div className="grid gap-8 px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
    {movies.map((movie) => (
      <div
        key={movie.id}
        className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
      >
        <img
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray2 line-clamp-1">
            {movie.title}
          </h2>
          <div className="flex items-center mt-2">
            <p className="text-gray text-sm line-clamp-2">
              {movie.overview}
            </p>
          </div>
          <div className="flex items-center pt-4">
            <span className="text-yellow-500 text-xl">⭐</span>
            <span className="text-gray2 ml-2 text-lg">
              {movie.popularity}
            </span>
          </div>
          <p className="mt-3 text-gray2 text-sm line-clamp-2">
            {movie.description}
          </p>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-[#48c9b0] text-white text-sm font-semibold rounded hover:bg-[#29b0b0]"
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
