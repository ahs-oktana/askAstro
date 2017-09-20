module.exports = function search(state = {}, action) {
  switch (action.type) {
    case "SEARCH":
      state.query = action.query;
      state.pending = true;
      state.finished = false;
      return state;
    case "SEARCH_FINISHED":
      state.result = action.data;
      state.pending = false;
      state.finished = true;
      return state;
    default:
      return {
        query: ""
      };
  }
};
