/* 
DATA STRUCTURE #7
HASH TABLE / HASH MAP - hashed implementation of Dictionary class
  *Hashing consists of finding a value in a data structure in the shortest time possible
    -when we use a hash func, we already know which position the value is in, so can simply retrieve it
  *HASH FUNCTION is a function that given a key, will return an address in the table where the value is
    -"lose lose" hash func - sum up the ASCII values of each character of the key
      -> key == 'John' == ASCII values: 74 + 111 + 104 + 110 = 399
*/

class HashTable {
  constructor(){
    this.table = [];
  }

  // lose lose hash code (adding up the ASCII values of each character)...
    // assumes key is a STRING...
  hashCode(key){
    var hash = 0;
    for (var i = 0; i < key.length; i++){
      hash += key.charCodeAt(i);
    }
    // use modulo of prime # 37
    return hash % 37;
  }
  

  // adds a new item to the hash table (or in the alternative, updates the key)...
  put(key, value){
    /* WITHOUT SEPARATE CHAINING COLLISION HANDLING...
    var idx = this.hashCode(key);
    console.log(idx + ' -> ' + key);
    this.table[idx] = value;
    */

    // WITH SEPARATE CHAINING...
    var position = this.hashCode(key);

    if (this.table[position] == undefined){
      // if 1st element at the position (no collision yet) -> create a LL at that position...
      this.table[position] = new LinkedList();
    }
    // add the ValuePair instance to the LL using the LL-append method
    this.table[position].append(new ValuePair(key, value));
  }

  // removes the value from the hash table using the key...
  remove(key){
    // var idx = this.hashCode(key);
    // this.table.splice(idx, 1);
    // ^ DO NOT WANT TO MUTATE THE ARRAY!!! -> will mess up hashing function and next time try to get or remove another existing element -> element will not be at correct position

    /* WITHOUT SEPARATE CHAINING COLLISION HANDLING...
    var idx = this.hashCode(key);
    var tmp = this.table[idx];
    this.table[idx] = null;
    return tmp;
    */

    // SEPARATE CHAINING METHOD:
    var position = this.hashCode(key);
    if (this.table[position] !== undefined){
      // we know it's a LL, which has getHead() method
      var current = this.table[position].getHead();
      while(current.next){
        if (current.element.key === key){
          // use LL-remove method to remove the element
          this.table.position.remove(current.element);
          // if list is empty, set table position as undefined so can skip this position whenever we look for an element to try to print out its contents
          if (this.table[position].isEmpty()){
            this.table[position] = undefined;
          }
          return true;
        }
        current = current.next;
      }
      // check in case 1st or last element...
      if (current.element.key === key){
        this.table[position].remove(current.element);
        if (this.table[position].isEmpty()){
          this.table[position] = undefined;
        }
        return true;
      }
    }
    // key doesn't exist, nothing to remove...
    return false;
  }

  // returns a specific value searched by the key...
  get(key){
    /* WITHOUT SEPARATE CHAINING COLLISION HANDLING...
    return this.table[this.hashCode(key)];
    */
    
    // SEPARATE CHAINING WAY OF DOING IT:
    var postion = this.hashCode(key);
    if (this.table[position] !== undefined){
      // iterate thru the LL to find the key
        // we know it's a LL, which has getHead() method
      var current = this.table[position].getHead();
      while(current.next){
        // check for the key on the element
        if (current.element.key === key){
          return current.element.value;
        }
        current = current.next;
      }
      // check in case it's the 1st or last element....
      if (current.element.key === key){
        return current.element.value;
      }
    }
    // key doesn't exist, nothing to get...
    return undefined;
  }
}

// helper class to store key and value in an Object instance
class ValuePair {
  constructor(key, value){
    this.key = key;
    this.value = value;
  }

  toString(){
    return '[' + this.key + ' - ' + this.value + ']';
  }
}


// ------------------------


// LINKED LIST:
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
    // if 1st item in LL -> make it the head...
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