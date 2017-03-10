/* 
DATA STRUCTURE #4
LINKED LIST
  - stores a sequential collection of elements, but unlike arrays - elements are not placed contiguosuly in memory
      @ ASIDE - arrays -> disadvantage of arrays is that the size of an array is fixed (in most languages) and inserting or removing items from beginning or middle is expensive cuz items need to be shifted over (JS has native methods to do that, but still going on behind the scenes)
  - each element consists of:
    1) a node that stores the element itself
    2) a reference that points to the next element
  +: benefit of LL over an array: don't need to shift elements over when adding/removing elements
    + whenever you need to add and remove lots of elements, linked list > array
  -: disadvantage: w/ array can directly access any element at any position, but w/ LL, need to start from beginning and iterate until find desired element
  EX: think of a train (each vehicle is linked to the next; the link b/w the wagons is the pointer), conga line (hands == pointer to next element/person), or a scavenger hunt (clue is a pointer to the next clue/element)
*/

// helper class that represents the item we're adding to the list
class Node {
  constructor(item){
    this.element = item;
    this.next = null;
  }
}

class LinkedList {
  constructor(){
    this.length = 0;
    // reference to 1st node...
    this.head = null;    
  }

  // LEARN THIS DOWN PAT
  append(item){
    // add new item to end of list
    var node = new Node(item);
    var current;
    // if 1st item in LL -> make it he head...
    if (this.head === null){
      this.head = node;
    } else {
      // start at front of LL...
      current = this.head;
      // need to find last item so loop until find the very last item...
      // while(current.next){
      while(current.next !== null){
        current = current.next
      }
      // once at the last item (there is no next item) -> make the next item the node
      current.next = node;
    }
    length++;
  }

  // remove from any position, given the index to remove at...
  removeAt(position){
    if (position >= 0 && position < this.length){
      var current = this.head;
      var previous;
      var counter = 0;
      if (position === 0){
        // if want to remove 1st element -> point head at 2nd element (element after this.head, cuz current == this.head)
        this.head = current.next;
      } else {
          // iterate until desired position...
          while (counter++ < position){
            // keep reference to previous, cuz will need to link it to new item...
            previous = current;
            // increment loop
            current = current.next;
          }
          // ***CUT CURRENT OUT OF THE LOOP -> take out element at position by creating new bridge from previous to current's next...
          previous.next = current.next;
          // ***this cuts current.element out of the linked-chain and forever gone from computer memory...

      }
      // for counting purposes...
      length--;
      return current.element;
    } else {
      return null;
    }
  }


  // insert at any position (similar to remove from any position, but adding a new element, rather than pointing around 1 to remove)
  insert(position, element){
    if (position >= 0 && position < this.length){
      var node = new Node(element);
      var current = this.head;
      var previous;
      var counter = 0;
      // if adding element at the beginning of the list...
      if (position === 0){
        // push back the 1st element...
        node.next = current;
        // point head to inserted node
        this.head = node;
      } else {
        // loop thru til we reach the desired position...
        while (counter++ < position){
          previous = current;
          current = current.next;
        }
        // when finally bust out of the loop, CURRENT is referencing element after the position we would like to insert... (want to add new item b/w prev and current)
        // point previous.next to node && point node.next to current
        // make a link b/w the new item and current
        node.next = current;
        // change link b/w previous and current
        previous.next = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  }

  removeElement(element){
    // removing a particular element
    var idx = this.indexOf(element);
    return this.removeAt(idx);
  }

  // print out all elements in order in string form
  toString(){
    var current = this.head;
    var string = '';
    while(current){
      string += current.element;
      current = current.next;
    }
    return string;
  }

  // receives element.value and returns position if element is found
  indexOf(element){
    var current = this.head;
    var counter = 0;
    while(current){
      if (current.element === element){
        return counter;
      }
      current = current.next;
      counter++;
    }
    return -1;
  }

  isEmpty(){
    return this.length === 0;
  }

  size(){
    return this.length;
  }

  getHead(){
    return head;
  }

}