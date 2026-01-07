public with sharing class AccountRelatedContact {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(Id recordId) {

        System.debug('Incoming recordId: ' + recordId);

        if (recordId == null) {
            System.debug('Record Id was null');
            return new List<Contact>();
        }

        // Check if recordId is for Opportunity
        String objectType = recordId.getSObjectType().getDescribe().getName();
        System.debug('Object type: ' + objectType);

        Id accountId;

        // If we are on Opportunity page
        if (objectType == 'Opportunity') {
            try {
                Opportunity opp = [
                    SELECT Id, AccountId
                    FROM Opportunity
                    WHERE Id = :recordId
                    WITH SECURITY_ENFORCED
                    LIMIT 1
                ];

                accountId = opp.AccountId;
                System.debug('Found Account Id: ' + accountId);
            } catch (Exception e) {
                System.debug('Opportunity query failed: ' + e.getMessage());
                return new List<Contact>();
            }
        }

        // No account on opp? Return empty
        if (accountId == null) {
            System.debug('No Account found for Opportunity');
            return new List<Contact>();
        }

        // Fetch Contacts
        List<Contact> contacts = [
            SELECT Id, Name, Email, Phone, Title
            FROM Contact
            WHERE AccountId = :accountId
            WITH SECURITY_ENFORCED
            ORDER BY LastName
        ];

        System.debug('Contacts returned: ' + contacts);

        return contacts;
    }
}
