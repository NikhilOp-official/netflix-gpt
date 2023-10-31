import Header from "./Header";
import  useNowPlayongMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
        useNowPlayongMovies();
        usePopularMovies();
          return (
    <div>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>

     { /** 
      * Maincontainer
      *    -videoBacground
      *    =videotitle
      * secondarycontainer
      *  -moviesList*n
      *   = cards*n
     */}
    </div>
  );
};

export default Browse;
