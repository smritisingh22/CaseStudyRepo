public with sharing class OpportunityLwcController {


    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunityById(Id opportunityId) {
        return [SELECT AccountId FROM Opportunity WHERE Id = :opportunityId WITH SECURITY_ENFORCED];
    }
}