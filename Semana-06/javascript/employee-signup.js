window.onload = function(){

    var inputName = document.getElementById("inputName");
    var inputSurname = document.getElementById("inputSurname");
    var inputId = document.getElementById("inputId");
    var inputBirth = document.getElementById("inputBirth");
    var inputPhone = document.getElementById("inputPhone");
    var inputAddress = document.getElementById("inputAddress");
    var inputLocality = document.getElementById("inputLocality");
    var inputZipcode = document.getElementById("inputZipcode");
    var inputMail = document.getElementById("inputMail");
    var inputConfirmMail = document.getElementById("inputConfirmMail");
    var inputPass = document.getElementById("inputPass");
    var inputConfirmPass = document.getElementById("inputConfirmPass");
    var signUpButton = document.getElementById("signUpBtn");
    var errorMessage = "";
    var nameAlertMsg = "";
    var surnameAlertMsg = "";
    var idAlertMsg = "";
    var phoneAlertMsg = "";
    var dateAlertMsg = "";
    var addressAlertMsg = "";
    var localityAlertMsg = "";
    var zipAlertMsg = "";
    var emailAlertMsg = "";
    var passAlertMsg = "";

    function checkLength (inputToValidate, minLength, maxLength){
        if (inputToValidate.value === "" ){
            errorMessage = "This input cannot be left blank.";
            inputToValidate.classList.add("wrongInput");
            appendErrorMesage(inputToValidate, errorMessage);
            return false;
        }
        if(maxLength === 0){
            if (inputToValidate.value.length < minLength) {
                errorMessage = "Input should have more than "+ minLength + " characters.";
                inputToValidate.classList.add("wrongInput");
                appendErrorMesage(inputToValidate, errorMessage);
                return false;
            }
        }else if(minLength === 0) {
            if (inputToValidate.value.length > maxLength) {
                errorMessage = "This input should have less than " + maxLength + " characters.";
                inputToValidate.classList.add("wrongInput");
                appendErrorMesage(inputToValidate, errorMessage);
                return false;
            }
        }else if (inputToValidate.value.length < minLength || inputToValidate.value.length > maxLength) {
                errorMessage = "This input should have between "+ minLength + " and " + maxLength + " characters.";
                inputToValidate.classList.add("wrongInput");
                appendErrorMesage(inputToValidate, errorMessage);
                return false;
            }
        return true;
    }

    function appendErrorMesage(inputToValidate, errorMessage){
        var errorMsg = document.createElement("p");
        errorMsg.classList.add("errorMessage");
        errorMsg.innerText = errorMessage;
        if (inputToValidate.parentNode.children.length >= 2  ){
            inputToValidate.parentNode.children[1].remove();
            inputToValidate.parentNode.append(errorMsg);
        } else {
            inputToValidate.parentNode.append(errorMsg);
        }
    }

    function removeClass(inputToValidate) {
        inputToValidate.classList.remove("wrongInput");
        inputToValidate.classList.remove("correctInput");
    }

    function onlyLetters(inputToValidate) {
        for(var i=0; i<inputToValidate.value.length; i++){
            if ( inputToValidate.value[i].toUpperCase() === inputToValidate.value[i].toLowerCase() ) {
                inputToValidate.classList.add("wrongInput");
                errorMessage = ("Use only letters.");
                appendErrorMesage(inputToValidate, errorMessage);
                return false;
            }
        }
        return true;
    }

    function onlyNumbers(inputToValidate) {
        for(var i=0; i<inputToValidate.value.length; i++){
            if ( Number.isNaN(parseInt(inputToValidate.value[i])) === true ) {
                errorMessage = "Use only numbers.";
                inputToValidate.classList.add("wrongInput");
                appendErrorMesage(inputToValidate, errorMessage);
                return false;
            }
        }
        return true;
    }

    function removeErrorShowGreen(inputToValidate) {
        console.log(inputToValidate.parentNode);
        if (inputToValidate.parentNode.children.length > 1  ){
            inputToValidate.parentNode.children[1].remove();
        }
        inputToValidate.classList.remove("wrongInput");
        inputToValidate.classList.add("correctInput");
    }

    function alphaNumeric(inputToValidate) {
        var inputValue = inputToValidate.value;
        var containsNumber = false;
        var containsLetter = false;
        for(var i=0; i<inputValue.length; i++){
            if( !(inputValue[i].toUpperCase() != inputValue[i].toLowerCase()) && !(Number.isNaN(parseInt(inputValue[i])) === false )) {
                errorMessage = "Your input should only have letters and numbers.";
                inputPass.classList.add("wrongInput");
                appendErrorMesage(inputToValidate, errorMessage);
                return false;
            }
            if( (inputValue[i].toUpperCase() != inputValue[i].toLowerCase()) ){
                containsLetter = true;
            }
            if( (Number.isNaN(parseInt(inputValue[i])) === false ) ){
                containsNumber = true;
            }
            if(containsLetter === true && containsNumber === true && i === (inputValue.length - 1) ){
                console.log("Valid password.");
                return true;
            }
        }
        if(containsLetter === true && containsNumber === false){
            errorMessage = "Your input is missing numbers.";
            inputPass.classList.add("wrongInput");
            appendErrorMesage(inputToValidate, errorMessage);
            return false;
        }
        if(containsLetter === false && containsNumber === true){
            errorMessage = "Your input is missing letters.";
            inputPass.classList.add("wrongInput");
            appendErrorMesage(inputToValidate, errorMessage);
            return false;
        }
        return false;
    }

    function validateAddress(address) {
        if (address.indexOf(" ") == -1){
            errorMessage = "Separate letters from numbers.";
            inputAddress.classList.add("wrongInput");
            appendErrorMesage(inputAddress, errorMessage);
            addressAlertMsg = "ERROR Address is invalid.";
            return false;
        } else{
    
            // if first char is letter
            if ( address[0].toUpperCase() !== address[0].toLowerCase() ) {
    
                //all chars up to blank space should be letter too
                for (var i=0; i< address.indexOf(" "); i++){
                    if (address[i].toUpperCase() === address[i].toLowerCase()) {
                        errorMessage = "Separate letters from numbers.";
                        inputAddress.classList.add("wrongInput");
                        appendErrorMesage(inputAddress, errorMessage);
                        addressAlertMsg = "ERROR Address is invalid.";
                        return false;
                    }
    
                }
                //all chars after blank space until end of string should not be letter.
                for (var i = address.indexOf(" ") ; i < address.length ; i++){
                    if (address[i].toUpperCase() !== address[i].toLowerCase()) {
                        errorMessage = "Separate letters from numbers.";
                        inputAddress.classList.add("wrongInput");
                        appendErrorMesage(inputAddress, errorMessage);
                        addressAlertMsg = "ERROR Address is invalid.";
                        return false;
                    }
                }
            }
            
        }
        return true;
    }
} 
