({
  doInit: function(component, event, helper) {
    var cmpName = component.get("v.cmpName");
    if (cmpName != null && cmpName != "") {
      cmpName = decodeURI(cmpName);
      $A.createComponent(
        cmpName,
        {
          "aura:id": "testing"
        },
        newComponentHandler
      );

      function newComponentHandler(newCmp) {
        if (component.isValid()) {
          var body = component.get("v.body");
          body.unshift(newCmp);
          console.log(
            "Component Name " +
              component.get("v.cmpName") +
              " added to the body."
          );
          component.set("v.body", body);
        }
      }
    }
  },
  doneRendering: function(component, event, helper) {
    // Grab wrapper component
    const wrapper = document.getElementById("testing");
    // Create Flag newComponentHandler
    let flag = document.createElement("div");
    flag.setAttribute("id", "testReady");
    // Add flag
    wrapper.appendChild(flag);
  }
});
