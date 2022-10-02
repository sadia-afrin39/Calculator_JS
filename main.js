class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
       
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
         //console.log(this.currentOperandTextElement);
        this.clear();
    }
    
    clear(){
       this.currentOperand = '';
       this.previousOperand = '';
       this.operation = undefined;
    }
    
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1); //takes the part of string from 0 to n-1
    }
    
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;  //if (.) preesed more than once,then return
        this.currentOperand = this.currentOperand.toString() + number.toString();
       
    }
    
    chooseOperation(operation){
        if(this.currentOperand === '') return;  //can't type operator first 
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    compute(){
        let computation ;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+': 
                computation = prev + current;
                break;
            case '-': 
                computation = prev - current;
                break;
            case '*': 
                computation = prev * current;
                break;
            case '/': 
                computation = prev / current;
                break;
            default : return;
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand ='';
        
    }
    
    //split(.) means divide the string into array where is the (.)
    getDisplayNumber(number){   //putting comma
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);  //taking numbers of .'s left side (integer)
        const decimalDigits = stringNumber.split('.')[1];  ///taking numbers of .'s right side (decimal)
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }else{
           integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits:0});
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay;
        }
        
        /* problem with decimal numbers
        const floatNumber = parseFloat(number);
        if (isNaN(floatNumber)) return;
        return floatNumber.toLocaleString('en');   //puts comma*/
    }
    
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
           this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)}${this.operation}`; 
        }else{
            this.previousOperandTextElement.innerText = '';   //if no operator ,then show currentoperand only
        }
        
    }
    
}



const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click',()=>{
        calculator.compute();
        calculator.updateDisplay();
 });

allClearButton.addEventListener('click',()=>{
        calculator.clear();
        calculator.updateDisplay();
 });

deleteButton.addEventListener('click',()=>{
        calculator.delete();
        calculator.updateDisplay();
 });