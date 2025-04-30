# Movie Search Engine

This is a web application designed to search for movies and manage a watchlist using React, Vite, and the TMDB API.

## Features

### 1. **Search for Movies**
- A search bar is available on the Home page to find movies based on user queries.
- The search results are displayed in a grid format with movie posters and titles.

### 2. **Trending Movies**
- The homepage displays a trending movie with a beautiful background image.
- Users can view the title and click on a "Watch Now" button to explore more about the trending movie.

### 3. **Movie Details**
- Each movie has a dedicated details page providing:
  - Title and poster.
  - Overview/description of the movie.
  - A trailer section (if available).
  - Options to add the movie to the watchlist.

### 4. **Watchlist Management**
- Users can maintain a watchlist to save their favorite movies.
- Features include:
  - Adding movies to the watchlist from the Home or Details page.
  - Viewing all saved movies in a dedicated "Watchlist" page.
  - Removing movies from the watchlist.

### 5. **Responsive Design**
- The application is optimized for both desktop and mobile devices.
- Components such as grids, buttons, and navigation adapt seamlessly to different screen sizes.

### 6. **Smooth Navigation**
- The app uses React Router for client-side navigation.
- Pages include:
  - Home (`/`)
  - Movie Details (`/movie/:id`)
  - Watchlist (`/watchlist`)

### 7. **API Integration**
- The app fetches data from the [TMDB API](https://www.themoviedb.org/documentation/api) for:
  - Movie search results.
  - Trending movie data.
  - Movie trailers and details.
  
### 8. **Modern Tech Stack**
- Built using:
  - **React** for UI components.
  - **Vite** as the build tool for fast development.
  - **TailwindCSS** for styling.
  - **React Icons** for icons.

### 9. **Interactive UI**
- Buttons with hover and active states for enhanced user interactivity.
- Grid-based layouts for a clean and structured display.

---

## Getting Started

### Prerequisites
- Node.js installed on your system.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/suraj265/movieSearchEngine.git
   ```
2. Navigate to the project directory:
   ```bash
   cd movieSearchEngine
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173`.

---

## Contributing
Contributions are welcome! Feel free to fork the repo and submit pull requests.

---

## License
This project is licensed under the MIT License.
