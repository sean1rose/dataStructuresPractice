/* 
DATA STRUCTURE #7
HASH TABLE / HASH MAP - hashed implementation of Dictionary class
  *Hashing consists of finding a value in a data structure in the shortest time possible
    -when we use a hash func, we already know which position the value is in, so can simply retrieve it
  *HASH FUNCTION is a function that given a key, will return an address in the table where the value is
    -"lose lose" hash func - sum up the ASCII values of each character of the key
      -> key == 'John' == ASCII values: 74 + 111 + 104 + 110 = 399
*/

class HashTable{
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
    var idx = this.hashCode(key);
    console.log(idx + ' -> ' + key);
    this.table[idx] = value;
  }

  // removes the value from the hash table using the key...
  remove(key){
    // var idx = this.hashCode(key);
    // this.table.splice(idx, 1);
    // ^ DO NOT WANT TO MUTATE THE ARRAY!!! -> will mess up hashing function and next time try to get or remove another existing element -> element will not be at correct position

    var idx = this.hashCode(key);
    var tmp = this.table[idx];
    this.table[idx] = null;
    return tmp;
  }

  // returns a specific value searched by the key...
  get(key){
    // var idx = this.hashCode(key);
    // return this.table[idx];
    return this.table[this.hashCode(key)];
  }
}