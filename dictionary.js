/* 
DATA STRUCTURE #6
DICTIONARY - used to store [key, value] paris, where the key is used to find a particular element. Also known as a MAP (ECMAScript 6 Map Class).
  *SET == [key,key]
  *DICTIONARY == [key,value]
  * similar to set, but store [key,value] pair...
*/


class Dictionary {
  constructor(){
    this.items = {};
    this.length = 0;
  }

  // add new item to dictionary...
  set(key,value){
    this.items[key] = value;

    // if calculating size w/o help of Object.keys(this.items), use the following logic...
    /*
    if (!this.items[key]){
      this.items[key] = value;
      this.length++;
    } else {
      // key already exists, set the new value over it, but don't increase length;
      this.items[key] = value;
    }
    */
  }

  // remove the value from dictionary using the Key...
  remove(key){
    if (this.has(key)){
      var temp = this.items[key];
      delete this.items[key];
      // this.length--;
      return temp;
    } else {
      return false;
    }
  }

  // returns true if the key exists in the dictionary...
  has(key){
    // if (this.items.hasOwnProperty(key)){
    //   return true;
    // } else {
    //   return false;
    // }
    return this.items.hasOwnProperty(key) ? true : false;
  }

  // returns the specific value searched by the key
  get(key){
    // if (this.has(key)){
    //   return this.items[key];
    // } else {
    //   return undefined;
    // }
    return this.has(key) ? this.items[key] : undefined;
  }

  // removes all items from the dictionary...
  clear(){
    this.items = {};
  }

  // returns how many elements the dictionary contains
  size(){
    // return this.length;

    return Object.keys(this.items).length
  }

  // returns an array of all the keys the dictionary contains...
  keys(){
    return Object.keys(this.items);
  }

  // returns an array of all the values of the dictionary...
  values(){
    var result = [];
    for (var key in this.items){
      // use this.has cuz JS object's prototype contains add'l properties of the object
      if (this.has(key)){
        result.push(this.items[key]);
      }
    }
    return result;
  }

  getItems(){
    return this.items;
  }
}