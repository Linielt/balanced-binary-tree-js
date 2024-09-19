import { Tree } from "./bst.mjs";

let randomNumsArray = Array.from({ length: 10 }, () =>
  Math.floor(Math.random() * 100 + 1)
);

let binaryTree = new Tree(randomNumsArray);

binaryTree.prettyPrint(binaryTree.root);
console.log(binaryTree.isBalanced()); // Should return true
console.log("Level order:");
binaryTree.levelOrder((node) => console.log(node.data));
console.log("Pre order:");
binaryTree.preOrder((node) => console.log(node.data));
console.log("Post order:");
binaryTree.postOrder((node) => console.log(node.data));
console.log("In Order:");
binaryTree.inOrder((node) => console.log(node.data));

binaryTree.insert(1000);
binaryTree.insert(43534);

console.log(binaryTree.isBalanced()); // Should be false
binaryTree.rebalance();
binaryTree.prettyPrint(binaryTree.root);
console.log(binaryTree.isBalanced()); // Should be true

console.log("Level order:");
binaryTree.levelOrder((node) => console.log(node.data));
console.log("Pre order:");
binaryTree.preOrder((node) => console.log(node.data));
console.log("Post order:");
binaryTree.postOrder((node) => console.log(node.data));
console.log("In Order:");
binaryTree.inOrder((node) => console.log(node.data));
