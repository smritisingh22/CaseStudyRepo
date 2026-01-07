//import {encodeDefaultFieldValues} from 'lightning/pageRefrenceUtils';
import { LightningElement,wire,track,api } from 'lwc';
import LightningModal from 'lightning/modal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import RECEIPT from '@salesforce/schema/Receipt__c';
import MODE_OF_PAY from '@salesforce/schema/Receipt__c.Mode_of_Pay__c';
import AMOUNT from '@salesforce/schema/Receipt__c.Amount__c';
import PAYMENT_DATE from '@salesforce/schema/Receipt__c.Amount_Paid_Date__c';
import CONTACT from '@salesforce/schema/Receipt__c.Contact__c';


export default class LwcBasicCaseStudy7 extends LightningModal {
    @api recordId;
    @track amount;
    @track payDate;
    @track modeOptions=[];
    @track selectedMode;

    @wire(getObjectInfo,{objectApiName:RECEIPT})
    objectInfo;

    @wire(getPicklistValues,{
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: MODE_OF_PAY
    })
    wiredPicklist({error,data}){
        if(data){
            this.modeOptions=data.values;
            console.log('',data.values);
        }
        if(error){
            console.log('Error in fetching picklist values',error);
        }
    }

    handleAmountChange(event)
    {
        this.amount=event.target.value;
    }
    
    handleDateChange(event)
    {
        this.payDate=event.target.value;
    }

    handlePayModeChange(event)
    {
        this.selectedMode=event.target.value;
    }
    
    handleCreateReceipt()
    {
        console.log('Record Id', this.recordId);
        const receiptDetails={};
        receiptDetails[AMOUNT.fieldApiName]=this.amount;
        receiptDetails[PAYMENT_DATE.fieldApiName]=this.payDate;
        receiptDetails[MODE_OF_PAY.fieldApiName]=this.selectedMode;
        receiptDetails[CONTACT.fieldApiName]=this.recordId;
        console.log('receiptDetails',JSON.stringify(receiptDetails));

        const recInput={apiName:RECEIPT.objectApiName,fields:receiptDetails};

        createRecord(recInput)
        .then(receipt=>{
            console.log('Receipt created with Id:',receipt.id);
            this.showMessage('Success','Receipt created successfully','success');
            this.amount=null;
            this.payDate=null;
            this.selectedMode=null;
            this.close();
            
        })
        .catch(error=>{
            console.log('Error in creating receipt:',error);
        });

    }

    showMessage(title, message, variant)
    {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}