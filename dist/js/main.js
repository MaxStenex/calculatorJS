'use strict'
class Calculator {
   constructor(display) {
      this.display = display;
      this.clear();
   };

   // Clear all values
   clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
      this.display.innerText = 0;
   };

   // Delete current input value
   delete() {
      if (!this.operation || this.operation === '=') {
         this.clear();
      } else {
         this.currentOperand = '';
         this.display.innerText = this.previousOperand + this.operation;
      }
   };

   //Appending values into display
   appendNumber(number) {
      if (number == '.' && this.currentOperand.includes('.')) {
         return;
      }
      this.currentOperand = this.currentOperand.toString() + number.toString();
      if (!this.operation) {
         this.display.innerText = this.currentOperand;
      } else {
         this.display.innerText = this.previousOperand + this.operation + this.currentOperand;
      }
   };

   //Computing values, depends of operation that you choose
   compute(operation) {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const curr = parseFloat(this.currentOperand);
      //Checking for not usseles clicks on = 
      if ((isNaN(prev) || isNaN(curr)) && operation === '=') {
         return;
      };
      if (isNaN(prev)) {
         this.operation = operation;
         this.previousOperand = this.currentOperand;
         this.currentOperand = '';
         this.display.innerText = this.previousOperand + operation;
         return;
      };
      if (isNaN(curr)) {
         this.operation = operation;
         this.currentOperand = '';
         this.display.innerText = this.previousOperand + operation;
         return;
      };
      switch (this.operation) {
         case '+':
            computation = prev + curr;
            break;
         case '-':
            computation = prev - curr;
            break;
         case '*':
            computation = prev * curr;
            break;
         case '÷':
            computation = prev / curr;
            break;
         default: break;
      };


      this.previousOperand = computation;
      //Fixing IEEE format error
      if (computation.toString().length > 5) {
         this.previousOperand = computation.toFixed(6);
      };
      this.operation = operation;
      if (this.operation === '=') {
         this.display.innerText = this.previousOperand;
         this.currentOperand = '';
         return;
      };
      this.display.innerText = this.previousOperand + this.operation;
      this.currentOperand = '';
   };

};


//All variables
const numberButtons = document.querySelectorAll('.number-button');
const operationButtons = document.querySelectorAll('.operation-button')
const displayValue = document.querySelector('.calc__output');
const myCalculator = new Calculator(displayValue);


numberButtons.forEach((button) => {
   button.addEventListener('click', () => {
      myCalculator.appendNumber(button.innerText);
   });
});

operationButtons.forEach((button) => {
   button.addEventListener('click', (evt) => {
      const target = evt.target;
      switch (target.innerText) {
         case 'AC':
            myCalculator.clear();
            break;

         case 'DEL':
            myCalculator.delete();
            break;

         default: myCalculator.compute(target.innerText);
      }
   })
});