"use client";
import NavBar from "./Component/Navbar";
import HeroSection from "./Component/HeroSection";
import MovieRatingCard from "./Component/Card";
import { useEffect } from "react";
import { fetchPopularMovies } from "../../Services/event";

export default function Home() {
  return (
    <div className="bg-primary w-full h-full">
      <NavBar />
      <HeroSection />
      <div className="pt-12 px-[5%]">
        <p className="text-4xl text-secondary font-semibold">Popular Movies</p>
      </div>
      <div className=" px-[5%] py-[2%]">
        <MovieRatingCard />
      </div>
    </div>
  );
}
