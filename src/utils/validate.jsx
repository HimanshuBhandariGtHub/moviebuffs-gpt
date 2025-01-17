export const checkValidateData = (email, password, fullName) =>{

    // console.log(fullName);
    
    const isFullNameValid =/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(fullName);
    const isEmailValid = /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email); 
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/.test(password);

    if(!isFullNameValid) return "Name not valid";
    if(!isEmailValid) return "Email Id not valid";
    if(!isPasswordValid) return "Password not valid";
    

    return null; 

}