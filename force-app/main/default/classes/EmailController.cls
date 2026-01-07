public with sharing class EmailController {

    // Fetch current user email + Org-Wide Email Addresses
    @AuraEnabled(cacheable=true)
    public static List<String> getFromAddressOptions() {
        List<String> listEmails = new List<String>();

        // Logged-in user email
        listEmails.add(UserInfo.getUserEmail());

        // Org-Wide Email Addresses
        for (OrgWideEmailAddress owa : [
            SELECT Address 
            FROM OrgWideEmailAddress WITH SECURITY_ENFORCED
        ]) {
            listEmails.add(owa.Address);
        }

        return listEmails;
    }

    // Send Email
    @AuraEnabled
    public static String sendEmail(String toAddress, String fromAddress, String subject, String body, Id caseId) {

        // Create email
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new List<String>{ toAddress });
        mail.setSubject(subject);
        //mail.setPlainTextBody(body);
        mail.setHtmlBody(body);
        mail.setWhatId(caseId);

        /*
        // Set from address
        if(fromAddress == UserInfo.getUserEmail()) {    
            mail.setReplyTo(fromAddress);
            mail.setSenderDisplayName('Case Support Team');
        } else {
            // match Org-Wide Email
            OrgWideEmailAddress matchedOWA = [
                SELECT Id 
                FROM OrgWideEmailAddress 
                WHERE Address = :fromAddress 
                WITH SECURITY_ENFORCED
                LIMIT 1
            ];
            mail.setOrgWideEmailAddressId(matchedOWA.Id);
        }*/

        if (fromAddress == 'test@gmail.com') {
            mail.setReplyTo('test@gmail.com');
            mail.setSenderDisplayName('Case Support Team');
        }
        else if (fromAddress == UserInfo.getUserEmail()) {
            mail.setReplyTo(fromAddress);
            mail.setSenderDisplayName('Case Support Team');
        }
        else {
            // Org-wide
            OrgWideEmailAddress matchedOWA = [
                SELECT Id FROM OrgWideEmailAddress WHERE Address = :fromAddress WITH SECURITY_ENFORCED LIMIT     1
            ];
            mail.setOrgWideEmailAddressId(matchedOWA.Id);
        }


        // Send email
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{ mail });

        return 'SUCCESS';
    }
}
