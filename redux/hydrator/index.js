class Hydrator {
  constructor(tree) {
    this.tree = tree;
    this.runList = [];
  }

  // Checks to see if there is a wild card in the hash, if so returns it.
  getWildCards(hash) {
    let activeNode = getActiveNode(hash, this.tree);
    let matches = activeNode.pattern.exec(hash) || false;
    let wildCards = [...matches];

    wildCards.shift();

    return wildCards;
  }

  // A method that creates a list of actions that need to be executed based on a hash location.
  getRunList(hash) {
    const nodeList = getActiveBranchList(hash, this.tree);
    const actionsToRun = nodeList.reduce((runList, node) => {
      runList = [...runList, ...node.actions];
      return runList;
    }, []);

    return actionsToRun;
  }

  // A method that dispatches appropriate actions to build store to match hash.
  dispatchRunList(hash) {
    let runList = this.getRunList(hash);
    if (runList.length > 0) {
      let wildCards = this.getWildCards(hash, this.tree);
      runList.forEach(action => {
        action.apply(this, wildCards);
      });
    }
  }
}

// private functions for Hydrator class

// Get Active Branch List-> Returns list of Branch Objects ordered from Root to Leaf.
function getActiveBranchList(hash, tree) {
  const branchList = exploreBranch(tree, hash);
  return branchList;
}

// Helper Function to getActiveBranchList
function exploreBranch(traverseList, hash, nodeStore = []) {
  let matchingNode = traverseList.find(node => {
    return node.pattern.test(hash);
  });

  const foundMatchingNode = typeof matchingNode != "undefined";
  const hasChildren = foundMatchingNode && matchingNode.children.length > 0;

  if (foundMatchingNode && hasChildren) {
    nodeStore.push(matchingNode);
    return exploreBranch(matchingNode.children, hash, nodeStore);
  } else if (foundMatchingNode) {
    nodeStore.push(matchingNode);
    return nodeStore;
  } else {
    return nodeStore;
  }
}

// Get Active Leaf
function getActiveNode(hash, tree) {
  const nodeList = getActiveBranchList(hash, tree);
  return nodeList.pop();
}

export { Hydrator, exploreBranch };
