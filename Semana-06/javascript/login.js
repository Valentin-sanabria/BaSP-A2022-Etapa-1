window.onload = function() {
    var inputMail = document.getElementById("inputMail");
    var inputPass = document.getElementById("inputPass");
    var signInBtn = document.getElementById("signInButton");


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

    function validateInput (inputToValidate) {
        switch (inputToValidate) {            
            case "inputMail":
                if (checkLength(inputMail,6,0) === false) {
                    emailAlertMsg = "ERROR mail is invalid.";
                    return false;
                }
                if ( (inputMail.value).search(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/) === -1){
                    errorMessage = "Invalid mail format.";
                    inputMail.classList.add("wrongInput");
                    appendErrorMesage(inputMail, errorMessage);
                    emailAlertMsg = "ERROR mail is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputMail);
                emailAlertMsg = inputMail.value;
                return true;
            
            case "inputPass":
                if (checkLength(inputPass, 8, 0) === false || alphaNumeric(inputPass)  === false){
                    passAlertMsg = "ERROR Passwords are not the same.";
                    return false
                }
                removeErrorShowGreen(inputPass);
                passAlertMsg = inputPass.value;
                break;
            
            default:
                break;
        }
    }
    
    
    function removeErrorShowGreen(inputToValidate) {
        console.log(inputToValidate.parentNode);
        if (inputToValidate.parentNode.children.length > 1  ){
            inputToValidate.parentNode.children[1].remove();
        }
        inputToValidate.classList.remove("wrongInput");
        inputToValidate.classList.add("correctInput");
    } 


    inputMail.onblur = function() {
        validateInput("inputMail");
    }
    inputMail.onfocus = function () {
        removeClass(inputMail);
    }    
    inputPass.onblur = function() {
        validateInput("inputPass");
    }
    inputPass.onfocus = function () {
        removeClass(inputPass);
    }    

    signInBtn.onclick = function (){
        alert(  "E-mail: " + emailAlertMsg +
                "\nPassword: " + passAlertMsg
        )
    }
}