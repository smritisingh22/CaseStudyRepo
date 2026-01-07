import { LightningElement,wire,track,api } from 'lwc';
import getOpportunityById from '@salesforce/apex/OpportunityLwcController.getOpportunityById';
import getContactsByAccountId from '@salesforce/apex/ContactLwcController.getContactsByAccountId';

export default class LwcBasicCaseStudy3 extends LightningElement {
   
    @api recordId;
    @track accountId;
    @track relatedContacts;
    @track hasContacts=false;
    columns=[
        {label:'Contact Name',fieldName:'Name',type:'text'},
        {label:'Email',fieldName:'Email',type:'email'},
        {label:'Mobile Phone',fieldName:'MobilePhone',type:'phone'}
    ];

    @wire(getOpportunityById,{opportunityId:'$recordId'})
    wiredOpportunity({ error, data }) {
        if (data) {
            this.accountId = data[0].AccountId;
            console.log('Account Id from Opportunity: ' + this.accountId);
        } else if (error) {
            this.accountId = undefined;
            console.log('Error in fetching Opportunity: ' + JSON.stringify(error));
        }
    }

    @wire(getContactsByAccountId,{accountId:'$accountId'})
    wiredContacts({ error, data }) {
        if (data) {
            this.relatedContacts = data;
            if(this.relatedContacts.length > 0){
            this.hasContacts = true;
            }
           
            console.log('Related Contacts: ' + JSON.stringify(this.relatedContacts));
        } else if (error) {
            this.relatedContacts = undefined;
            
            console.log('Error in fetching Contacts: ' + JSON.stringify(error));
        }
    }

  

}