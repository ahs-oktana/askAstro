import { tree } from "../index";
import { Hydrator, exploreBranch } from "./index";

let testingHydrator = new Hydrator(tree);

// Get WildCards
test("Getting Simple Wildcard as String", () => {
  expect(testingHydrator.getWildCards("/search/term")[0]).toBe("term");
});

test("Checks to make sure getWildCards returns an array.", () => {
  expect(Array.isArray(testingHydrator.getWildCards("/search/term"))).toBe(
    true
  );
});

test("Returns the same array", () => {
  expect(testingHydrator.getWildCards("/search/term")).toEqual(["term"]);
});

test("Testing Simple Wildcard as String with extra slash", () => {
  expect(testingHydrator.getWildCards("/search/term/")[0]).toBe("term");
});

test("Testing Simple Wildcard as String with special characters", () => {
  expect(
    testingHydrator.getWildCards("/search/term)(*&^%$#@13132165...)")[0]
  ).toBe("term)(*&^%$#@13132165...)");
});

test("Testing else case in exploreBranch", () => {
  const traverseList = [];
  const hash = "";
  expect(exploreBranch(traverseList, hash)).toEqual([]);
});

test("Testing else if case in exploreBranch", () => {
  // Create tree
  const testTree = [
    {
      name: "/test",
      pattern: /^#?\/(test)/,
      actions: [],
      children: []
    }
  ];
  const hash = "";
  expect(exploreBranch(testTree, "/test")).toEqual(testTree);
});

test("Verify Monkey Patching is working in the dispatchRunList function", () => {
  let testSwitch = "blank";

  const testFunction = arg => {
    testSwitch = "test";
  };

  // Create tree
  const testTree = [
    {
      name: "/test",
      pattern: /^#?\/(test)/,
      actions: [testFunction],
      children: []
    }
  ];

  // Create new hydrator
  const monkeyHydrator = new Hydrator(testTree);
  monkeyHydrator.dispatchRunList("/test");

  expect(testSwitch).toBe("test");
});
