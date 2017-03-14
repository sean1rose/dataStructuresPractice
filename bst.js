/* 
DATA STRUCTURE #8
  BINARY TREE - conists of nodes w/ a parent-child r/s. Except for the root/1st node at the top, each node has a parent and 0 or more children
    * Binary SEARCH Tree - Binary tree where you store nodes w/ lesser values on the left side and nodes w/ greater values on the right side
    -root: top node of the tree. Doesn't have a parent. (Level 0)
    -internal node: has at least 1 child
    -leaf: no children. External nodes.
  *examples - family tree, company organizational chart
  *useful for storing information that needs to be found easily
*/

class Node {
  constructor(key){
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(){
    // root is akin to the head in a LL
    this.root = null;
  }

  insert(key){

  }

  search(key){

  }

  inOrderTraverse(){

  }

  preOrderTraverse(){

  }

  postOrderTraverse(){

  }

  min(){

  }

  max(){

  }

  remove(key){
    
  }
}