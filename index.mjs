import { Tree } from "./bst.mjs";

let binaryTree = new Tree([1, 7, 4, 23, 8, 9]);

binaryTree.prettyPrint(binaryTree.root);
console.log(binaryTree.isValueInTree(9));
console.log(binaryTree.find(4));
console.log("Level order(Breadth-first):");
binaryTree.levelOrder((node) => console.log(node.data));
console.log("Start of depth-first traversals:");
console.log("In order:");
binaryTree.inOrder((node) => console.log(node.data));
console.log("Pre order:");
binaryTree.preOrder((node) => console.log(node.data));
console.log("Post order:");
binaryTree.postOrder((node) => console.log(node.data));
console.log("Height:");
console.log(binaryTree.height(binaryTree.find(7))); // 2
console.log("Depth: ");
console.log(binaryTree.depth(binaryTree.find(69))); // 0
console.log(binaryTree.isBalanced());
binaryTree.rebalance();
console.log(binaryTree.isBalanced());
