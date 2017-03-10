/* 
DATA STRUCTURE #5
SET - collection of unordered, unique items (no repeats)
  * can imagine as an array w/ no repeated elements and w/ no concept of order
*/

class Set {
  constructor(){
    // using an OBJECT to represent our set (instead of an array)
      // JS objs do NOT allow you to have 2 different values on the same key, which guarantees unique elements in our set...
    this.items = {};
  }

  // adds new item to set...
  add(value){
    if (!this.has(value)){
      this.items[value] = value;
      // also return true when successful
      return true;
    }
    // otherwise return false if set already contains the value...
    return false;
  }

  // removes value from the set...
  remove(value){
    if (this.has(value)){
      var temp = this.items[value];
      delete this.items[value];
      return temp;
    }
    return false;
  }

  // returns true if value exists
  has(value){
    // hasOwnProperty -> indicates whether the obj has the specified property or not...
    return this.items.hasOwnProperty(value);
    
    // return value in this.items;
    
    // if (this.items[value] !== null){
    //   return true;
    // } else {
    //   return false;
    // }
  }

  // removes all items...
  clear(){
    this.items = {};
  }

  // returns how many elements the set contains
  size(){
    // Object.keys returns an array of all the properties of a given obj...
    return Object.keys(this.items).length;

    
    // OR, iterate thru object and increase counter for each (this does the same thing as Object.keys does under the hood)
    // var count = 0;
    // for (var key in this.items){
    //   if (this.items.hasOwnProperty(key)){
    //     count++;
    //   }
    // }
    // return count;
  
  }

  // returns an array of all the values of the set...
  values(){
    return Object.keys(this.items);

    /*
    var result;
    for (var key in this.items){
      if (this.items.hasOwnProperty(key)){
        result.push(key);
      }
    }
    return result;
    */
  }

  // SET OPERATIONS (USE W/ ANOTHER SET)...
  union(otherSet){
    var unionSet = new Set();
    var values = this.values();
    for (var i = 0; i < values.length; i++){
      unionSet.add(values[i]);
    }
    console.log('union set before adding second values - ', unionSet.values());
    var secondValues = otherSet.values();
    console.log('other sets values - ', secondValues);
    for (var j = 0; j < secondValues.length; j++){
      console.log('values[j] - ', secondValues[j]);
      unionSet.add(secondValues[j]);
    }
    return unionSet;
  }

  intersection(otherSet){
    var intersectionSet = new Set();
    var values = this.values();
    var secondValues = otherSet.values();
    for (var i = 0; i < secondValues.length; i++){
      if (this.has(secondValues[i])){
        intersectionSet.add(secondValues[i]);
      }
    }
    return intersectionSet;
  }

  difference(otherSet){
    var differenceSet = new Set();
    var values = this.values();
    for (var i = 0; i < values.length; i++){
      // if the 2nd set doesn't have what's in the 1st set...
      if (!otherSet.has(values[i])){
        differenceSet.add(values[i]);
      }
    }
    return differenceSet;
  }

  subset(otherSet){
    // if all of the elements in our set are also ALL in the otherSet, then return true;
    var subset = new Set();
    var values = this.values();
    var secondValues = otherSet.values();
    var subsetFlag = true;
    for (var i = 0; i < values.length; i++){
      if (!otherSet.has(values[i])){
        subsetFlag = false;
        break;
      }
    }
    return subsetFlag;
  }
}