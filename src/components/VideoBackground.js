import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
const VideoBackground = ({ movieId }) => {
    const trailerVideo=useSelector(store=>store.movies?.trailerVideo)

useMovieTrailer(movieId);
  return (
    <div className="w-full flex items-center justify-center mt-42">
      <iframe
      className="w-full aspect-video" 
        src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?&autoplay=1&mute=1&loop=1&controls=0"}
        title="YouTube video player"
        
        allow="accelerometer ;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        
      ></iframe>
    </div>
  );
};

export default VideoBackground;
