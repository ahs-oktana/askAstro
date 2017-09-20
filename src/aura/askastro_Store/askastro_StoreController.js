({
  update: function(cmp, event, helper) {
    if (cmp.get("v.storeIsLoaded")) {
      askAstro.astroHydrator.dispatchRunList(window.location.hash);
    }
    console.log(window.location.hash);
  },
  afterStoreScriptLoaded: function(cmp, event, helper) {
    askAstro.store.subscribe(
      $A.getCallback(function(err, data) {
        if (cmp.isValid()) {
          cmp.set("v.store", askAstro.store.getState());
        }
      })
    );

    // for Testing
    let hash = window.location.hash;
    if (!hash) {
      hash = "/search";
    }
    cmp.set("v.store", askAstro.store.getState());

    helper.renderComponents(cmp);
  },
  handleInit: function(cmp, evt, helper) {
    let hash = window.location.hash;
    if (!hash) {
      hash = "/search";
    }

    askAstro.astroHydrator.dispatchRunList(hash);
  }
});
