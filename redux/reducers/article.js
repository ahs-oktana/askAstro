module.exports = function article(state = {}, action) {
  switch (action.type) {
    case "ARTICLE_PENDING":
      state.id = action.articleId;
      return state;
    case "ARTICLE_LOADED":
      state.name = action.data[0].name;
      state.description = action.data[0].description;
      return state;
    case "ARTICLE_SHOW_NAME":
      state.name = action.name;
      return state;
    default:
      return {
        id: "h7sfah9fSDFa64"
      };
  }
};
