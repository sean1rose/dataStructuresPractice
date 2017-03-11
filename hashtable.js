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
  hashFunction(key){
    var hash = 0;
    for (var i = 0; i < key.length; i++){
      hash += key.charCodeAt(i);
    }
    // use modulo of prime # 37
    return hash % 37;
  }

  // djb2..
  betterHashFunction(key){
    var hash = 5381;
    for (var i = 0; i < key.length; i++){
      hash = hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
  }  

  // adds a new item to the hash table (or in the alternative, updates the key)...
  put(key, value){
    /* WITHOUT SEPARATE CHAINING COLLISION HANDLING...
    var idx = this.hashFunction(key);
    console.log(idx + ' -> ' + key);
    this.table[idx] = value;
    */

    // WITH SEPARATE CHAINING...
    var position = this.hashFunction(key);

    if (this.table[position] == undefined){
      // if 1st element at the position (no collision yet) -> create a LL at that position...
      this.table[position] = new LinkedList();
    }
    // add the ValuePair instance to the LL using the LL-append method
    this.table[position].append(new ValuePair(key, value));


  }

  // PUT USING LINEAR PROBING -> if idx is already occupied, then try idx + 1;
  putProbe(key, value){
    var position = this.hashFunction(key);
    if (!this.table[position]){
      this.table[position] = new ValuePair(key, value);
    } else {
      var idx = ++position;
      // loop lasts until there's nothing at the idx...
      while(this.table[idx] != undefined){
        // break out once find an empty position...
        idx++;
      }
      // found an empty position, set the item...
      this.table[idx] = new ValuePair(key, value);
    }

  }

  // removes the value from the hash table using the key...
  remove(key){
    // var idx = this.hashFunction(key);
    // this.table.splice(idx, 1);
    // ^ DO NOT WANT TO MUTATE THE ARRAY!!! -> will mess up hashing function and next time try to get or remove another existing element -> element will not be at correct position

    /* WITHOUT SEPARATE CHAINING COLLISION HANDLING...
    var idx = this.hashFunction(key);
    var tmp = this.table[idx];
    this.table[idx] = null;
    return tmp;
    */

    // SEPARATE CHAINING METHOD:
    var position = this.hashFunction(key);

    if (this.table[position] !== undefined){
      // we know it's a LL, which has getHead() method
      var current = this.table[position].getHead();
      while(current.next){
        if (current.element.key === key){
          // use LL-remove method to remove the element
          console.log('this.table[position], should be a LL / LL BEFORE REMOVAL is - ', this.table[position]);
          console.log('current.element - ', current.element);
          var tmp = this.table[position].removeElement(current.element);
          // if list is empty, set table position as undefined so can skip this position whenever we look for an element to try to print out its contents
          if (this.table[position].isEmpty()){
            this.table[position] = undefined;
          }
          console.log('LL after removal is - ', this.table[position]);
          console.log('element removed is....', tmp);
          return tmp;
        }
        current = current.next;
      }
      // check in case 1st or last element...
      if (current.element.key === key){
        this.table[position].removeElement(current.element);
        if (this.table[position].isEmpty()){
          this.table[position] = undefined;
        }
        return true;
      }
    }
    // key doesn't exist, nothing to remove...
    return false;
  }

  removeProbe(key){
    var position = this.hashFunction(key);
    // if key exists...
    if (this.table[position] !== undefined){
      // check whether the value we're looking for is the the one at the specified position...
      if (this.table[position].key === key){
        // if so, DELETE the value...
        this.table[position] = undefined;
        // return this.table[position].value;
      } else {
        // otherwise need to check the next idx...
        var idx = ++position;
        while(this.table[idx] === undefined || this.table[idx].key !== key){
          // break out once we find the position that contains the element and the element's key matches the key we're searching for...
          idx++;
        }
        if (this.table[idx].key === key){
          // verify the item is the one we want...
          // return this.table[idx].value;
          this.table[position] = undefined;
        }
      }
    }
    return undefined;
  }

  // returns a specific value searched by the key...
  get(key){
    /* WITHOUT SEPARATE CHAINING COLLISION HANDLING...
    return this.table[this.hashFunction(key)];
    */
    
    // SEPARATE CHAINING WAY OF DOING IT:
    var postion = this.hashFunction(key);
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

  // LINEAR PROBING get method...
  getProbe(key){
    var position = this.hashFunction(key);
    // if key exists...
    if (this.table[position] !== undefined){
      // check whether the value we're looking for is the the one at the specified position...
      if (this.table[position].key === key){
        // if so, return the value...
        return this.table[position].value;
      } else {
        // otherwise need to check the next idx...
        var idx = ++position;
        while(this.table[idx] === undefined || this.table[idx].key !== key){
          // break out once we find the position that contains the element and the element's key matches the key we're searching for...
          idx++;
        }
        if (this.table[idx].key === key){
          // verify the item is the one we want...
          return this.table[idx].value;
        }
      }
    }
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
    this.length++;
  }

  // remove from any position, given the index to remove at...
  removeAt(position){
    console.log('IN LL REMOVE AT!!! position should be 1 - ', position);
    console.log('length shoudl be 3?  - ', this.length);
    if (position > -1 && position < this.length){
      console.log('1');
      var current = this.head;
      var previous;
      var counter = 0;
      if (position === 0){
        console.log('2');
        // if want to remove 1st element -> point head at 2nd element (element after this.head, cuz current == this.head)
        this.head = current.next;
      } else {
        console.log('3');
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
      this.length--;
      console.log('4 removing (using removeAt) - ', current.element);
      return current.element;
    } else {
      console.log('5');
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
      this.length++;
      return true;
    } else {
      return false;
    }
  }

  removeElement(element){
    // removing a particular element
    var idx = this.indexOf(element);
    console.log('removing element - ', element, ' at idx - ', idx);
    this.removeAt(idx);
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
    return this.head;
  }

}

var print = function(table){
  for (var i = 0; i < table.length; i++){
    if (table[i] !== undefined){
      console.log(i + ": " + table[i]);
    }
  }
}