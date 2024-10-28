import { IoNotificationsCircle } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchPopularMovies } from "../../../Services/event";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchPopularMovies();
      setMovies(response);
    };
    getMovies();
  }, []);

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, movies]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); 
    setSearchQuery(""); 
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
              />
              <button className="absolute right-4 top-2">
                <FaSearch className="text-xl text-gray-600" />
              </button>
              {searchQuery && (
                <div className="absolute w-full bg-white top-full mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                  {filteredMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer flex gap-4"
                    >
                      <img
                        alt="logo"
                        src={`${imageBaseUrl}${movie.poster_path}`}
                        className="rounded-full h-6 w-6"
                      />
                      <p> {movie.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-3">
              <IoNotificationsCircle className="text-4xl md:text-5xl text-[#c9cdcc]" />
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
            />
            <button className="absolute right-4">
              <FaSearch className="text-xl text-gray-600" />
            </button>
          </div>
          {searchQuery && (
            <div className="absolute w-full bg-white mt-2 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer flex gap-4"
                 
                >
                  <img
                    alt="logo"
                    src={`${imageBaseUrl}${movie.poster_path}`}
                    className="rounded-full h-6 w-6"
                  />
                  <p> {movie.title}</p>
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
            <div className="text-gray">
              <p className="text-lg">Barsha Poudel</p>
              <p className="text-sm">Hi, good morning Barsha</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
