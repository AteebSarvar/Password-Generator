const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 1;
//set strength color to grey

//set password length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML= passwordLength;
}
function setIndicator(color1){
    indicator.style.backgroundColor = color1;
    //shadow
}
function getRndInt(min,max){
    return (Math.random() * (max-min)) + min;
}
function generateRandomNumber(){
    return getRndInt(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInt(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInt(65,91));
}
function generateSymbol(){
    const ranInd = getRndInt(0,symbols.length);
    return symbols.charAt(ranInd); 
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
    //make copy span visible
    copyMsg.classList.add("active");
    setTimeout(function(){
        copyMsg.classList.remove("active");
    },2000)
}
inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',  ()=>{
    if(passwordDisplay.value)
        copyContent();
})
function handleCheckboxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });
    //special condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
})
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener('click',function(){
    //if none of the checkbox are ticked
    if(checkCount == 0) return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    //steps
    //remove old password
    password="";
    //lets put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push( generateUpperCase);
    }
    if(lowercaseCheck.checked){
        pfuncArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push( generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push( generateSymbol);
    }
    //compulsory addition

    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }
    //remaining addition

    for(let i=0;i<passwordLength-funcArr.length;i++ ){
        let randomIndex = getRndInt(0,funcArr.length);
        password += funcArr(randomIndex)();
    }
    //shuffle the password
    password = shufflePassword(Array.from(password));
    //show in UI
    passwordDisplay.value = password;
    //calculate strength
    calcStrength();
})