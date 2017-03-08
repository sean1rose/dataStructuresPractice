/* 
DATA STRUCTURE #3b
DOUBLY-LINKED LIST
  *double link - one for the next element and one for the previous element...
  *can iterate from beginning to end or from end to beginning
*/

class Node {
  constructor(item){
    this.element = item;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor(){
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  insert(position, element){
    var current = this.head;
    var prev;
    var counter = 0;
    var node = new Node(element);
    // make sure inserting w/in list's bounds
      // think about: 1) insert at 1st position, 2) insert at last position, 3) inserting in the middle...
    if (position >= 0 && position < this.length){
      // 1) if inserting at 1st position...
      if (position === 0){
        // a) if no elements in the list...
        if (!this.head){ // new
          // if no elements, there's no head, and the new node is the head and tail...
          this.head = node;
          this.tail = node;
        } else {
          // b) else there are element(s) in the list already...
          // 1. set inserted node's next property -> current is what used to be the 1st element/head -> pushing current back 1 spot, with the new, inserted node pointing to current
          node.next = current;
          // 2. set the prev prop of the 2nd item (it's set to point to our new, inserted node)
          current.prev = node; // new
          // set this.head as the inserted node
          this.head = node;
        }
      } else if (position === length){ // new
        // 2) inserting new node as last item...
        // grab last item in the list aka the tail and refer to it as current
        current = this.tail;
        // set current's next property as new, inserted node
        current.next = node;
        // don't forget to set inserted node's prev property, which is current
        node.prev = current;
        // set the tail as our inserted node
        this.tail = node;
      } else {
        // 3) inserting node somewhere in the middle...
          // iterate up to desired position -> break out of our loop once our counter hits the position we're trying to insert at...
            // we want to insert new node B/W PREV & CURRENT (inserted node comes after prev and before current)
        while (counter++ < position){
          // set prev - save it as a reference to current -> when break out of loop, current is gonna be current.next
          prev = current;
          // iterate
          current = current.next;
        }
        // set inserted node's next property: set it as current (which is current.next)
        node.next = current;
        // set prev.next as inserted node
        prev.next = node;
        // set current's prev as inserted node
        current.prev = node; // new
        // set inserted node's prev as prev..
        node.prev = prev; // new
      }      
      this.length++;
      return true;
    } else {
      return false;
    }
  }

}