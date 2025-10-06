//Caleb

//to-do
//set history to go behind the window when overflows
//set cant divide by 0
let num1;
let num2;
let operator;
let displayOperator;
let answer;

let currentNumber = "";

let fullEquation = "";

let topString = "";
let bottomString = "";

let firstNumberDone = false;
let secondNumberStartTyping = false;
let calculationComplete = false;

let historyShowing = true;

let equationHistory = [];
let answerHistory = [];

//if user clicks number, then add to currentnumber string
//if user clicks operator, then assign operator to string
//if user clicks number and operator is selected, then move current string of number and operator to the top string
//once equal is clicked, if the equation is valid, print result and
//then also move the full equation to top string

//on equal clicked, calculate string based on num1, num2, and operator

function NumberButton(num)
{
    //clear strings if there was a previous calculation
    if(calculationComplete === true)
    {
        ClearAll();
    }

    //if this is doing the second number, then move equation to top string
    if (firstNumberDone && secondNumberStartTyping === false)
    {
        //only move string to top string when first start typing second num
        secondNumberStartTyping = true;
        fullEquation = "";
    }

    //when number clicked, add the number to the current number
    currentNumber += num;

    //update bottomstring
    UpdateBottomString(currentNumber);
}

function OperatorButton(thisOperator)
{

    displayOperator = thisOperator.innerText;
    let actualOperator = thisOperator.value;

    //assign operator as global variable
    operator = actualOperator;


    //makes it so that if you complete a calculation and go to calculate based off the answer it work
    if(calculationComplete === true && answer !== Infinity)
    {
        calculationComplete = false;
        num1 = answer;
        currentNumber = num1;
    }

    //assign first number in global variable if not already done
    if(!firstNumberDone)
    {
        num1 = currentNumber;
        firstNumberDone = true;
    }

    operator = actualOperator;
    
    //display the display operator in the equation
    let displayEquation = `${num1} ${displayOperator}`
    UpdateTopString(displayEquation);
    UpdateBottomString("&nbsp;");

    //reset the current number so it can be populated by the second number
    currentNumber = "";
}

function EqualButton()
{
    num2 = currentNumber;
    //when equal button clicked, take in num1, num2, and operator and calculate that equation
    let finalEquation = `${num1} ${operator} ${num2}`;
    answer = eval(finalEquation);
    
    //put answer on bottom string and say can't divide by 0 if applicable
    if(num2 === "0" && operator === "/")
    {
        UpdateBottomString(`Can't Divide by 0`)
    }
    else
    {
        UpdateBottomString(answer);
    }


    //put equation on top string with display operator
    let displayFinalEquation = `${num1} ${displayOperator} ${num2} =`;
    UpdateTopString(displayFinalEquation);

    console.log(displayFinalEquation);

    fullEquation = finalEquation;

    LogAnswer(displayFinalEquation, answer);

    calculationComplete = true;
    operatorJustPressed = false;
}

function UpdateTopString(newValue)
{
    
    let actualString = document.getElementById("topString");
    actualString.innerHTML = newValue;
}

function UpdateBottomString(newValue)
{
    let actualString = document.getElementById("bottomString");
    actualString.innerHTML = newValue;
}

function ClearAll()
{
    num1 = "";
    num2 = "";
    operator = "";
    displayOperator = "";
    answer = "";

    currentNumber = "";

    fullEquation = "";

    topString = "";
    bottomString = "";

    firstNumberDone = false;
    secondNumberStartTyping = false;
    calculationComplete = false;

    UpdateTopString("&nbsp;");
    UpdateBottomString("&nbsp;");
}

function ClearCurrentNumber()
{
    currentNumber = "";
    UpdateBottomString("&nbsp;");

    //updates numbers in backend accordingly
    if (firstNumberDone === true)
    {
        num2 = currentNumber;
    }
    else
    {
        num1 = currentNumber;
    }
}

function Backspace()
{
    //removes last number from the current number being typed in and updates it on screen
    currentNumber = currentNumber.slice(0, -1);
    UpdateBottomString(currentNumber);

    //updates numbers in backend accordingly
    if (firstNumberDone === true)
    {
        num2 = currentNumber;
    }
    else
    {
        num1 = currentNumber;
    }
}

function ToggleNegativePositive()
{
    if (currentNumber.startsWith("-"))
    {
        currentNumber = currentNumber.slice(1);
    }
    else
    {
        currentNumber = `-${currentNumber}`;
    }

    UpdateBottomString(currentNumber);

    //updates numbers in backend accordingly
    if (firstNumberDone === true)
    {
        num2 = currentNumber;
    }
    else
    {
        num1 = currentNumber;
    }
}

function DivideNumByOne()
{
    //uses current number if no answer already to calculate off of
    if(answer === "")
    {
        num2 = currentNumber;
    }
    else
    {
        num2 = answer;
    }
    
    num1 = 1;
    operator = "/";

    let finalEquation = `${num1} ${operator} ${num2}`;
    answer = eval(finalEquation);
    
    //put answer on bottom string and display can't divide by 0 if applicable
    if(num2 === "0")
    {
        UpdateBottomString(`Can't Divide by 0`);
    }
    else
    {
        console.log(num2);
        UpdateBottomString(answer);
    }
    

    //put equation on top string with display operator
    
    let displayFinalEquation = `${num1} &divide ${num2} =`;
    UpdateTopString(displayFinalEquation);

    console.log(displayFinalEquation);

    fullEquation = finalEquation;

    LogAnswer(displayFinalEquation, answer)

    calculationComplete = true;
}

function SquareRoot()
{
    //uses current number if no answer already to calculate off of
    if(answer === "")
    {
        num2 = currentNumber;
    }
    else
    {
        num2 = answer;
    }
    answer = Math.sqrt(num2);
    
    //put answer on bottom string
    UpdateBottomString(answer);

    //put equation on top string with display operator
    let displayFinalEquation = `Square root (${num2})`;
    UpdateTopString(displayFinalEquation);

    console.log(displayFinalEquation);

    fullEquation = Math.sqrt(num2);

    LogAnswer(displayFinalEquation, answer)

    calculationComplete = true;
}

function SquareNum()
{
    //uses current number if no answer already to calculate off of
    if(answer === "")
    {
        num2 = currentNumber;
    }
    else
    {
        num2 = answer;
    }
    answer = num2 * num2;
    
    //put answer on bottom string
    UpdateBottomString(answer);

    //put equation on top string with display operator
    let displayFinalEquation = `${num2}^2`;
    UpdateTopString(displayFinalEquation);

    console.log(displayFinalEquation);

    fullEquation = currentNumber * num2;

    LogAnswer(displayFinalEquation, answer)

    calculationComplete = true;
    
}

function LogAnswer(equation, answer)
{
    equationHistory.push(equation);
    answerHistory.push(answer);
    UpdateHistory();
    console.log(equationHistory);
}

function UpdateHistory()
{
    let newHistoryItem = document.createElement("p");
    newHistoryItem.innerHTML =`${equationHistory[equationHistory.length-1]}<br>${answerHistory[answerHistory.length-1]}`;
    document.getElementById("historyItemsList").prepend(newHistoryItem);
}

function ToggleHistory()
{
    if(historyShowing === true)
    {
        historyShowing = false;
        document.getElementById("history").style.display='none';
    }
    else
    {
        historyShowing = true;
        document.getElementById("history").style.display='block';
    }
}

ToggleHistory();