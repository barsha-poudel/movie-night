"use client";
import NavBar from "@/app/Component/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../../../Services/event";
import SimilarMovieCard from "@/app/Component/SimilarMovie";

export default function DetailPage() {
  const params = useParams();
  const movieId = params.movieId;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;

      try {
        setLoading(true);
        const details = await getMovieDetails({ movieId });
        if (details) {
          setMovie(details);
        } else {
          setError("Failed to fetch movie details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">No movie details found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen bg-primary text-gray">
      <NavBar />
      <div className="px-6 md:px-[5%] py-10 flex flex-col md:flex-row gap-8 text-gray-200">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:max-w-xs h-auto rounded-xl shadow-lg"
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-6xl md:text-5xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray italic text-2xl">
            {movie.tagline || "No tagline available"}
          </p>

          <div className="mt-4 space-y-3">
            <p className="text-gray-300 leading-relaxed italic text-xl">
              {movie.overview}
            </p>

            <p className="text-yellow-400 text-lg font-semibold">
              Rating: {movie.vote_average} ⭐
            </p>
          </div>

          <div className="mt-6 space-y-2 text-gray-300">
            {/* Genre */}
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg text-secondary">Genre:</p>
              <div className="space-x-2">
                {movie.genres.map((genre, index) => (
                  <span key={genre.id} className="text-lg">
                    {genre.name}
                    {index < movie.genres.length - 1 && ","}
                  </span>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg text-secondary">Language:</p>
              <span className="text-lg">
                {movie.original_language === "es" ? "Spanish" : "English"}
              </span>
            </div>

            {/* Country */}
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg text-secondary">Country:</p>
              <span className="text-lg">
                {movie.origin_country.includes("US")
                  ? "United States"
                  : "Spain"}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg text-secondary">Status:</p>
              <span className="text-lg">{movie.status}</span>
            </div>

            {/* Release Date */}
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg text-secondary">
                Release Date:
              </p>
              <span className="text-lg">{movie.release_date}</span>
            </div>
          </div>

          <button
            onClick={() => window.history.back()}
            className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-md w-36"
          >
            Go Back
          </button>
        </div>
      </div>
      <div>
        <div className="md:px-[5%]">
          <p className="text-4xl text-secondary font-semibold pb-6">
            Similar Movies
          </p>
          <SimilarMovieCard movieId={movieId} />
        </div>
      </div>
    </div>
  );
}
