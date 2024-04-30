// GETTING EVERY INPUT
const allInput = document.querySelectorAll('form input');

// GETTING THE VALIDATION MESSAGE
const formValid = document.getElementById('formValid');

// GETTING THE BUTTON TO CLOSE THE VALIDATION MESSAGE
const closeFormValid = document.getElementById('closeFormValid');

// GETTING EVERY INPUT
const name = document.getElementById('name');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const address = document.getElementById('address');
const postalCode = document.getElementById('postalCode');
const city = document.getElementById('city');
const tel = document.getElementById('tel');
const msg = document.getElementById('msg');

// GETTING THE SEND BUTTON
const sendBtn = document.getElementById('sendBtn');

// GETTING WHERE TO PUT THE MESSAGE
const result = document.getElementById('result');

// RegEx
const regexLastName = /^[a-zA-Z]{1}[a-zA-Z\-\s]*[a-zA-Z]+$/;
const regexName = /^[a-zA-Z]+-?[a-zA-Z]+$/;
const regexEmail = /^[a-z\-0-9]{3,}@[a-z]{2,}.[a-z]{2,}$/;
const regexPostalCode = /^[0-9]{4}$/;
const regexAddress = /^[a-zA-Z]{2,}[a-zA-Z\s]*[0-9]+$/;
const regexTel = /(\+|00)?(41)?\s?(0?[0-9][0-9])\s?.?([0-9]{2})?([0-9]{3})\s?.?([0-9]{2})\s?.?([0-9]{2})/;

function styleElement(elem, parameter, message){
    elem.style.cssText = parameter;
    result.innerHTML = `${message}`;
}

function validate(regEx, input){
    // SETTING PARAMETERS
    let color = 'green';
    let message = 'One or multiple input(s) are incorrect';
    let returnValue = true;

    if(input.value === ''){ // IF VALUE IS EMPTY, WE LET THE USER KNOW IT
        console.log('empty');
        color = 'orange';
        returnValue = false;

    }else if(!regEx.test(input.value)){ // IF THE VALUE ISN'T EMPTY BUT INCORRECT, WE LET THE USER KNOW IT
        console.log(false);
        returnValue = false;
        color = 'red';

    }else message = '&emsp;';

    // PUTTING THE STYLE TO THE INPUT
    const style = `border-bottom-color: ${color};`;
    styleElement(input, style, message);
    return returnValue;
}

function validateTextArea(input){
    // SETTING PARAMETERS
    let color = 'green';
    let message = '&emsp;';
    let returnValue = true;

    if(input.value === ''){ // IF TEXTAREA IS EMPTY, WE LET THE USER KNOW IT
        color = 'red';
        message = 'You haven\'t told us anything yet.';
        returnValue = false;
    }

    // PUTTING THE STYLE TO THE TEXTAREA
    const style = `border-bottom-color: ${color}; border-left-color: ${color};`;
    styleElement(input, style, message);

    return returnValue;
}



// CHECKING IF EVERY INPUT ARE CORRECT
lastName.addEventListener('blur', () => { validate(regexLastName, lastName); });
name.addEventListener('blur', () => { validate(regexName, name); });
email.addEventListener('blur', () => { validate(regexEmail, email); });
address.addEventListener('blur', () => { validate(regexAddress, address); });
postalCode.addEventListener('blur', () => { validate(regexPostalCode, postalCode); });
city.addEventListener('blur', () => { validate(regexName, city); });
tel.addEventListener('blur', () => { validate(regexTel, tel); });
msg.addEventListener('blur', () => { validateTextArea(msg); });

// ADDING A CLASS TO INPUT IF THEY'RE NOT EMPTY
allInput.forEach(input => {
    input.addEventListener('focusout', () => {
        input.classList.toggle('not-empty', input.value !== '');
    });
});

// CHECKING EVERY INPUT WHEN SUMMITING THE FORM
sendBtn.addEventListener('click', () => {
    if(validate(regexLastName, lastName) && validate(regexName, name) && validate(regexEmail, email) && validate(regexAddress, address) && validate(regexPostalCode, postalCode) && validate(regexName, city) && validate(regexTel, tel) && validateTextArea(msg)){
        formValid.classList.add('active');
        changeProfilePicture(lastName.value + name.value);
        changePseudo(name.value);
    }
});

// CLOSING THE VALIDATION MESSAGE
closeFormValid.addEventListener('click', () => {
    formValid.classList.remove('active');
});