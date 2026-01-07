public with sharing class CaseDetailsController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseDetails(Id caseId) {
        return [
            SELECT Id, Subject, Status
            FROM Case
            WHERE Id= :caseId
            WITH SECURITY_ENFORCED
            LIMIT 1
           
        ];
    }
}