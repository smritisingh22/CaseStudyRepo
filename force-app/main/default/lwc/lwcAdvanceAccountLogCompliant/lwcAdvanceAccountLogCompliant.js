import { LightningElement, api, track, wire } from 'lwc';
import getComplaints from '@salesforce/apex/ComplaintController.getComplaints';

export default class LwcAdvanceAccountLogCompliant extends LightningElement {


    @api recordId;
    @track complaints = [];
    @track showModal = false;

    columns = [
        { label: 'Name', fieldName: 'Compliant_Name__c' },
        { label: 'Type', fieldName: 'Complaint_Type__c' },
        { label: 'Comments', fieldName: 'Comments__c' },
        { label: 'Resolution', fieldName: 'Resolution__c' }
    ];

    @wire(getComplaints, { accountId: '$recordId' })
    wiredData({ error, data }) {
        if (data) this.complaints = data;
    }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    loadData() {
        // Refresh list after new complaint
        console.log(this.recordId);
        getComplaints({ accountId: this.recordId }).then(result => {
            this.complaints = result;
        });
    }


}