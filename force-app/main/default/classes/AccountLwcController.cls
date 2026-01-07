/*public with sharing class AccountLwcController {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountName(){
        try {
            return [SELECT Id, Name FROM Account WITH SECURITY_ENFORCED];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}*/
public with sharing class AccountLwcController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountName() {
        return [SELECT Id, Name FROM Account WITH SECURITY_ENFORCED];
    }
}