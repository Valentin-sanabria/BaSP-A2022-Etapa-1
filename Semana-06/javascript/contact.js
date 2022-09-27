window.onload = function() {
    var inputContactArea = document.getElementById("inputContactArea");
    var inputName = document.getElementById("inputName");
    var inputMail = document.getElementById("inputMail");
    var checkTerms = document.getElementById("checkToS");
    var checkboxText = document.getElementById("checkText");
    var inputTextArea = document.getElementById("inputTextArea");
    var submitButton = document.getElementById("submitBtn");
    var tosAlertMsg = "";

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
                redBorder(inputToValidate);
                appendErrorMesage(inputToValidate, errorMessage);
                return false;
            }
        }else if(minLength === 0) {
            if (inputToValidate.value.length > maxLength) {
                errorMessage = "This input should have less than " + maxLength + " characters.";
                redBorder(inputToValidate);
                appendErrorMesage(inputToValidate, errorMessage);
                return false;
            }
        }else if (inputToValidate.value.length < minLength || inputToValidate.value.length > maxLength) {
                errorMessage = "This input should have between "+ minLength + " and " + maxLength + " characters.";
                redBorder(inputToValidate);
                appendErrorMesage(inputToValidate, errorMessage);
                return false;
            }
        return true;
    }

    function removeClass(inputToValidate) {
        inputToValidate.classList.remove("wrongInput");
        inputToValidate.classList.remove("correctInput");
    }

    function redBorder(inputToValidate) {
        inputToValidate.classList.remove("correctInput");
        inputToValidate.classList.add("wrongInput");
    }

    function removeErrorShowGreen(inputToValidate) {
        console.log(inputToValidate.parentNode);
        if (inputToValidate.parentNode.children.length > 1  ){
            inputToValidate.parentNode.children[1].remove();
        }
        inputToValidate.classList.remove("wrongInput");
        inputToValidate.classList.add("correctInput");
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
            
            case "inputMail":
                if (checkLength(inputMail,6,0) === false) {
                    emailAlertMsg = "ERROR mail is invalid.";
                    return false;
                }
                if ( (inputMail.value).search(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/) === -1){
                    errorMessage = "Invalid mail format.";
                    redBorder(inputMail);
                    appendErrorMesage(inputMail, errorMessage);
                    emailAlertMsg = "ERROR mail is invalid.";
                    return false;
                }
                removeErrorShowGreen(inputMail);
                emailAlertMsg = inputMail.value;
                return true;
            
            case "inputContactArea":
                if (checkLength(inputContactArea,6,0) === false || onlyLetters(inputContactArea)  === false){
                    errorMessage = "Contact area does not exist.";
                    redBorder(inputContactArea);
                    appendErrorMesage(inputContactArea, errorMessage);
                    return false
                }
                removeErrorShowGreen(inputContactArea);
                break;

            case "checkTerms":
                    if (checkTerms.checked  === false){
                        redBorder(checkboxText);
                        tosAlertMsg = "You need to accept our Terms of Service";
                        return false
                    }
                    tosAlertMsg = "You accepted our Terms of Service :) ";
                    checkboxText.classList.remove("wrongInput");
                    break;

            case "inputTextArea":
                if (checkLength(inputTextArea,20,2500) === false){
                    appendErrorMesage(inputTextArea, errorMessage);
                    return false
                }
                removeErrorShowGreen(inputTextArea);
                break;

            default:
                break;
        }
    }

    inputName.onblur = function() {
        validateInput("inputName");
    }
    inputMail.onblur = function() {
        validateInput("inputMail");
    }
    inputContactArea.onblur = function() {
        validateInput("inputContactArea");
    }
    inputTextArea.onblur = function() {
        validateInput("inputTextArea");
    }
    inputName.onfocus = function(){
        removeClass(inputName);
    }
    inputMail.onfocus = function(){
        removeClass(inputMail);
    }
    inputContactArea.onfocus = function(){
        removeClass(inputContactArea);
    }
    inputTextArea.onfocus = function(){
        removeClass(inputTextArea);
    }

    submitButton.onclick = function() {
        validateInput("inputName");
        validateInput("inputMail");
        validateInput("checkTerms");
        validateInput("inputTextArea");

        alert(  "Name: " + nameAlertMsg +
                "\nE-mail: " + emailAlertMsg +
                "\nTerms of service: " + tosAlertMsg
        )
    }
}