# Movie Night Application

## Overview

Movie Night is a Next.js application that allows users to discover popular movies, search for specific titles, and manage their list of liked movies. This application utilizes The Movie Database (TMDb) API to fetch movie details and provides a user-friendly interface for movie enthusiasts.

## Features

- **Search Functionality**: Easily search for movies by title.
- **Liked Movies**: Save your favorite movies and view them in the Liked Movies section.
- **Responsive Design**: Fully responsive layout that works on mobile and desktop devices.
- **Dynamic Routing**: Navigate to detailed pages for each movie.
- **Local Storage**: Persist liked movies using local storage.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **API**: The Movie Database (TMDb) API
- **State Management**: React Hooks

## Getting Started

To run the application locally, follow these steps:

### Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/movie-night.git
   cd movie-night

2. Install dependencies:
npm install

3. Create a .env.local file in the root of your project and add your TMDb API key:
TMDB_API_KEY=your_api_key_here

4. Start the development server:
npm run dev

5. Open your browser and navigate to http://localhost:3000 to view the application.

Usage
# Use the search bar in the navigation to find movies.
# Click on the heart icon to like a movie. Liked movies will be stored in local storage.
# Click on any movie card to view more details.




