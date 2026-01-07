public with sharing class NewContactCreationController {
   
    @AuraEnabled
    public static Contact createNewContact(String firstName, String lastName, String email, String department) {
        Contact newContact = new Contact(
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            Department = department
        );
        
        try {
            insert as user newContact;
            return newContact;
        } catch (DmlException e) {
            // Handle exception (e.g., log error, rethrow, etc.)
            throw new AuraHandledException('Error creating contact: ' + e.getMessage());
        }
    }

}