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
    if (position >= 0 && position < this.length){
      if (position === 0){
        if (!this.head){ // new
          // if no head, new node is the head and tail...
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node; // new
          this.head = node;
        }
      } else if (position === length){ // new
        // last item...
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        while (counter++ < position){
          prev = current;
          current = current.next;
        }
        node.next = current;
        prev.next = node;

        current.prev = node; // new
        node.prev = prev; // new
      }
      
      // loop til you get to the position. once you get to that position, want to insert element after current...
      this.length++;
      return true;
    } else {
      return false;
    }
  }

}