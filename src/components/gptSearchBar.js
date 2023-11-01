import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

function GptSearchBar() {
  const dispatch=useDispatch();
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);

// search movie in tmdb got from openAI
const searchMovieTMDB=async (movie)=>{
  const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS);
  const json= await data.json();
  return json.results


}



  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery}],
      model: "gpt-3.5-turbo",
    });
    if(!gptResults.choices){
      //write error handling
    }
    console.log(gptResults.choices[0].message.content);
    const gptMovies=gptResults.choices[0]?.message?.content.split(","); // this will give the movies in array with coma seperation

    //for each movie i will search TMDB api

    const promiseArray=gptMovies.map(movie=>searchMovieTMDB(movie)) //this will return an array of promises
    const tmdbResults= await Promise.all(promiseArray)
    console.log(tmdbResults)

    dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults,}))

  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form
        className=" w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-2 m-3 col-span-9"
          placeholder={lang[langKey].gptSearchholder}
        />
        <button
          className=" col-span-3 py-2 px-3 m-4 bg-red-700 text-white rounded-lg "
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
