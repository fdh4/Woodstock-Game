
// global variables

var artist = "";
var parsedArtist = "";
var artistIndex = 0;
var icount = 0;
var probSum = 0;
var displayString = "";
var bufferString = "";

// global arrays

var abcd = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
/* var prob = [0.934, 0.11, 0.549, 0.22, 1.264, 0.165, 0.165, 0.604, 0.714, 0.385, 0.055, 0.495, 0.11, 0.714, 0.659, 0.055, 0, 0.824, 0.495, 0.659, 0.22, 0.165, 0.11, 0.055, 0.22, 0.055];*/
/*        a    b    c    d     e    f    g    h    i    j   k    l    m    n    o   p    r    s    t    u    v    w   x    y    z  */
var prob =  [934, 110, 549, 220, 1264, 165, 165, 604, 714, 385, 55, 495, 110, 714, 659, 55, 824, 495, 659, 220, 165, 110, 55, 220, 55];

var bufferArray = [];
var mySpace = String.fromCharCode(32);
var gameArray = [];
var spacePosition = [];
var answerArray = [];
var displayArray = [];

var performers = ["Arlo Guthrie",  "Carlos Santana", "Country Joe & The Fish", "Credence Clearwater Revival",
                   "Crosby Stills Nash & Young","The Greatful Dead", "Janis Joplin", 
                   "Jimi Hendrix", "Joan Baez", "Joe Cocker", "Joni Mitchel", "Richie Havens", 
                   "Ten Years After", "The Who"];

// functions 

  // function to randomize (Fisher Yates method)

function ramdomize(array) {
  var i, j, k;
    for (i = array.length -1; i > 0; i--) {
      j = Math.floor(Math.random() * i);
      k = array[i];
      array[i] = array[j];
      array[j] = k;
    }
  }

  function roundToInteger(item, index, arr) {      // rounding function
    arr[index] = Math.round(item);
  }
  function sigma(item) {              // sum of elements function
      probSum += item;      
  }

  function mySplitFunction(myString) {     //console.log("displayString "+myString);
    var res = myString.split("  ");     //document.getElementById("demo").innerHTML = res;
    return res;                       //console.log("split string is "+res);
}

function myJoinSpaceFunction(myArray) {
  var string = "";
  var s = mySpace;
  var res = myArray.join(s);
  return res;
}


// procedure

$(document).ready(function() {

  // choose artist names for games

  for (icount = 0; icount < 14; icount++) {
    gameArray.push(icount);
  }
                                          //  console.log(gameArray);
  ramdomize(gameArray);                   // this will be the start of the games loop i = 0 to -> 14
                                          // console.log(gameArray);
  artistIndex = gameArray[0];             // choose artist for this game (the i th game) at random - ver 1.0
                                          // console.log("artistIndex " + artistIndex);

  artist = performers[artistIndex];       // console.log(performers.length);
console.log("artist: " + artist);         // compute difficulty based on letter frequency arrays

                                          //console.log("probability array " + prob);
                                          //console.log("probSum " + probSum);
                                          // console.log(artist);
                                          // console.log("length of artist string " + artist.length);
                                          // a = 97  z = 122  space = 32
  for (icount = 0; icount < artist.length; icount++) {       //  Hide all characters 
    answerArray.push(artist[icount]);                        //  except
  //                        console.log(artist[icount]);     // space or &
    if (artist[icount] == " " || artist[icount] == "&") {    // behind a
                                                            // or ? can use (artist[icount].search([A-z]/g))!= -1  
    displayArray.push(artist[icount]+mySpace);
    displayString += artist[icount];
    }
    else {
    displayArray.push("- ");
    displayString += ("- ");
                                          // for (icount = 0; icount < displayString.length; icount++) {
                                          // console.log(displayString[icount]);
    }
  }
  // console.log("displayString: "+displayString);
                                          //function insertSpaces(aString) {
                                          //  return aString.split("").join(" . ");
                                          //}
                                          //console.log(mySplitFunction(displayString));
                                          
bufferArray = mySplitFunction(displayString);
  // bufferArray = mySplitFunction(artist);

console.log("bufferArray: "+bufferArray);                       // insertSpaces(displayString);    // ******************

  // bufferString = myJoinSpaceFunction(bufferArray);

//console.log("bufferString: "+bufferString);

console.log("answerArray: "+answerArray);

console.log("displayArray: "+displayArray);

for (icount = 0; icount < bufferArray.length; icount++) {
  bufferString = bufferString + "<span> "+bufferArray[icount]+"</span>&ThickSpace;";  
}

console.log("bufferString: "+bufferString);

displayString = bufferString.replace("& ","&</span>&ThickSpace;<span> ");

console.log("displayString: "+displayString);

// console.log("/"+mySpace+"/");

// bufferString = "- - - - " + mySpace + "- - - - - "; //

document.getElementById("answer").innerHTML ='"' + displayString + '"';

                                    //  console.log("first letter lower case " + artist[0].toLowerCase());


                                    // artist = artist.replace(/ /g,"");
                                    // console.log(artist);

  // turn string into an array


  // compute number of guesses incorporating name length and degree of difficulty

  // set parameters
      // start slide shows
        // banner images (artists)
        // center images (crowd)

  // initalize
    // start woodstock song
    // put word to guess template in word container
    // display  remaining guesses
    // display wins
    //display attempst
    // display 'Press any key to get started!' over center image

  // on key stroke
    // fade out msg over center image
    // highlight letter to be guessed spce
    // ignore duplicates
    // if miss 
      // add to keys already guessed
      // decrement guesses left
      // if guesses left = 0 and word incomplete, new game
      // if guesses left > 0 play buzzer
      // await user input

    // if hit
      // play ding sound
      // display letter in word to guess conainer
      // if word to guess complete
        // play ding sound,
        //display artists picture
        //play artists song
        // new game
      // if word to guess incomplete
      // show 'Press another key'  message
      // await user input

    //var clabcd = abcd.indexOf("c");
    //console.log(abcd.indexOf("c"));
    //console.log(prob[clabcd]);
    // console.log(prob);

    document.onkeyup = function(event) {
          /*       console.log("*KEY UP*");
          */
          /*       alert("key up pressed  fade out should start next");
          */
    };
});
