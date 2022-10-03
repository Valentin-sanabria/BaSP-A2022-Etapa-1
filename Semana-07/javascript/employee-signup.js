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

    // Modal's vars
    var wholeModal = document.getElementById("modal");
    var modalTitle = document.getElementById("modalTitle");
    var modalBodyText = document.getElementById("modalBodyText");
    var btnCloseModal = document.getElementById("closeModal");
    var understandButton = document.getElementById("understandBtn");

    //Input's alert messages
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
    
    //API variables for link creation
    var url = "";
    var nameURL = "";
    var surnameURL = "";
    var idURL = ""; 
    var birthURL = "";
    var phoneURL = "";
    var addressURL = "";
    var localityURL = "";
    var zipURL = "";
    var emailURL = "";
    var passURL = "";

    function saveLocalStorage(data){
        localStorage.setItem("name", data.data.name);
        localStorage.setItem("surname", data.data.lastName);
        localStorage.setItem("id", data.data.dni);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("dateBirth", data.data.dob);
        localStorage.setItem("password", data.data.password);
        localStorage.setItem("phone", data.data.phone);
        localStorage.setItem("address", data.data.address);
        localStorage.setItem("locality", data.data.city);
        localStorage.setItem("zip", data.data.zip);
    }

    function loadLocalStorage(){
        var [month2, day2, year2] = localStorage.getItem("dateBirth").split('/'); 
        dateAlertMsg = [year2, month2, day2].join('-');
        inputBirth.value = dateAlertMsg
        inputName.value = localStorage.getItem("name");
        inputSurname.value = localStorage.getItem("surname");
        inputId.value = localStorage.getItem("id");
        inputPhone.value = localStorage.getItem("phone");
        inputAddress.value = localStorage.getItem("address");
        inputLocality.value = localStorage.getItem("locality");
        inputZipcode.value = localStorage.getItem("zip");
        inputMail.value = localStorage.getItem("email");
        inputPass.value = localStorage.getItem("password");
        inputConfirmMail.value = localStorage.getItem("email");
        inputConfirmPass.value = localStorage.getItem("password");
    }

    function fetchData() {
        url =   "https://basp-m2022-api-rest-server.herokuapp.com/signup?name="+nameURL+
                "&lastName="+surnameURL+
                "&email="+emailURL+
                "&dni="+idURL+
                "&dob="+birthURL+
                "&password="+passURL+
                "&phone="+phoneURL+
                "&address="+addressURL+
                "&city="+localityURL+
                "&zip="+ zipURL;
        fetch(url)
        .then(function (res) {
            var data = res.json();
            return data;
            })
        .then(function (data) {
            if(data.success === true){
                modalTitle.innerText ="Request completed succesfully";
                modalBodyText.innerText = data.msg;
                showModal();
                saveLocalStorage(data);
            } else if (data.success === false){
                modalTitle.innerText = "An error ocurred";
                modalBodyText.innerText = data.msg;
                showModal();
            }
        })
        .catch(function (error) {
            modalTitle.innerText = "An error ocurred";
            modalBodyText.innerText = error;
            showModal();
        })
    }

    function checkLength (inputToValidate, minLength, maxLength) {
        if (inputToValidate.value === "" ){
            errorMessage = "Inputs cannot be left blank.";
            inputToValidate.classList.add("wrongInput");
            appendErrorMesage(inputToValidate, errorMessage);
            return false;
        }
        if(maxLength === 0){
            if (inputToValidate.value.length < minLength) {
                errorMessage = "This input should have more than "+ minLength + " characters.";
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


    function appendErrorMesage(inputToValidate, errorMessage) {
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

    function removeErrorShowGreen(inputToValidate) {
        if (inputToValidate.parentNode.children.length > 1  ){
            inputToValidate.parentNode.children[1].remove();
        }
        inputToValidate.classList.remove("wrongInput");
        inputToValidate.classList.add("correctInput");
    }

    function closeModal() {
        wholeModal.classList.remove("show");
        wholeModal.classList.add("hidden");
    }

    function showModal() {
        wholeModal.classList.remove("hidden");
        wholeModal.classList.add("show");
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

    function alphaNumeric(inputToValidate) {
        var inputValue = inputToValidate.value;
        var containsNumber = false;
        var containsLetter = false;
        for(var i=0; i<inputValue.length; i++){
            if( !(inputValue[i].toUpperCase() != inputValue[i].toLowerCase()) &&
                !(Number.isNaN(parseInt(inputValue[i])) === false )) {
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
    
    function validateBirth() {
        var [year, month, day] = inputBirth.value.split('-');

        if (parseInt(year) <= 1920 || parseInt(year) > 2012  ){
            errorMessage = "Invalid year.";
            redBorder(inputBirth);
            appendErrorMesage(inputBirth, errorMessage);
            return false;
        }
        return true;
    }

    function validateAddress(inputToValidate) {
        var address = inputToValidate.value;
        if (address.indexOf(" ") == -1) {
            errorMessage = "Separate letters from numbers.";
            redBorder(inputToValidate);
            appendErrorMesage(inputAddress, errorMessage);
            return false;
        } else{
        
        if ( address[0].toUpperCase() !== address[0].toLowerCase() ) {

            for (var i=0; i< address.indexOf(" "); i++){
                if (address[i].toUpperCase() === address[i].toLowerCase()) {
                    errorMessage = "Separate letters from numbers.";
                    redBorder(inputToValidate);
                    appendErrorMesage(inputAddress, errorMessage);
                    return false;
                }
            }

            for (var i = address.indexOf(" ") ; i < address.length ; i++) {
                if (address[i].toUpperCase() !== address[i].toLowerCase()) {
                    errorMessage = "Separate letters from numbers.";
                    redBorder(inputToValidate);
                    appendErrorMesage(inputAddress, errorMessage);
                    return false;
                }
            }
        } else {
            errorMessage = "Address start with street name.";
            redBorder(inputToValidate);
            appendErrorMesage(inputAddress, errorMessage);
            return false;
        }
        
        }
        return true;
    }

    function validateInput (inputToValidate) {
        switch (inputToValidate) {            
            case "inputName":
                if (checkLength(inputName,4,0) === false || onlyLetters(inputName)  === false) {
                    nameAlertMsg = "ERROR";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Name is invalid.";
                    nameURL = inputName.value;
                    return false;
                }
                removeErrorShowGreen(inputName);
                nameAlertMsg = inputName.value;
                nameURL = inputName.value;
                break;
            
            case "inputSurname": 
                if (checkLength(inputSurname,4,0) === false || onlyLetters(inputSurname)  === false) {
                    surnameAlertMsg = "ERROR";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Surname is invalid.";
                    surnameURL = inputSurname.value;
                    return false;
                }
                removeErrorShowGreen(inputSurname);
                surnameAlertMsg = inputSurname.value;
                surnameURL = inputSurname.value;
                break;
            
            case "inputId":
                if (checkLength(inputId,7,0) === false || onlyNumbers(inputId)  === false) {
                    idAlertMsg = "ERROR.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "ID is invalid.";
                    idURL = inputId.value;
                    return false;
                }
                removeErrorShowGreen(inputId);
                idAlertMsg = inputId.value;
                idURL = inputId.value;
                break;
            
            case "inputPhone":
                if (checkLength(inputPhone,10,10) === false || onlyNumbers(inputPhone)  === false) {
                    phoneAlertMsg = "ERROR.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Phone is invalid.";
                    phoneURL = inputPhone.value;
                    return false;
                }
                removeErrorShowGreen(inputPhone);
                phoneAlertMsg = inputPhone.value;
                phoneURL = inputPhone.value;
                break;
            
            case "inputBirth":
                if (checkLength(inputBirth,10,10) === false || validateBirth() === false) {
                    dateAlertMsg = "ERROR.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Date is invalid.";
                    birthURL = [month, day, year].join('/');
                    return false;
                }
                removeErrorShowGreen(inputBirth);
                var [year, month, day] = inputBirth.value.split('-');
                dateAlertMsg = [day, month, year].join('/');
                birthURL = [month, day, year].join('/');
                break;
            
            case "inputLocality":
                if (checkLength(inputLocality,4,0) === false || alphaNumeric(inputLocality)  === false) {
                    localityAlertMsg = "ERROR.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Locality is invalid.";
                    localityURL = inputLocality.value;
                    return false;
                }
                removeErrorShowGreen(inputLocality);
                localityAlertMsg = inputLocality.value;
                localityURL = inputLocality.value;
                break;
            
            case "inputZipcode":
                if (checkLength(inputZipcode,4,5) === false || onlyNumbers(inputZipcode)  === false) {
                    zipAlertMsg = "ERROR.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "ZIP is invalid.";
                    zipURL = inputZipcode.value;
                    return false;
                }
                removeErrorShowGreen(inputZipcode);
                zipAlertMsg = inputZipcode.value;
                zipURL = inputZipcode.value;
                break;
            
            case "inputAddress":
                if (checkLength(inputAddress,5,0) === false || validateAddress(inputAddress)  === false) {
                    addressAlertMsg = "ERROR.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Address is invalid.";
                    addressURL = inputAddress.value;
                    return false;
                }
                removeErrorShowGreen(inputAddress);
                addressAlertMsg = inputAddress.value;
                addressURL = inputAddress.value;
                break;

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
                validateInput("inputConfirmMail");
                emailAlertMsg = inputMail.value;
                emailURL = inputMail.value;
                return true;
            
            case "inputConfirmMail":
                if(inputConfirmMail.value !== inputMail.value){
                    errorMessage = "E-mails are not the same.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = errorMessage;
                    confirmEmailURL = inputConfirmMail.value;
                    redBorder(inputConfirmMail);
                    appendErrorMesage(inputConfirmMail, errorMessage);
                    return false
                }
                removeErrorShowGreen(inputConfirmMail);
                confirmEmailURL = inputConfirmMail.value;
                break;
            
            case "inputPass":
                if (checkLength(inputPass, 8, 0) === false || alphaNumeric(inputPass)  === false){
                    passAlertMsg = "ERROR.";
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Password is invalid.";
                    passURL = inputPass.value;
                    return false
                }
                removeErrorShowGreen(inputPass);
                validateInput("inputConfirmPass");
                passAlertMsg = inputPass.value;
                passURL = inputPass.value;
                break;
            
            case "inputConfirmPass":
                if(inputConfirmPass.value !== inputPass.value){
                    errorMessage = "Passwords are not the same.";  
                    modalTitle.innerText = "An error ocurred";
                    modalBodyText.innerText = "Passwords are not the same.";                  
                    redBorder(inputConfirmPass);
                    appendErrorMesage(inputConfirmPass, errorMessage);
                    confirmPassURL = inputConfirmPass.value;
                    return false
                }
                removeErrorShowGreen(inputConfirmPass);
                confirmPassURL = inputConfirmPass.value;
                break;
            
            default:
                break;
        }
    }

    loadLocalStorage();

    inputName.onblur = function() {
        validateInput("inputName");
    }

    inputSurname.onblur = function() {
        validateInput("inputSurname");
    }

    inputId.onblur = function() {
        validateInput("inputId");
    }

    inputPhone.onblur = function() {
        validateInput("inputPhone");
    }

    inputBirth.onblur = function() {
        validateInput("inputBirth")
    }

    inputAddress.onblur = function() {
        validateInput("inputAddress");
    }

    inputLocality.onblur = function() {
        validateInput("inputLocality");
    }

    inputZipcode.onblur = function() {
        validateInput("inputZipcode");
    }
    
    inputMail.onblur = function() {
        validateInput("inputMail");
    }

    inputConfirmMail.onblur = function() {
        validateInput("inputConfirmMail");
    }

    inputPass.onblur = function() {
        validateInput("inputPass");
    }

    inputConfirmPass.onblur = function() {
        validateInput("inputConfirmPass");
    }

    inputName.onfocus = function() {
        removeClass(inputName);
    } 

    inputSurname.onfocus = function() {
        removeClass(inputSurname);
    } 

    inputId.onfocus = function() {
        removeClass(inputId);
    } 

    inputPhone.onfocus = function() {
        removeClass(inputPhone);
    } 

    inputBirth.onfocus = function() {
        removeClass(inputBirth);
    } 

    inputAddress.onfocus = function() {
        removeClass(inputAddress);
    } 

    inputLocality.onfocus = function() {
        removeClass(inputLocality);
    } 

    inputZipcode.onfocus = function() {
        removeClass(inputZipcode);
    } 

    inputMail.onfocus = function() {
        removeClass(inputMail);
    } 

    inputConfirmMail.onfocus = function() {
        removeClass(inputId);
    } 

    inputPass.onfocus = function() {
        removeClass(inputPass);
    }

    inputConfirmPass.onfocus = function() {
        removeClass(inputConfirmPass);
    }

    btnCloseModal.onclick = function() {
        closeModal();
    }
    
    understandButton.onclick = function() {
        closeModal();
    }

    signUpButton.onclick = function() {
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

        if (    nameAlertMsg.includes("ERROR") === true ||
                surnameAlertMsg.includes("ERROR") === true ||
                idAlertMsg.includes("ERROR") === true ||
                dateAlertMsg.includes("ERROR") === true ||
                phoneAlertMsg.includes("ERROR") === true ||
                addressAlertMsg.includes("ERROR") === true ||
                localityAlertMsg.includes("ERROR") === true ||
                zipAlertMsg.includes("ERROR") === true ||
                emailAlertMsg.includes("ERROR") === true ||
                passAlertMsg.includes("ERROR") === true) {
            
                showModal();
                return 0;
        }
        fetchData();
    } 
} 