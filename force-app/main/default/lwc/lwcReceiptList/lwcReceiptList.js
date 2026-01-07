import { LightningElement,track,wire,api } from 'lwc';
import {getRecords} from 'lightning/uiRecordApi';
import getReceiptRecords from '@salesforce/apex/ReceiptController.getReceiptRecords';

export default class LwcReceiptList extends LightningElement {
    @track columns=[
        {label:'Receipt Name',fieldName:'Name',type:'text'},
        {label:'Amount',fieldName:'Amount__c',type:'currency'},
        {label:'Mode of Payment',fieldName:'Mode_of_Pay__c',type:'text'},
        {label:'Payment Date',fieldName:'Amount_Paid_Date__c',type:'date'}
      //  {label:'Contact Name',fieldName:'contactName',type:'text'}
    ];

    @api recordId;
    @track receipts=[];
    @track hasData=false;
    
    @wire(getReceiptRecords,{contactId:'$recordId'})
    receiptdata({error,data}){
        if(data){
            this.receipts=data;
            /*
             this.receipts = data.map(rec => ({
            ...rec,
            contactName: rec.Contact__r ? rec.Contact__r.Name : ''
            
        }));*/
            console.log('Data::',data);
            console.log('Receipts',JSON.stringify(this.receipts));
            this.hasData=this.receipts.length>0?true:false;
        }
        if(error){
            console.log('Error in fetching receipt records',error);
        }
    }

}