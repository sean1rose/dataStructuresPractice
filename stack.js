/* 
DATA STRUCTURE #2
STACK -> collection of items (LIFO) -> Last in First Out
- think of a stack of dishes
*/

class Stack {
  constructor(){
    this.items = [];
  }

  push(item){
    // adds a new item to the top
    this.items.push(item);
  }

  pop(){
    // removes and returns top item
    return this.items.pop();
  }

  peek(){
    // returns (but doesn't remove) the top item
    return this.items[this.items.length - 1];
  }

  isEmpty(){
    // returns true if no elements
    return this.items.length === 0;
  }

  clear(){
    // removes all elements
    this.items = [];
  }

  size(){
    // returns length of stack
    return this.items.length;
  }

  print(){
    console.log(this.items.toString());
  }
}
// end of stack implementation


// converting a decimal # to binary representation...
let divideBy2 = (decNumber) => {
  var remStack = new Stack();
  var rem;
  var binaryString = '';

  // 10 > 0
  while(decNumber > 0){
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    // update the # that will be divided by 2 in next iteration of while loop...
    decNumber = Math.floor(decNumber / 2);
  }

  // while remainder stack is NOT empty...
  while(!remStack.isEmpty()){
    // pop the elements from the stack until empty, concatenating into a string
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}


