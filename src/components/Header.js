import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/redux/userSlice";
import { LOGO, SUPPORTED_LANGUAGES} from "../utils/constants";
import { toggleGptSearchView } from "../utils/redux/gptSlice";
import { changeLanguage } from "../utils/redux/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)

  const handleSignOut = () => {
    //sign out api
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };


  //check the authentication of the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");

        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmou
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    };
 
    const handleLanguageChange = (e) => {
      console.log(e.target.value)
    dispatch(changeLanguage(e.target.value))
    }
    

  return (
    <div className="absolute w-full p-2 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="md:w-44 w-36 mx-auto md:mx-0" src={LOGO} alt="logo" />
      

      {user && (
        <div className="flex md:p-3 justify-between items-center">
        { showGptSearch&& <select
            className="p-2 m-2  bg-gray-900 text-white rounded-lg"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
           {showGptSearch?"HomePage":"GPT Search" }
          </button>
          <img className="hidden md:block w-12 h-12 rounded-xl" src={user?.photoURL} alt="usericon" />
          <button onClick={handleSignOut} className="py-2 px-4 mx-2 my-2 bg-purple-800 text-white rounded-lg">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
