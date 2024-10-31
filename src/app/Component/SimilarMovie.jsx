"use client";
import { getSimilarMovie, getMovieDetails } from "../../../Services/event";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function SimilarMovieCard({ movieId, setSelectedMovie }) {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (!movieId) return;

      try {
        setLoading(true);
        const similar = await getSimilarMovie({ movieId });
        setSimilarMovies(similar.results);
      } catch (err) {
        console.error("Failed to fetch similar movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  useEffect(()=>{
    const savedLikedMovies = localStorage.getItem("likedMovies");
    setLikedMovies(() => savedLikedMovies ? JSON.parse(savedLikedMovies) : []);
  },[])

  const handleToggleLike = (movie) => {
    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      description: movie.overview || movie.description, // choose between overview or description
    };

    let updatedLikedMovies;

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

  const handleShowDetails = async (movieId) => {
    try {
      const details = await getMovieDetails({ movieId });
      setSelectedMovie(details); // Update the selected movie in the parent
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Failed to fetch movie details:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-xl text-gray-200">Loading similar movies...</p>
      </div>
    );
  }

  if (!similarMovies?.length) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-xl text-gray-200">No similar movies found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {similarMovies.map((movie) => (
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
                  onClick={() => handleShowDetails(movie.id)}
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
    </div>
  );
}

export default SimilarMovieCard;
