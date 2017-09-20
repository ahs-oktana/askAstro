
export function dislikeArticle() {
  return function(dispatch, getState) {
    dispatch({
      type: "ARTICLE_DISLIKE",
      articleId: getState().article.id
    });
  };
}

export function showTitle(title) {
  return function(dispatch, getState) {
    dispatch({
      type: "ARTICLE_SHOW_NAME",
      articleId: getState().article.id,
      name: title
    });
  };
}
