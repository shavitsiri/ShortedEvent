

export function validFirstName (firstName)  {// פונקציה לבדיקת השם הפרטי
    if(firstName.length < 2){
        return false;
    }
    for (let i = 0; i < firstName.length; i++) {
        if (!(firstName[i] >= 'א' && firstName[i] <= 'ת')) {
            return false;
        }
    }
    return true;
}

export function validPassword (password)  {// פונקציה לבדיקת הסיסמא 
    if(password.length < 4){
        return false;
    }
    return true;
}