public with sharing class ReceiptController {
    
    @AuraEnabled(cacheable=true)
    public static List<Receipt__c> getReceiptRecords(String contactId){
        try {
            List<Receipt__c> receiptList = [SELECT Id, Name, Amount__c, Amount_Paid_Date__c, Mode_of_Pay__c, Contact__r.Name FROM Receipt__c WHERE Contact__c = :contactId WITH SECURITY_ENFORCED ];
            return receiptList;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}