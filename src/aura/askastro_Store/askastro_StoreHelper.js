({
  renderComponents: function(cmp) {
    var bodyArray = cmp.get("v.body");
    for (var i = 0; i < bodyArray.length; i++) {
      if (bodyArray[i].isInstanceOf("c:askastro_Route")) {
        bodyArray[i].renderRoute();
      }
    }
  }
});
