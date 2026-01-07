({
    doInit : function(component, event, helper) {
        // Define columns for datatable
        component.set('v.columns', [
            { label: 'Name', fieldName: 'Name', type: 'text' },
            { label: 'Email', fieldName: 'Email', type: 'email' },
            { label: 'Phone', fieldName: 'Phone', type: 'phone' },
            { label: 'Title', fieldName: 'Title', type: 'text' }
        ]);
        
        helper.fetchContacts(component);
    }
})