public with sharing class AccountSearchController {
  
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchString) {
        try {
            
            String searchPattern = '%' + String.escapeSingleQuotes(searchString) + '%';
            List<Account> accounts = [SELECT Id, Name, AccountNumber,BillingState
                                      FROM Account 
                                      WHERE Name LIKE :searchPattern 
                                      WITH SECURITY_ENFORCED
                                      ORDER BY Name 
                                      
                                      ];
            return accounts;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}