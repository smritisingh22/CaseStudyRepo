public with sharing class AccountDetailsIdController {
       @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetails(Id accountId) {
        return [
            SELECT Name
            FROM Account
            WHERE Id= :accountId
            WITH SECURITY_ENFORCED
            LIMIT 1
           
        ];
    }
}
