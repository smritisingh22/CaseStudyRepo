({
    fetchContacts : function(component) {
        const action = component.get('c.getRelatedContacts');
        action.setParams({
            recordId: component.get('v.recordId')
        });

        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
            
                let data = response.getReturnValue();
                console.log("Contacts returned:", data);
                component.set('v.contactList', data);
            } else {
                console.log('Error fetching contacts:', response.getError());
            }
        });
        
        $A.enqueueAction(action);
    }
})