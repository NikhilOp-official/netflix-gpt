export const checkValidData=(email,password,name)=>{

    const isEmailValid=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)   //regex for validation

    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    const isNameValid=/^([a-zA-z,/.-]+)\s([a-zA-z,/.-]+)$/.test(name)   



    if(!isEmailValid) return "Email is not valid"
    if(!isPasswordValid) return "Please enter a valid Password"
    if(!isNameValid) return "Write Full Name and first letter capital"

    return null;

}