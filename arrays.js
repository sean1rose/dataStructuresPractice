var fibonacci = [];
fibonacci[1] = 1;
fibonacci[2] = 1;

for (var i = 3; i < 20; i++){
  console.log('i - ', i);
  console.log('fibonacci[i-2] - ', fibonacci[i-2]);
  console.log('fibonacci[i-1] - ', fibonacci[i-1]);
  fibonacci[i] = fibonacci[i-2] + fibonacci[i-1];
  console.log('fibonacci[i] - ', fibonacci[i]);
}

// queue-like methods
  // UNSHIFT -> adds element to the beginning of array
  // SHIFT -> remove element from beginning 

// stack like methods
  // PUSH -> add to end
  // POP -> remove from end


var test = [1,2,3,4,5,6,7,8,9,0];
// splice(idx to start, how many to remove)
test.splice(5, 2);
// test = [1,2,3,4,5,8,9,0]


// MULTI DIMENSIONAL ARRAY:
// day 1
var avgTemp = [];
avgTemp[0] = [];
avgTemp[0][0] = 72;
avgTemp[0][1] = 75;
avgTemp[0][2] = 79;
avgTemp[0][3] = 79;
avgTemp[0][4] = 81;
avgTemp[0][5] = 81;

// day 2
avgTemp[1] = [];
avgTemp[1][0] = 81;
avgTemp[1][1] = 79;
avgTemp[1][2] = 75;
avgTemp[1][3] = 75;
avgTemp[1][4] = 73;
avgTemp[1][5] = 72;
