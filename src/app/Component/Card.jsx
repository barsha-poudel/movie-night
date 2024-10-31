"use client";
import { fetchPopularMovies, getMovieDetails } from "../../../Services/event";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function MovieRatingCard({matchedMovies}) {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState(() => {
    const savedLikedMovies = localStorage.getItem("likedMovies");
    return savedLikedMovies ? JSON.parse(savedLikedMovies) : [];
  });

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
    if (details) {
      router.push(`/DetailPage/${movieId}`);
    } else {
      console.error("Failed to fetch movie details");
    }
  };

  const handleToggleLike = (movie) => {
    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      description: movie.overview || movie.description, // choose between overview or description
    };
  
    let updatedLikedMovies;
  
    // Check if the movie is already liked
    if (likedMovies.some((liked) => liked.id === movie.id)) {
      // If already liked, remove it from the list
      updatedLikedMovies = likedMovies.filter((liked) => liked.id !== movie.id);
    } else {
      // Add the new movie to the liked list
      updatedLikedMovies = [...likedMovies, movieData];
    }
  
    setLikedMovies(updatedLikedMovies);
    localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
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
              <p className="text-gray text-sm line-clamp-2">{movie.overview}</p>
            </div>
            <div className="flex items-center pt-4">
              <span className="text-yellow-500 text-xl">⭐</span>
              <span className="text-gray2 ml-2 text-lg">{movie.popularity}</span>
            </div>
            <p className="mt-3 text-gray2 text-sm line-clamp-2">{movie.description}</p>
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-[#48c9b0] text-white text-sm font-semibold rounded hover:bg-[#29b0b0]"
                onClick={() => handleMoreDetailsClick(movie.id)}
              >
                More Details
              </button>
              <button
  title="Add to movie night"
  onClick={() => handleToggleLike(movie)}
>
  {likedMovies.some((liked) => liked.id === movie.id) ? (
    <FaHeart className="text-2xl text-red-500" />
  ) : (
    <FaRegHeart className="text-2xl text-white" />
  )}
</button>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieRatingCard;
