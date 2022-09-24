export function validFirstName(firstName) { // פונקציה לבדיקת השם הפרטי
    if (firstName.length < 2) {
        return false;
    }
    for (let i = 0; i < firstName.length; i++) {
        if (!(firstName[i] >= 'א' && firstName[i] <= 'ת')) {
            return false;
        }
    }
    return true;
}

export function validPhoneNumber(phoneNumber) {
    if (phoneNumber.length !== 10) {
        return false;
    }
    for (let i = 0; i < phoneNumber.length; i++) {
        if (phoneNumber[i] > '9' || phoneNumber[i] < '0') {
            return false;
        }
    }
}

export function validEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}

export function validPassword(password) { // פונקציה לבדיקת הסיסמא 
    if (password.length < 6) {
        return false;
    }
    return true;
}

/// ולידציה לטופס יצירת אירוע

export function validCity(city) {
    if (city === undefined || city.length < 2) {
        return false;
    }
    return true;
}

export function validStreet(street) {
    if (street === undefined || street.length < 2) {
        return false;
    }
    for (let i = 0; i < street.length; i++) {
        if (street[i] !== " ") {
            if (street[i] < 'א' || street[i] > 'ת') {
                return false;
            }
        }
    }
    return true;
}

export function validHouseNumber(houseNumber) {
    if (houseNumber === undefined || houseNumber <= 0) {
        return false;
    }
    for (let i = 0; i < houseNumber.length; i++) {
        if (houseNumber[i] < '0' || houseNumber[i] > '9') {
            return false;
        }
    }
    return true;
}

export function validDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var today = new Date();
    var todayday = today.getDate()
    var todaymonth = today.getMonth() + 1;
    var todayyear = today.getFullYear();
    if (year < todayyear) {
        return false;
    }
    if (year == todayyear && month < todaymonth) {
        return false;
    }
    if(year == todayyear && month == todaymonth && day < todayday  ){
        return false;
    }
    return true;
}

export function validSupllier(supllier) {
    if (supllier === null || supllier === undefined) {
        return false;
    }
    return true;
}

export function validRequires(requireList) {
    if (requireList[0] === null || requireList[0] === undefined) {
        return false;
    }

    return true;
}