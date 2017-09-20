({
  renderComponent: function(cmp, event, helper) {
    //pass path to the children that are routes
    var children = cmp.get("v.body");
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.isInstanceOf("c:askastro_Route")) {
        child.set("v.parentPath", cmp.get("v.parentPath") + cmp.get("v.path"));
        child.renderRoute();
      }
    }

    helper.createDestroyCmp(cmp);
  },
  stateChanged: function(cmp, event, helper) {
    if (cmp.get("v.componentAlreadyRendered")) {
      helper.updateStateInContainer(cmp);
    }
  },
  routerStateChanged: function(cmp, event, helper) {
    helper.createDestroyCmp(cmp);
  }
});
