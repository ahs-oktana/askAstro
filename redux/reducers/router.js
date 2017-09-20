module.exports = function router(state = {}, action) {
  switch (action.type) {
    case "ARTICLE_LOADED":
      return {
        state: "/article/" + action.articleId
      };
    case "ARTICLE_DISLIKE":
      return {
        state: "/article/" + action.articleId + "/flag"
      };
    case "ARTICLE_SHOW_NAME":
      return {
        state: "/article/" + action.articleId + "/title"
      };
    default:
      var defaultState = "/search";

      if (state.state == null) {
        var pathname = window.location.pathname;
        var standalone = /^\/c\/./.test(pathname);

        if (standalone && window.location.hash != "") {
          defaultState = window.location.hash.substring(1);
        }
      } else {
        defaultState = state.state;
      }
      return {
        state: defaultState
      };
  }
};
