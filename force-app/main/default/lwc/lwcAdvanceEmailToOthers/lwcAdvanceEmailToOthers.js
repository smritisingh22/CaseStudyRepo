import { LightningElement, api, wire, track } from 'lwc';
import getFromAddressOptions from '@salesforce/apex/EmailController.getFromAddressOptions';
import sendEmail from '@salesforce/apex/EmailController.sendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcAdvanceEmailToOthers extends LightningElement {

 @api recordId; // Case Id
    @track fromOptions = [];
    selectedFrom = '';
    toAddress = '';
    subject = '';
    body = '';

    @wire(getFromAddressOptions)
    wiredAddresses({ data, error }) {
    if (data) {
        let options = data.map(email => ({
            label: email,
            value: email
        }));

        // Always add test@gmail.com at the top
        options.unshift({
            label: 'test@gmail.com',
            value: 'test@gmail.com'
        });

        this.fromOptions = options;

        // Always default to test@gmail.com
        this.selectedFrom = 'test@gmail.com';
    }

    if (error) {
        console.error(error);
    }
}


     handleFromChange(event) {
        this.selectedFrom = event.target.value;
    }
    handleToChange(event) {
        this.toAddress = event.target.value;
    }
    handleSubjectChange(event) {
        this.subject = event.target.value;
    }
    handleBodyChange(event) {
        this.body = event.target.value;
    }

    sendEmailHandler() {
        if (!this.toAddress || !this.subject || !this.body) {
            this.showToast('Error', 'All fields are required', 'error');
            return;
        }

        sendEmail({
            toAddress: this.toAddress,
            fromAddress: this.selectedFrom,
            subject: this.subject,
            body: this.body,
            caseId: this.recordId
        })
        .then(() => {
            this.showToast('Success', 'Email Sent Successfully', 'success');
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });

       
    }

      showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }





}