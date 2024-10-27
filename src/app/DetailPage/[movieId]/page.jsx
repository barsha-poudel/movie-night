"use client";
import NavBar from "@/app/Component/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../../../Services/event";

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
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full max-w-2xl h-auto mt-4 mx-auto"
        />
        <p className="mt-4 text-gray-700">{movie.overview}</p>
        <p className="mt-2 text-gray-600">Rating: {movie.vote_average} ⭐</p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
