import { LightningElement,track } from 'lwc';
import createNewContact from '@salesforce/apex/NewContactCreationController.createNewContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcBasicCaseStudy5 extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track department = '';
    @track newId;

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }
    handleEmailChange(event) {
        this.email = event.target.value;
    }
    handleDepartmentChange(event) {
        this.department = event.target.value;
    }

    createContact()
    {
      
        createNewContact({ firstName: this.firstName, lastName: this.lastName, email: this.email, department: this.department })
        .then(result => {
            this.newId = result.Id;
            this.showMessage("Record Creation","Contact created successfully with Id: ","success");
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.department = '';
        })
        .catch(error => {
            console.log('Error creating contact: ', error);
            alert('LastName is mandatory field. Please provide LastName.');
        });


    }

    showMessage(title, message, variant)
    {
        this.dispatchEvent(
            new ShowToastEvent({
                title:title ,
                message: message + this.newId,
                variant: variant
            }),
        );
    }

}