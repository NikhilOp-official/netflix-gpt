export const checkValidData=(email,password)=>{

    const isEmailValid=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)   //regex for valodation

    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)


    if(!isEmailValid) return "Email is not valid"
    if(!isPasswordValid) return "Please enter a valid Password"

    return null;

}