import { combineReducers } from "redux";
import search from "./search";
import tickets from "./tickets";
import article from "./article";
import router from "./router";

const rootReducer = combineReducers({
  search,
  tickets,
  article,
  router
});

export default rootReducer;
