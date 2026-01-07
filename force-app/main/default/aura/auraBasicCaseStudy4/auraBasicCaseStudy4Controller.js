({
    cloneCase : function(component, event, helper) {
        if(component.get("v.loading")) return;
        component.set("v.loading", true);
        var action = component.get("c.clonedCase");
        action.setParams({ caseId : component.get("v.recordId") });

        action.setCallback(this, function(response) {
            component.set("v.loading", false);
            var state = response.getState();
            if(state === "SUCCESS") {
                var newCaseId = response.getReturnValue();
                console.log("Cloned Case ID: " + newCaseId);
                // Navigate to the cloned case
                var navEvt = $A.get("e.force:navigateToURL");
                navEvt.setParams({
                    "recordId": newCaseId,
                    "url": "https://ajsd-3a1-dev-ed.develop.lightning.force.com/lightning/r/Case/"+newCaseId+"/view"
                    //"slideDevName": "detail"
                });
                navEvt.fire();
            } else if (state === "ERROR") {
                var errors = response.getError();
                if(errors && errors[0] && errors[0].message) {
                    alert('Error: ' + errors[0].message);
                } else {
                    alert('Unknown error');
                }
            }
        });

        $A.enqueueAction(action);
    }
})
