public with sharing class ContactLwcController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByAccountId(Id accountId) {
        return [SELECT Id, Name, Email, MobilePhone FROM Contact WHERE AccountId = :accountId WITH SECURITY_ENFORCED];
    }
}