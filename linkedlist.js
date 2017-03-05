/* 
DATA STRUCTURE #3
LINKED LIST
  - stores a sequential collection of elements, but unlike arrays - elements are not placed contiguosuly in memory
      @ ASIDE - arrays -> disadvantage of arrays is that the size of an array is fixed (in most languages) and inserting or removing items from beginning or middle is expensive cuz items need to be shifted over (JS has native methods to do that, but still going on behind the scenes)
  - each element consists of:
    1) a node that stores the element itself
    2) a reference that points to the next element
  +: benefit of LL over an array: don't need to shift elements over when adding/removing elements
  -: disadvantage: w/ array can directly access any element at any position, but w/ LL, need to start from beginning and iterate until find desired element
  EX: think of a train (each vehicle is linked to the next; the link b/w the wagons is the pointer), conga line (hands == pointer to next element/person), or a scavenger hunt (clue is a pointer to the next clue/element)
*/
