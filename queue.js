/* 
DATA STRUCTURE #3
QUEUES - FIFO - First In First Out (like a line of people at the DMV)
- newest elements added at the tail end, 
- elements removed from the front 
*/

class Queue {
  constructor(){
    this.items = [];
  }

  enqueue(item){
    // adds a new item to the back of the queue...
    this.items.push(item);
  }

  dequeue(){
    // removes 1st item from the queue...
    return this.items.shift();
  }

  front(){
    // removes the 1st element in the queue (the 1st 1 added; the 1st 1 that will be removed)
    return this.items[0];
  }

  isEmpty(){
    return this.items.length === 0;
  }

  size(){
    return this.items.length;
  }

  print(){
    console.log(this.items.toString());
  }
}

// priority queue -> set the priority and add teh element at the correct position
class PriorityQueue {
  constructor(){
    this.items = [];
  }

  queueElement(item, priority){
    var obj = {};
    obj.element = item;
    obj.priority = priority;
    return obj;
  }

  enqueue(item, priority){
    var queueElement = this.queueElement(item, priority);
    console.log('queueElment - ', queueElement);
    if (this.isEmpty()){
      this.items.push(queueElement);
    } else {
      // add by priority
      var added = false;
      for (var i = 0; i < this.items.length; i++){
        if (queueElement.priority < this.items[i].priority){
          // element being added has a higher priority, so squeeze it in before
          this.items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      if (!added){
        // otherwise, not squeezed in code above, so add after
        this.items.push(queueElement);
      }
    }
  }

  dequeue(){
    // removes 1st item from the queue...
    return this.items.shift();
  }

  front(){
    // removes the 1st element in the queue (the 1st 1 added; the 1st 1 that will be removed)
    return this.items[0];
  }

  isEmpty(){
    return this.items.length === 0;
  }

  size(){
    return this.items.length;
  }

  print(){
    console.log(this.items.toString());
  }
}

let hotPotato = (nameList, num) => {
  var queue = new Queue();

  for (var i = 0; i < nameList.length; i++){
    queue.enqueue(nameList[i]);
  }

  var eliminated = '';
  while(queue.size() > 1){
    for (var i = 0; i < num; i++){
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(eliminated + ' was eliminated from hot potato');
  }
  return queue.dequeue();
}

var names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
var winner = hotPotato(names, 7);