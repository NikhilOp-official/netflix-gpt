import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

function GptSearchBar() {

  const langKey=useSelector((store)=>store.config.lang)
  return (
    <div className="pt-[10%] flex justify-center">
        
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-2 m-3 col-span-9"
          placeholder={lang[langKey].gptSearchholder}
        />
        <button className=" col-span-3 py-2 px-3 m-4 bg-red-700 text-white rounded-lg ">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
