window.onload = function() {
    var inputMail = document.getElementById("inputMail");
    var inputPass = document.getElementById("inputPass");
    var signInBtn = document.getElementById("signInButton");
    var wholeModal = document.getElementById("modal");
    var modalTitle = document.getElementById("modalTitle");
    var modalBodyText = document.getElementById("modalBodyText");
    var btnCloseModal = document.getElementById("closeModal");
    var understandButton = document.getElementById("understandBtn");
    var emailURL = "";
    var passURL = "";
    var url = "";

    function fetchData(){
        url = "https://basp-m2022-api-rest-server.herokuapp.com/login?email="+ emailURL +"&password="+ passURL;
        fetch(url)
        .then(function (res) {
            var data = res.json()
            return data;
            })
        .then(function (data){
            if(data.success === true){
                modalTitle.innerText ="Request completed succesfully";
                modalBodyText.innerText = data.msg;
                showModal();
            
            } else if (data.success === false){
                modalTitle.innerText = "An error ocurred";
                modalBodyText.innerText = data.msg;
                showModal();
            }
        })
        .catch(function (error){
            modalTitle.innerText = "An error ocurred";
            modalBodyText.innerText = error;
            showModal();
        })        
    }

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
            if ( minLength === maxLength) {
                errorMessage = "This input should have " + minLength + " characters.";
            } else if (minLength != maxLength){
                errorMessage = "This input should have between "+ minLength + " and " + maxLength + " characters.";
            }
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

    function redBorder(inputToValidate) {
        inputToValidate.classList.remove("correctInput");
        inputToValidate.classList.add("wrongInput");
    }

    function removeClass(inputToValidate) {
        inputToValidate.classList.remove("wrongInput");
        inputToValidate.classList.remove("correctInput");
    }

    function removeErrorShowGreen(inputToValidate) {
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
            if( !(inputValue[i].toUpperCase() != inputValue[i].toLowerCase()) &&
                !(Number.isNaN(parseInt(inputValue[i])) === false )) {
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
                    emailAlertMsg = "ERROR.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Mail is invalid.";
                    return false;
                }
                if ( (inputMail.value).search(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/) === -1){
                    errorMessage = "Invalid mail format.";
                    redBorder(inputMail);
                    appendErrorMesage(inputMail, errorMessage);
                    emailAlertMsg = "ERROR.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Mail is invalid.";
                    emailURL = inputMail.value;
                    return false;
                }
                removeErrorShowGreen(inputMail);
                emailAlertMsg = inputMail.value;
                emailURL = inputMail.value;
                return true;
            
            case "inputPass":
                if (checkLength(inputPass, 8, 0) === false || alphaNumeric(inputPass)  === false){
                    passAlertMsg = "ERROR.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Password is invalid.";
                    passURL = inputPass.value;
                    return false
                }
                removeErrorShowGreen(inputPass);
                passAlertMsg = inputPass.value;
                passURL = inputPass.value;
                break;
            
            default:
                break;
        }
    }
    
    function closeModal(){
        wholeModal.classList.remove("show");
        wholeModal.classList.add("hidden");
    }

    function showModal(){
        wholeModal.classList.remove("hidden");
        wholeModal.classList.add("show");
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
    
    btnCloseModal.onclick = function() {
        closeModal();
    }

    understandButton.onclick = function() {
        closeModal();
    }

    signInBtn.onclick = function (){
        if (emailAlertMsg.includes("ERROR") === true || passAlertMsg.includes("ERROR") === true){
            showModal();
            return 0;
        }
        fetchData();
    }
}