class Node {
  #data;
  #left;
  #right;

  constructor(data) {
    this.#data = data;
    this.#left = null;
    this.#right = null;
  }

  get data() {
    return this.#data;
  }

  set data(data) {
    this.#data = data;
  }

  get left() {
    return this.#left;
  }

  set left(left) {
    this.#left = left;
  }

  get right() {
    return this.#right;
  }

  set right(right) {
    this.#right = right;
  }
}

export class Tree {
  #root;

  constructor(array) {
    this.#root = this.buildTree(array);
  }

  buildTree(array) {
    array.sort((a, b) => a - b);
    array = [...new Set(array)];

    const root = recursiveFunc(array, 0, array.length - 1);

    function recursiveFunc(array, start, end) {
      if (start > end) {
        return null;
      }
      let mid = Math.floor((start + end) / 2);

      let root = new Node(array[mid]);

      root.left = recursiveFunc(array, start, mid - 1);
      root.right = recursiveFunc(array, mid + 1, end);

      return root;
    }

    return root;
  }

  insert(value, node = this.#root) {
    if (node === null) {
      return new Node(value);
    }

    if (node.data === value) {
      return node;
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteItem(value, node = this.#root) {
    if (node === null) {
      return node;
    }

    if (node.data > value) {
      node.left = this.deleteItem(value, node.left);
    } else if (node.data < value) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) {
        // No child or single right child
        return node.right;
      } else if (node.right === null) {
        // Only left child
        return node.left;
      } else {
        // Both children
        let successor = this.getSuccessor(node);
        node.data = successor.data;
        node.right = this.deleteItem(successor.data, node.right); // Deleting inorder successor
      }
    }

    return node;
  }

  getSuccessor(node) {
    // Works when right child is not empty which is ideal for BST deletes
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }

    return node;
  }

  find(value, node = this.#root) {
    if (node.data === value) {
      return node;
    } else {
      if (node.left !== null) {
        return this.find(value, node.left);
      }
      if (node.right !== null) {
        return this.find(value, node.right);
      }
    }

    return null;
  }

  levelOrder(callback) {
    if (callback === undefined) {
      throw Error("Callback not provided.");
    }
    if (this.#root === null) {
      throw Error("Tree is empty.");
    }
    let queue = [];

    queue.push(this.#root);

    while (queue.length) {
      let dequeuedNode = queue.shift();
      if (dequeuedNode.left !== null) {
        queue.push(dequeuedNode.left);
      }
      if (dequeuedNode.right !== null) {
        queue.push(dequeuedNode.right);
      }
      callback(dequeuedNode);
    }
  }

  inOrder(callback, node = this.#root) {
    if (callback === undefined) {
      throw new Error("Callback not defined.");
    }
    if (node === null) {
      return;
    }

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.#root) {
    if (callback === undefined) {
      throw new Error("Callback not defined.");
    }
    if (node === null) {
      return;
    }

    callback(node);
    this.inOrder(callback, node.left);
    this.inOrder(callback, node.right);
  }

  postOrder(callback, node = this.#root) {
    if (callback === undefined) {
      throw new Error("Callback not defined.");
    }
    if (node === null) {
      return;
    }

    this.inOrder(callback, node.left);
    this.inOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }

  depth(targetNode, currentDepth = 0, currentNode = this.#root) {
    if (currentNode === null) {
      return -1;
    }
    if (currentNode === targetNode) {
      return currentDepth;
    }

    let leftDepth = this.depth(targetNode, currentDepth + 1, currentNode.left);
    let rightDepth = this.depth(
      targetNode,
      currentDepth + 1,
      currentNode.right
    );

    if (leftDepth !== -1) {
      return leftDepth;
    } else if (rightDepth !== -1) {
      return rightDepth;
    } else {
      return -1;
    }
  }

  isBalanced(node = this.#root) {
    if (node === null) {
      return true;
    } else {
      return (
        this.isBalanced(node.left) &&
        this.isBalanced(node.right) &&
        Math.abs(this.height(node.left) - this.height(node.right)) <= 1
      );
    }
  }

  rebalance() {
    let sortedArray = [];
    this.inOrder((node) => sortedArray.push(node.data));
    this.#root = this.buildTree(sortedArray);
  }

  isValueInTree(value, node = this.#root) {
    if (node.data === value) {
      return true;
    } else {
      let found = false;
      if (node.left !== null) {
        found = this.isValueInTree(value, node.left);
      }
      if (!found && node.right !== null) {
        found = this.isValueInTree(value, node.right);
      }
      return found;
    }
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  get root() {
    return this.#root;
  }
}
