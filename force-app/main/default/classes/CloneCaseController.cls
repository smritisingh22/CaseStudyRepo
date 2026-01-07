public with sharing class CloneCaseController {
    @AuraEnabled
    public static Id clonedCase(Id caseId) {
        if (caseId == null) {
            throw new AuraHandledException('Case Id is required');
        }
        Case originalCase = [SELECT Subject, Description, Priority, Status, Origin FROM Case WHERE Id = :caseId WITH SECURITY_ENFORCED LIMIT 1];
        System.debug('Original Case Id: ' + originalCase.Id);
        Case newCase = originalCase.clone(false, true, false, false); 
         try {
            insert as user newCase;
            System.debug('Inserted Case Id: ' + newCase.Id);
            return newCase.Id;
        } catch (Exception e) {
        System.debug('Error inserting case: ' + e.getMessage());
        throw new AuraHandledException('Error inserting case: ' + e.getMessage());
    }
    }
}
