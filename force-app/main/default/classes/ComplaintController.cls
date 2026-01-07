
public with sharing class ComplaintController {

    @AuraEnabled
    public static Id createComplaint(Complaint__c comp) {

     //String objCaseType = comp.Case__c.getSObjectType().getDescribe().getName();
      //String objAccType = comp.Account__c.getSObjectType().getDescribe().getName();

    String objCaseType = comp.Case__c != null ? 'Case' : null;
   String objAccType  = comp.Account__c != null ? 'Account' : null;
   


        system.debug(comp);
        system.debug(comp.Complaint_Type__c); 
        system.debug(objAccType);
        system.debug(objCaseType);

    if(objCaseType=='Case'){
       Id caseRecId=comp.Case__c;
       Id caseRecAccId = [SELECT AccountId FROM Case WHERE Id = :caseRecId WITH SECURITY_ENFORCED LIMIT 1].AccountId;

        Account acc = [
            SELECT Name 
            FROM Account 
            WHERE Id = :caseRecAccId 
            WITH SECURITY_ENFORCED
            LIMIT 1
        ];

        Integer countExisting = [
            SELECT COUNT() 
            FROM Complaint__c
            WHERE Account__c = :caseRecAccId AND Complaint_Type__c = :comp.Complaint_Type__c
            WITH SECURITY_ENFORCED
        ];

        

        system.debug('Existing Complaints: ' + countExisting);

        Integer seq = countExisting + 1;

        system.debug('Sequence: ' + seq);

        // SETTING CUSTOM COMPLAINT NAME
        comp.Compliant_Name__c = 
            acc.Name + ' ' + comp.Complaint_Type__c + ' ' +
            String.valueOf(seq).leftPad(2, '0');
            comp.Account__c = caseRecAccId;

        insert as user comp;
        return comp.Id;
    }

    else if(objAccType=='Account')
    {
        Id accRecId=comp.Account__c;

          Account acc = [
            SELECT Name 
            FROM Account 
            WHERE Id = :accRecId 
            WITH SECURITY_ENFORCED
            LIMIT 1
        ];

        Integer countExisting = [
            SELECT COUNT() 
            FROM Complaint__c
            WHERE Account__c = :accRecId AND Complaint_Type__c = :comp.Complaint_Type__c
            WITH SECURITY_ENFORCED
        ];

        Integer seq = countExisting + 1;
        comp.Compliant_Name__c = 
            acc.Name + ' ' + comp.Complaint_Type__c + ' ' +
            String.valueOf(seq).leftPad(2, '0');
           insert as user comp;
        return comp.Id;


    }
    else{
        return null;
    }

    }

   @AuraEnabled(cacheable=true)
    public static List<Complaint__c> getComplaints(Id accountId) {
        return [
            SELECT Id, Name,Compliant_Name__c, Complaint_Type__c, Comments__c, Resolution__c, CreatedDate
            FROM Complaint__c
            WHERE Account__c = :accountId
            WITH SECURITY_ENFORCED
            ORDER BY CreatedDate DESC
        ];
    }


   
}

