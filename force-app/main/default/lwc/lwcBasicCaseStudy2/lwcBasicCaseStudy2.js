import { LightningElement,track } from 'lwc';

export default class LwcBasicCaseStudy2 extends LightningElement {
    @track firstNumber;
    @track secondNumber;
    @track result;

    handleFirstNumberChange(event)
    {
        this.firstNumber = event.target.value;
    }

    handleSecondNumberChange(event)
    {
        this.secondNumber = event.target.value;
    }
    handleAdd()
    {
        this.result = parseFloat(this.firstNumber) + parseFloat(this.secondNumber);
    }
    handleSubtract()
    {
        this.result = parseFloat(this.firstNumber) - parseFloat(this.secondNumber);
    }
    handleMultiply()
    {
        this.result = parseFloat(this.firstNumber) * parseFloat(this.secondNumber);
    }
    handleDivide()
    {
        try{
        if(this.secondNumber != 0){
            this.result = parseFloat(this.firstNumber) / parseFloat(this.secondNumber);
        } else {
            alert('Attempt to divide by zero is not allowed.');
        }
        } catch (error) {   
            this.result = 'Error: Invalid input';
        }
    }
}