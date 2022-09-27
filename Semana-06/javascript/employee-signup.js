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

    function redBorder(inputToValidate) {
        inputToValidate.classList.remove("correctInput");
        inputToValidate.classList.add("wrongInput");
    }

    function onlyLetters(inputToValidate) {
        for(var i=0; i<inputToValidate.value.length; i++){
            if ( inputToValidate.value[i].toUpperCase() === inputToValidate.value[i].toLowerCase() ) {
                redBorder(inputToValidate);
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
                redBorder(inputToValidate);
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
                redBorder(inputToValidate);
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
            redBorder(inputToValidate);
            appendErrorMesage(inputToValidate, errorMessage);
            return false;
        }
        if(containsLetter === false && containsNumber === true){
            errorMessage = "Your input is missing letters.";
            redBorder(inputToValidate);
            appendErrorMesage(inputToValidate, errorMessage);
            return false;
        }
        return false;
    }

    function validateAddress(inputToValidate) {
        var address = inputToValidate.value;
        if (address.indexOf(" ") == -1){
            errorMessage = "Separate letters from numbers.";
            redBorder(inputToValidate);
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
                    redBorder(inputToValidate);
                    appendErrorMesage(inputAddress, errorMessage);
                    addressAlertMsg = "ERROR Address is invalid.";
                    return false;
                }

            }
            //all chars after blank space until end of string should not be letter.
            for (var i = address.indexOf(" ") ; i < address.length ; i++){
                if (address[i].toUpperCase() !== address[i].toLowerCase()) {
                    errorMessage = "Separate letters from numbers.";
                    redBorder(inputToValidate);
                    appendErrorMesage(inputAddress, errorMessage);
                    addressAlertMsg = "ERROR Address is invalid.";
                    return false;
                }
            }
        } else { //if first char is NOT letter
            errorMessage = "Address start with street name.";
            redBorder(inputToValidate);
            appendErrorMesage(inputAddress, errorMessage);
            addressAlertMsg = "ERROR Address is invalid.";
            return false;
        }
        
        }
        return true;
    }

    function validateInput (inputToValidate) {
        switch (inputToValidate) {            
            case "inputName":
                if (checkLength(inputName,4,0) === false || onlyLetters(inputName)  === false) {
                    nameAlertMsg = "ERROR Name is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputName);
                nameAlertMsg = inputName.value;
                break;
            
            case "inputSurname": 
                if (checkLength(inputSurname,4,0) === false || onlyLetters(inputSurname)  === false) {
                    surnameAlertMsg = "ERROR Surname is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputSurname);
                surnameAlertMsg = inputSurname.value;
                break;
            
            case "inputId":
                if (checkLength(inputId,7,0) === false || onlyNumbers(inputId)  === false) {
                    idAlertMsg = "ERROR ID is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputId);
                idAlertMsg = inputId.value;
                break;
            
            case "inputPhone":
                if (checkLength(inputPhone,10,10) === false || onlyNumbers(inputPhone)  === false) {
                    phoneAlertMsg = "ERROR Phone is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputPhone);
                phoneAlertMsg = inputPhone.value;
                break;
            
            case "inputBirth":
                if (checkLength(inputBirth,10,10) === false) {
                    dateAlertMsg = "ERROR Date is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputBirth);
                dateAlertMsg = inputBirth.value;
                break;
            
            case "inputLocality":
                if (checkLength(inputLocality,4,0) === false || alphaNumeric(inputLocality)  === false) {
                    localityAlertMsg = "ERROR Locality is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputLocality);
                localityAlertMsg = inputLocality.value;
                break;
            
            case "inputZipcode":
                if (checkLength(inputZipcode,4,5) === false || onlyNumbers(inputZipcode)  === false) {
                    zipAlertMsg = "ERROR ZIP code is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputZipcode);
                zipAlertMsg = inputZipcode.value;
                break;
            
            case "inputAddress":
                if (checkLength(inputAddress,5,0) === false || validateAddress(inputAddress)  === false) {
                    addressAlertMsg = "ERROR Surname is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputAddress);
                addressAlertMsg = inputAddress.value;
                break;

            case "inputMail":
                if (checkLength(inputMail,6,0) === false) {
                    emailAlertMsg = "ERROR mail is invalid.";
                    return false;
                }
                if ( (inputMail.value).search(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/) === -1){
                    errorMessage = "Invalid mail format.";
                    redBorder(inputConfirmPass);
                    appendErrorMesage(inputMail, errorMessage);
                    emailAlertMsg = "ERROR mail is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputMail);
                emailAlertMsg = inputMail.value;
                return true;
            
            case "inputConfirmMail":
                if(inputConfirmMail.value !== inputMail.value){
                    errorMessage = "E-mails are not the same.";
                    redBorder(inputConfirmPass);
                    appendErrorMesage(inputConfirmMail, errorMessage);
                    return false
                }
                removeErrorShowGreen(inputConfirmMail);
                break;
            
            case "inputPass":
                if (checkLength(inputPass, 8, 0) === false || alphaNumeric(inputPass)  === false){
                    passAlertMsg = "ERROR Invalid password.";
                    return false
                }
                removeErrorShowGreen(inputPass);
                passAlertMsg = inputPass.value;
                break;
            
            case "inputConfirmPass":
                if(inputConfirmPass.value !== inputPass.value){
                    errorMessage = "Passwords are not the same.";                    
                    redBorder(inputConfirmPass);
                    appendErrorMesage(inputConfirmPass, errorMessage);
                    return false
                }
                removeErrorShowGreen(inputConfirmPass);
                break;
            
            default:
                break;
        }
    }

    inputName.onblur = function () {
        validateInput("inputName");
    }
    inputSurname.onblur = function () {
        validateInput("inputSurname");
    }
    inputId.onblur = function () {
        validateInput("inputId");
    }
    inputPhone.onblur = function () {
        validateInput("inputPhone");
    }
    inputBirth.onblur = function () {
        console.log(inputBirth.value.length); 
        validateInput("inputBirth")
    }
    inputAddress.onblur = function () {
        validateInput("inputAddress");
    }
    inputLocality.onblur = function () {
        validateInput("inputLocality");
    }
    inputZipcode.onblur = function () {
        validateInput("inputZipcode");
    }
    inputMail.onblur = function () {
        validateInput("inputMail");
    }
    inputConfirmMail.onblur = function () {
        validateInput("inputConfirmMail");
    }
    inputPass.onblur = function () {
        validateInput("inputPass");
    }
    inputConfirmPass.onblur = function () {
        validateInput("inputConfirmPass");
    }
    inputName.onfocus = function () {
        removeClass(inputName);
    } 
    inputSurname.onfocus = function () {
        removeClass(inputSurname);
    } 
    inputId.onfocus = function () {
        removeClass(inputId);
    } 
    inputPhone.onfocus = function () {
        removeClass(inputPhone);
    } 
    inputBirth.onfocus = function () {
        removeClass(inputBirth);
    } 
    inputAddress.onfocus = function () {
        removeClass(inputAddress);
    } 
    inputLocality.onfocus = function () {
        removeClass(inputLocality);
    } 
    inputZipcode.onfocus = function () {
        removeClass(inputZipcode);
    } 
    inputMail.onfocus = function () {
        removeClass(inputMail);
    } 
    inputConfirmMail.onfocus = function () {
        removeClass(inputId);
    } 
    inputPass.onfocus = function () {
        removeClass(inputPass);
    }
    inputConfirmPass.onfocus = function () {
        removeClass(inputConfirmPass);
    } 

    signUpButton.onclick = function (){
        validateInput("inputName");
        validateInput("inputSurname");
        validateInput("inputId");
        validateInput("inputBirth");
        validateInput("inputPhone");
        validateInput("inputAddress");
        validateInput("inputLocality");
        validateInput("inputZipcode");
        validateInput("inputMail");
        validateInput("inputConfirmMail");
        validateInput("inputPass");
        validateInput("inputConfirmPass");

        alert(  "Name: " + nameAlertMsg +
                "\nSurname: " + surnameAlertMsg +
                "\nID number: " + idAlertMsg +
                "\nBirth date: " + dateAlertMsg +
                "\nPhone number: " + phoneAlertMsg +
                "\nAddress: " + addressAlertMsg +
                "\nLocality: " + localityAlertMsg +
                "\nZip code: " + zipAlertMsg +
                "\nE-mail: " + emailAlertMsg +
                "\nPassword: " + passAlertMsg
        )
    }
} 
