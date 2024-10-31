import { IoNotificationsCircle } from "react-icons/io5";
import { FaSearch, FaHeart } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchPopularMovies, getMovieDetails } from "../../../Services/event";
import { useRouter } from "next/navigation";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likedMoviesCount, setLikedMoviesCount] = useState(0);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const router = useRouter();

  useEffect(() => {
    const likedMovies = localStorage.getItem("likedMovies");
    if (likedMovies) {
      try {
        const moviesArray = JSON.parse(likedMovies);
        setLikedMoviesCount(moviesArray.length);
      } catch (error) {
        console.error("Error parsing likedMovies from local storage:", error);
        setLikedMoviesCount(0);
      }
    } else {
      setLikedMoviesCount(0);
    }
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchPopularMovies();
      setMovies(response);
    };
    getMovies();
  }, []);

  useEffect(() => {
    setFilteredMovies(
      movies && movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, movies]);

  const handleMovieClick = async (movieId) => {
    console.log("Requested Movie ID:", movieId);
    const movieDetails = await getMovieDetails({ movieId });
    if (movieDetails) {
      router.push(`/DetailPage/${movieId}`);
    } else {
      console.error("Failed to fetch movie details");
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const movieDetails = await getMovieDetails({ movieId: searchQuery });
      if (movieDetails) {
        router.push(`/DetailPage/${searchQuery}`);
      } else {
        console.error("Failed to fetch movie details");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Function to like a movie and navigate to its detail page
  const likeMovie = (movieId) => {
    const likedMovies = localStorage.getItem("likedMovies");
    const moviesArray = likedMovies ? JSON.parse(likedMovies) : [];

    // Add the new movie ID if it's not already liked
    if (!moviesArray.includes(movieId)) {
      moviesArray.push(movieId);
      localStorage.setItem("likedMovies", JSON.stringify(moviesArray));
      setLikedMoviesCount(moviesArray.length); // Update state with new count
    }

    // Navigate to the detail page when a movie is liked
    router.push(`/DetailPage/${movieId}`);
  };

  return (
    <nav className="w-full bg-primary shadow-md">
      {/* Main Navbar */}
      <div className="px-4 md:px-[5%] py-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <p className="text-2xl md:text-4xl font-semibold text-secondary">
              M0vie.NiGht
            </p>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden text-gray p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <RiMenu3Line className="text-2xl" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-grow justify-end gap-4">
            {/* Search Bar */}
            <div className="flex justify-end max-w-md w-full relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full px-4 py-2 pr-12 rounded-full bg-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="absolute right-4 top-2" onClick={handleSearch}>
                <FaSearch className="text-xl text-gray-600" />
              </button>
              {searchQuery && (
                <div className="absolute w-full bg-white top-full mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                  {filteredMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer flex gap-4"
                      onClick={() => handleMovieClick(movie.id)}
                    >
                      <img
                        alt="logo"
                        src={`${imageBaseUrl}${movie.poster_path}`}
                        className="rounded-full h-6 w-6"
                      />
                      <p>{movie.title}</p>
                     
                     
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Heart Icon for liked movies */}
              <div className="relative">
                <button
                  onClick={() => router.push('/MovieNight')} // Navigate to liked movies page
                  className="flex items-center justify-center text-4xl text-red-500"
                >
                  <FaHeart />
                  {/* Liked Movies Count */}
                  {likedMoviesCount > 0 && (
                    <span className="absolute top-[-5px] right-[-10px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {likedMoviesCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="h-12 w-12 md:h-16 md:w-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/barsa-image.jpg"
                  alt="profile"
                  height={64}
                  width={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden lg:flex flex-col justify-center text-gray">
                <p className="text-lg md:text-xl">Barsha Poudel</p>
                <p className="text-sm">Hi, good morning Barsha</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-4 py-3 space-y-4">
          {/* Mobile Search */}
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full px-4 py-2 pr-12 rounded-full bg-white focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="absolute right-4" onClick={handleSearch}>
              <FaSearch className="text-xl text-gray-600" />
            </button>
          </div>
          {searchQuery && (
            <div className="absolute w-full bg-white mt-2 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer flex gap-4"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <img
                    alt="logo"
                    src={`${imageBaseUrl}${movie.poster_path}`}
                    className="rounded-full h-6 w-6"
                  />
                  <p>{movie.title}</p>
                  {/* Add Like Button with onClick event */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the movie click
                      likeMovie(movie.id);
                    }}
                    className="ml-auto text-red-500"
                  >
                    <FaHeart />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Profile Info */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-12 w-12 bg-white rounded-full overflow-hidden">
              <Image
                src="/barsa-image.jpg"
                alt="profile"
                height={48}
                width={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center text-gray">
              <p className="text-lg md:text-xl">Barsha Poudel</p>
              <p className="text-sm">Hi, good morning Barsha</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
