import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black w-full">
        <div className="  md:-mt-64 -mt-10 pl-4 md:pl-4 relative z-20 w-full">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />

          <MovieList
            title={"Top Rated Movies"}
            movies={movies.topRatedMovies}
          />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies.upcomingMovies}
          />
          <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies} />
        </div>
        {/**
       * movieList-popular
       * movieList-nowPlaying
       * movieList-trending
       * movieList-horror
       * 
      
      
  */}
      </div>
    )
  );
};

export default SecondaryContainer;
