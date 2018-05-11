export function isEmptyString(value) {
    return value === "";
}

export function isMatch(valueA, valueB) {
    return valueA === valueB;
}

export function isOnlyNumeric(value) {
    return /^\d+$/.test(value);
}

export function isPhoneNumber(value) {
    return isOnlyNumeric(value) && // Check if the value is solely comprised by numbers
        ((value.length === 9) || (value.length === 10)); // Check the length of the value
}

export function isEmail(value) {
    return /^\w+@\w+\.\w+/.test(value);
}

export function isPassword(value) {
    // Get the list of digits in a string
    var digitsList = /[0-9]+/.exec(value) || [];
    var digitsText = digitsList.join("");

    // Get the list of capital letters in a string
    var capitalLettersList = /[A-Z]+/.exec(value) || [];
    var capitalLettersText = capitalLettersList.join("");

    // Get the list of lower case letters in a string
    var lowerCaseLettersList = /[a-z]+/.exec(value) || [];
    var lowerCaseLettersText = lowerCaseLettersList.join("");

    return (value.length >= 8) &&
        (digitsText.length >= 2) &&
        (capitalLettersText.length >= 2) &&
        (lowerCaseLettersText.length >= 2);
}

export const invalidFieldStyle = {
    boxShadow: "0 0 1pt 1.5pt red",
};

export const invalidTipStyle = {
    display: "block",
    color: "red"
};

export const validTipStyle = {
    display: "none",
};
