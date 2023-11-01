import React from "react";
import GptSearchBar from "./gptSearchBar";
import GptMoviesSuggestion from "./gptMoviesSuggestion";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
   <> 
   <div className="fixed -z-10 ">
        <img
        className="h-screen object-cover md:h-screen"
          src={BG_URL}
          alt="logo"
        />
      </div>
   <div className="">
      
      <GptSearchBar />
      <GptMoviesSuggestion />
    </div>
    </>
  );
};

export default GptSearch;
