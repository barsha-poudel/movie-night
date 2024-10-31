"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../Component/Navbar";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";

const MovieNight = () => {
  const router = useRouter();
  const [likedMovies, setLikedMovies] = useState([]);

  // Fetch liked movies from local storage on component mount
  useEffect(() => {
    const savedLikedMovies =
      JSON.parse(localStorage.getItem("likedMovies")) || [];
    setLikedMovies(savedLikedMovies);
  }, []);

  // Navigate to the movie detail page
  const handleMoreDetailsClick = (movieId) => {
    router.push(`/DetailPage/${movieId}`);
  };

  // Toggle Like: Remove from likedMovies if already present
  const handleToggleLike = (movieId) => {
    const updatedLikedMovies = likedMovies.filter(
      (movie) => movie.id !== movieId
    );
    setLikedMovies(updatedLikedMovies);
    localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
  };

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  console.log(likedMovies.map((movie) => movie.id));

  return (
    <div className="bg-primary w-full h-auto">
      <NavBar />
      <div className="pt-12 px-[5%]">
        <p className="text-4xl text-secondary font-semibold">
          Movie Night List
        </p>
      </div>
      <div className="grid gap-8 px-[5%] py-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {likedMovies.length > 0 ? (
          likedMovies.map((movie) => (
            <div
              key={movie.id} // Ensure movie.id is unique
              className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
            >
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray2 line-clamp-1">
                    {movie.title}
                  </h2>
                </div>
                <p className="text-gray text-sm mt-2 line-clamp-2">
                  {movie.description}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="px-4 py-2 bg-[#48c9b0] text-white text-sm font-semibold rounded hover:bg-[#29b0b0]"
                    onClick={() => handleMoreDetailsClick(movie.id)}
                  >
                    More Details
                  </button>
                  <button
                    title="Remove from Movie Night"
                    onClick={() => handleToggleLike(movie.id)}
                  >
                    <FaHeart className="text-2xl text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-secondary px-[5%] py-[2%]">
          No liked movies yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieNight;
