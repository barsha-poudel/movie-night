"use client";
import { getSimilarMovie } from "../../../Services/event";
import { useEffect, useState } from "react";
import Link from "next/link";

function SimilarMovieCard({ movieId }) {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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
  console.log(similarMovies);
  return (
    <div className="grid gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {similarMovies.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-200 hover:scale-105">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-[200px]">
              <h2 className="text-xl font-semibold text-gray-200 line-clamp-1">
                {movie.original_title}
              </h2>
              <div className="mt-2">
                <p className="text-gray-300 text-sm line-clamp-2">
                  {movie.overview}
                </p>
              </div>
              <div className="pt-4 flex items-center">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="text-gray-200 ml-2">
                  {Number(movie.vote_average).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SimilarMovieCard;
