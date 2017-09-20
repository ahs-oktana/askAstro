
export function doFetch(url) {
  return fetch(url).then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  });
}

export function search(param) {
  //thunk
  return function(dispatch, getState) {
    dispatch({
      type: "SEARCH",
      query: param
    });
    return doFetch(
      "https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6&page=1&per_page=7"
    ).then(function(data) {
      dispatch({
        type: "SEARCH_FINISHED",
        data
      });
    });
  };
}

export function goToArticle(param) {
  return function(dispatch, getState) {
    dispatch({
      type: "ARTICLE_PENDING",
      articleId: param
    });
    return doFetch("https://api.punkapi.com/v2/beers/" + param).then(function(
      data
    ) {
      dispatch({
        type: "ARTICLE_LOADED",
        articleId: getState().article.id,
        data
      });
    });
  };
}
