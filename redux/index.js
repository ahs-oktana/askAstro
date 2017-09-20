import "../style.scss";
import "../sunset.png";
import { createStore, bindActionCreators, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import * as actionCreators from "./actionCreators";
import { Hydrator } from "./hydrator";

const store = createStore(reducer, applyMiddleware(thunk));
const actions = bindActionCreators(actionCreators, store.dispatch);
const tree = [
  {
    name: "/search",
    pattern: /^#?\/search/,
    actions: [],
    children: [
      {
        name: "/search/:query",
        pattern: /^#?\/search\/([^\/]+)/,
        actions: [actions.search],
        children: []
      }
    ]
  },
  {
    name: "/tickets",
    pattern: /^#?\/tickets/,
    actions: [],
    children: [
      {
        name: "/tickets/:id",
        pattern: /^#?\/tickets\/([^\/]+)/,
        actions: [],
        children: []
      }
    ]
  },
  {
    name: "/article",
    pattern: /^#?\/article/,
    actions: [],
    children: [
      {
        name: "/article/:id",
        pattern: /^#?\/article\/([^\/]+)/,
        actions: [],
        children: [
          {
            name: "/article/:id/flag",
            pattern: /^#?\/article\/([^\/]+)\/flag/,
            actions: [],
            children: []
          }
        ]
      }
    ]
  },
  {
    name: "/favorites",
    pattern: /^#?\/favorites/,
    actions: [],
    children: [
      {
        name: "/favorites/:id",
        pattern: /^#?\/favorites\/([^\/]+)/,
        actions: [],
        children: []
      }
    ]
  },
  {
    name: "/logtickets",
    pattern: /^#?\/logtickets/,
    actions: [],
    children: []
  },
  {
    // For Testing
    name: "/url",
    pattern: /^#?\/url/,
    actions: [],
    children: [
      {
        name: "/url/:term1/",
        pattern: /^#?\/url\/([^\/]+)/,
        actions: [],
        children: [
          {
            name: "/url/:term1/:term2",
            pattern: /^#?\/url\/([^\/]+)\/([^\/]+)/,
            actions: [],
            children: []
          }
        ]
      }
    ]
  }
];

let astroHydrator = new Hydrator(tree);

export { astroHydrator, store, actions, tree };
