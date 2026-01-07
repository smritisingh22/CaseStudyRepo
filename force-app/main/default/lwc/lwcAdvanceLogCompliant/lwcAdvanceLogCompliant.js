import { LightningElement,wire,api,track } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getRecordUi } from 'lightning/uiRecordApi';
import createComplaint from '@salesforce/apex/ComplaintController.createComplaint';
import getCaseDetails from '@salesforce/apex/CaseDetailsController.getCaseDetails';
import getAccountDetails from '@salesforce/apex/AccountDetailsIdController.getAccountDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import COMPLIANT from '@salesforce/schema/Complaint__c';
import COMPLIANT_TYPE from '@salesforce/schema/Complaint__c.Complaint_Type__c';
import CASE_COMPLIANT from '@salesforce/schema/Complaint__c.Case__c';
import COMMENTS from '@salesforce/schema/Complaint__c.Comments__c';
import RESOLUTION from '@salesforce/schema/Complaint__c.Resolution__c';

export default class LwcAdvanceLogCompliant extends LightningElement {


    @api recordId;
    @track complaintType;
    @track comments = '';
    @track resolution = '';
    @track typeOptions = [];
    @track compDetails={};
    @track objectName='';
    @track record;
    @track caseId;
    @track accId;

    

    @wire(getObjectInfo,{objectApiName:COMPLIANT})
    objectInfo;

    @wire(getPicklistValues,{
            recordTypeId: '$objectInfo.data.defaultRecordTypeId',
            fieldApiName: COMPLIANT_TYPE
        })
    wiredTypeOptions({error,data}){
        if(data){
            console.log('Data:: ',data.values);
            this.typeOptions=data.values;
        }
        if(error){
            console.log('Error::',error);
        }
    }



    handleTypeChange(event)
    {
        this.complaintType=event.target.value;
    }

    handleComments(event) {
        this.comments = event.target.value;
    }

    handleResolution(event) {
        this.resolution = event.target.value;
    }

    handleCancel() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    connectedCallback()
    {
        console.log('Record Id  at connectedCallback: ', this.recordId);
        console.log('Object Name at connectedCallback: ', this.objectName);
    }

    async loadCaseDetails() {
    try {
        const result = await getCaseDetails({ caseId: this.recordId });
        if (result && result.length > 0) {
            this.caseId = result[0].Id;
            this.objectName = 'Case';
            console.log('Case Id:', this.caseId);
            console.log('Object Name:', this.objectName); // ✅ Works
        }
    } catch (error) {
        console.error(error);
        this.showToast('Error', error.body?.message || error.message, 'error');
    }
    // Here, this.objectName is now set
}



    async loadAccountDetails()
    {
        try {
        const result = await getAccountDetails({ accountId: this.recordId });
        if (result && result.length > 0) {
                this.accId = result[0].Id;
                this.objectName = 'Account';
                console.log('Case Id:', this.caseId);
                console.log('Object Name:', this.objectName); // ✅ Works
            }
        }
        catch (error) {
        console.error(error);
        this.showToast('Error', error.body?.message || error.message, 'error');
    }

    
    }


    async handleSubmit()
    {
        console.log('Object is: ', this.objectApiName);
        console.log('Record Id is: ', this.recordId);   


        await this.loadCaseDetails();
        console.log('Object Name After Async call of loadCaseDetails: ', this.objectName);
        
        await this.loadAccountDetails();
         console.log('Object Name After Async call of loadAccountDetails: ', this.objectName);

        if (!this.objectName) {
            this.showToast('Error', 'Record details not loaded yet. Please wait a moment.', 'error');
            return;
        }


        try
        {
       if (!this.complaintType || !this.comments) {
            this.showToast('Error', 'Please fill all mandatory fields.', 'error');
            return;
        }

        if(this.objectName=='Case')
        {
            
        this.compDetails = {
            Case__c: this.caseId,
            Complaint_Type__c: this.complaintType,
            Comments__c: this.comments,
            Resolution__c: this.resolution
        };
     }

     if(this.objectName=='Account')
     {
        this.compDetails = {
            Account__c: this.recordId,
            Complaint_Type__c: this.complaintType,
            Comments__c: this.comments,
            Resolution__c: this.resolution
        };
     }


        createComplaint({ comp: this.compDetails })
        .then(result => {
            this.showToast('Success', 'Complaint Logged Successfully', 'success');
            this.dispatchEvent(new CustomEvent('refresh'));
            this.dispatchEvent(new CustomEvent('close'));
        })
        .catch(error => {
            console.log(error);
            this.showToast('Error', error.body.message, 'error');
        });
        }
        catch (err) {
            console.log('JS Error:', err);
            this.showToast('Error', err.message, 'error');
        }

    }


     showToast(title, message, variant) {
        
         const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    
    }
}