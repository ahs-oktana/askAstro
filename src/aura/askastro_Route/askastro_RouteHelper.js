({
  createDestroyCmp: function(cmp) {
    var currentRouterState = cmp.get("v.routerState");
    var routePath = cmp.get("v.path");
    var parentPath = cmp.get("v.parentPath");
    var isExact = cmp.get("v.exact");

    var currentRouterStateArray = currentRouterState != ""
      ? currentRouterState.substring(1).split("/")
      : [];
    var parentPathArray = parentPath != ""
      ? parentPath.substring(1).split("/")
      : [];
    var routePathArray = routePath != ""
      ? routePath.substring(1).split("/")
      : [];

    if (parentPathArray.length > currentRouterStateArray.length) {
      //throw error
      cmp.set(
        "v.errorMsg",
        "Parent Component path cannot be greater than the current application path"
      );
    } else {
      var renderCmp = false;

      var relativePathArray = currentRouterStateArray;
      relativePathArray.splice(0, parentPathArray.length);

      var maxLength = relativePathArray.length > routePathArray.length
        ? relativePathArray.length
        : routePathArray.length;

      if (
        (isExact && relativePathArray.length == routePathArray.length) ||
        !isExact
      ) {
        renderCmp = true;
        //iterating over the relative path
        for (var i = 0; i < maxLength; i++) {
          if (routePathArray[i] != null && relativePathArray[i] != null) {
            if (relativePathArray[i] != routePathArray[i]) {
              if (!routePathArray[i].startsWith(":")) {
                //if it's not a parameter
                renderCmp = false;
                break;
              }
            }
          } else if (relativePathArray[i] == null) {
            if (!routePathArray[i].startsWith(":")) {
              renderCmp = false;
              break;
            }
          }
        }
      }

      if (renderCmp) {
        this.renderComponent(cmp);
      } else {
        this.unrenderComponent(cmp);
      }
    }
  },
  renderComponent: function(cmp) {
    if (cmp.isValid() && !cmp.get("v.componentAlreadyRendered")) {
      var componentName = cmp.get("v.cmpName");
      if (componentName) {
        if (!cmp.get("v.componentIsBeingCreated")) {
          cmp.set("v.componentIsBeingCreated", true);
          var attrs = {};
          attrs.state = cmp.get("v.state");
          $A.createComponent(componentName, attrs, newComponentHandler);
        }
      } else {
        cmp.set("v.errorMsg", "Component name is empty.");
      }
      function newComponentHandler(newCmp) {
        if (cmp.isValid()) {
          var body = cmp.get("v.body");
          body.unshift(newCmp);
          console.log(
            "Component Name " + cmp.get("v.cmpName") + " added to the body."
          );
          // Fire Initialization Event
          let appEvent = $A.get("e.c:askastro_init");
          appEvent.fire();

          cmp.set("v.body", body);
          cmp.set("v.componentIsBeingCreated", false);
          cmp.set("v.componentAlreadyRendered", true);
        }
      }
    }
  },
  unrenderComponent: function(cmp) {
    if (cmp.get("v.componentAlreadyRendered")) {
      var bodyArray = cmp.get("v.body");
      var cmpToDelete;
      var i;
      for (i = 0; i < bodyArray.length; i++) {
        if (bodyArray[i].isInstanceOf(cmp.get("v.cmpName"))) {
          cmpToDelete = bodyArray[i];
          break;
        }
      }
      if (cmpToDelete) {
        cmpToDelete.destroy();
        cmp.set("v.body", bodyArray.splice(i, 1));
        cmp.set("v.componentAlreadyRendered", false);
      } else {
        cmp.set(
          "v.errorMsg",
          "Component to delete wasn' found in the body of the Route"
        );
      }
    }
  },
  updateStateInContainer: function(cmp) {
    cmp.get("v.body")[0].set("v.state", cmp.get("v.state"));
  }
});
