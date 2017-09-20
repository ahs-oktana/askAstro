({
  dislikeArticle: function(cmp, e, helper) {
    askAstro.actions.dislikeArticle();
  },
  showTitle: function(cmp, e, helper){
    var title = cmp.get("v.name");
    askAstro.actions.showTitle(title);
  }
});
