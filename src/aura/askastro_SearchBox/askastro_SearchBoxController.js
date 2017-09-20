({
  handleSearchBoxKeyPress: function(component, event, helper) {
    if (event.getParams().keyCode == 13) {
      if (
        component.get("v.query") != null &&
        component.get("v.query").trim() != ""
      ) {
        //call the action
        askAstro.actions.search(component.get("v.query"));
      }
    }
  }
});
