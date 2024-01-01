import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/redux/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);   //this state variable used to toggle the signIn and signUp form
  const [errorMessage, setErrorMessage] = useState(null); // show error message of validating the data that comes from validate.js 
  const dispatch = useDispatch();


  //this useRef hook refers to the input box so that we can know what is types by the user and with useRef we do not have to use the state to get the value from the input.
  
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    //validating  the form data submited by the user  
   if(!isSignInForm) {const message = checkValidData(email.current.value, password.current.value,name.current.value);   // checkvalid data is a function exported from validate.js in utils and it will return a message that eg:invalid password or email
    console.log(message);
    setErrorMessage(message);
   if (message) return; //if the user does write valid inputs dont go ahead of this line 
}
    //after checking the validation above then sign in sign up logic
    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(        //this is a api by firebase for creating a user
        auth,         //this is stored in  central place  i.e firebase.js bcoz on every api call it is using this auth 
        email.current.value,
        password.current.value 
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          //update api
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:USER_AVATAR
              
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              //
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user= userCredential.user;
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };





//changing signIn form to Signup form
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    //LOGO of the app
    <div className="">
      <Header />
      <div className="absolute w-screen">
        <img
        className="h-screen w-full object-cover"
          src={BG_URL}
          alt="logo"
        />
      </div>

        {/* login form of the app */}
      <form
        onSubmit={(e) => e.preventDefault()}    //used to prevent the default behavior of the form
        className=" w-full md:w-3/12 absolute p-10 bg-black  my-36 md:my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold  text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {/* if signup then only show this input field */}
        {!isSignInForm && (
          
          <input
          ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full  bg-gray-700 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full  bg-gray-700 rounded-lg"
        />
        <p className="text-red-500 font-bold text-lg p">{errorMessage}</p>   {/*this will show  a message that eg:invalid password or email */}
        <button
          className="p-4 my-6 mx-0 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer " onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
