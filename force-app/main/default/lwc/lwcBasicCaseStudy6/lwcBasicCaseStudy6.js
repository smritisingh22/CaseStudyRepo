import { LightningElement,wire,track } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';

export default class LwcBasicCaseStudy6 extends LightningElement {
    columns=[
        { label:'Account Id',fieldName:'Id',type:'text'},
        { label:'Account Name',fieldName:'Name',type:'text'},
        { label:'Account Number',fieldName:'AccountNumber',type:'text'},
        { label:'Billing State',fieldName:'BillingState',type:'text'},

];

@track searchKey;
@track hasResults=false;
@track accounts;


handleSearchChange(event)
{
    this.searchKey = event.target.value;
   
}


handleSearch()
{
   
    searchAccounts({searchString:this.searchKey})
    .then(result=>{
        this.accounts=result;
        console.log('Fetched Accounts: ' + JSON.stringify(result));
    })
    .catch(error=>{
        console.log('Error in fetching Accounts: ' + JSON.stringify(error));
    });
     this.hasResults=true;
    
}

}