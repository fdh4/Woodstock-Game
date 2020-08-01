// global variables

var spc = String.fromCharCode(32); // i.e " "

var roundCounter = 0; // counter for rounds
var roundsMax = 0; // maximum rounds per game = # of artists
// var icount = 0; // counter for loops  ** **
var performerIndex = 0; // pointer to artist chosen for this round
var maxGuesses = 0; // available guesses for this round
var remainingGuesses = 0; // guesses remaining in this round
var winsTotal = 0; // wins for this game
var charsGuessed = 0; // characters guessed in this round
var correctGuesses = 0; // correct guesses this round

var playGame = true; // boolean for play game
var valid = false; // current number of rounds completed
var rightAnswer = false; // current answer is correct
var songPlaying = false; // is there a song playing?

var artist = ""; // string containing artist chosen for this round
var letterGuessed = ""; // letter guessed by player
var guessesSoFar = ""; // letters guessed so far, csv
var preDisplayString = ""; // unformatted string of atist characters for eventual display
var song = ""; // audio file for song to play or playinh

// global arrays

var gameArray = []; //  array of artists
var answerArray = []; // each character of artist's name - 202
var displayArray = []; // updatable character template dispayed in #answer html element

var performers = ["Arlo Guthrie", "Carlos Santana", "Country Joe & The Fish", "Creedence Clearwater Revival",
  "Crosby Stills Nash & Young", "The Greatful Dead", "Janis Joplin",
  "Jimi Hendrix", "Joan Baez", "Joe Cocker", "Joni Mitchel", "Richie Havens",
  "Ten Years After", "The Who"
];

var songs = ["arlo.mp3", "santana.mp3", "CountryJoe.mp3", "CCR.m4a",
  "csny.mp3", "jerry.m4a", "janis.m4a",
  "jimi.mp3", "joan.mp3", "joe.mp3", "joni.mp3", "richie.mp3",
  "tya.mp3", "TheWho.mp3"
];

var pics = ["arlo", "santana", "CountryJoe", "CCR", "csny", "jerry", "janis", "jimi", "joan", "joe", "joni", "richie", "tya", "TheWho"];

// bpL1 is the nomenclature for banner pictures for use in the 1-2-6-2-1 banner layout 
// bpL1 is banner picture in the left grid space 1 grid column wide, and so on . . .
// for the src url we append L1|R1|L2|R2 and .png as done below

var bpL1 = ["jerry", "jimi", "joni"];
var bpL2 = ["joe", "CountryJoe", "jimi", "santana", "alee", "joni"];
var bpR1 = ["arlo", "janis", "tya"];
var bpR2 = ["CCR", "csny", "janis", "joan", "richie", "TheWho"];

var performerPics = [bpR1[0], bpL2[3], bpL2[1], bpR2[0],
  bpR2[1], bpL1[0], bpR2[2],
  bpL2[2], bpR2[3], bpL2[0], bpL2[5], bpR2[4],
  bpR1[2], bpR2[5]
];

var song = "./music/" + songs[10];


// functions 

// function to play sound
/*function playIt(sound) {
  var x = document.createElement("AUDIO");
  x.setAttribute("src", sound);
  x.setAttribute("autoplay", "true");
  x.load();
  x.play();
  document.body.appendChild(x);
} */
function playIt(sound) {
  /* jshint -W087 */
  // debugger; 

  function fader() { // not functional
    if (InT <= 0) {
      clearInterval(f);
    } else {
      InT -= speed;
      let volfactor = InT / fadeTime;
      let newvol = startvol * (volfactor);
      nowPlaying.volume = newvol;
    }
  }
  // end of fade function

  if (songPlaying) { // fade out song if one is playing and remove element
    let nowPlaying = document.getElementById("nowPlaying");
    let startvol = nowPlaying.volume;
    let speed = 0.005; // Rate of volume decrease
    let InT = 0.4; // length of fade in seconds
    let fadeTime = 0.4;

    /* jshint -W087 */
    // debugger; 

    var f = setInterval(fader, 50); // not functional

    nowPlaying.remove();

  } //end of if song playing loop

  var x = document.createElement("AUDIO");
  x.setAttribute("src", sound);
  x.setAttribute("autoplay", "true");
  x.setAttribute("id", "nowPlaying");
  x.load();
  x.play();
  document.body.appendChild(x);
}

// functions to fade img element
function fadeOut(target) {
  var sopac = 1;
  var fopac = 0;
  var elem = document.getElementById(target);
  var id = setInterval(frame, 10);
  var ms = 100;
  sopac = sopac * ms;

  function frame() {
    if ((sopac) === (fopac)) {
      clearInterval(id);
      elem = "<p> <br> </p>";
    } else {
      sopac -= 1;
      elem.style.opacity = sopac / ms;
    }
  }
}

function fadeIn(target) {
  var sopac = 0;
  var fopac = 1;
  var elem = document.getElementById(target);
  var id = setInterval(frame, 10);

  function frame() {
    if (parseInt(sopac) === parseInt(fopac)) {
      clearInterval(id);
    } else {
      sopac = sopac + 0.005;
      elem.style.opacity = sopac;
    }
  }
}

//function to randomize array elements (Fisher Yates method)
function ramdomize(array) {
  var i, j, k;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
}

// function to make output element blink on and off
function blink(outputelemnt) {
  let x = true;
  setInterval(() => {
    if (x) {
      document.getElementById(outputelemnt).style.visibility = "visible";
      x = false;
    } else {
      document.getElementById(outputelemnt).style.visibility = "hidden";
      x = true;
    }
  }, 2000);
}

// function to update gameboard
function updateGameboard() {
  // uses preDisplayString to assemble nameArray (array of each word in artist);
  // places a ThickSpace after every word
  // updates gameboard display

  let displayString = "";
  let nameArray = [];
  // split preDisplay string into array of words using space as seperating character
  nameArray = preDisplayString.split("  ");
  // assembles displayString from nameArray
  for (let i = 0; i < nameArray.length; i++) {
    displayString = displayString + "<span> " + nameArray[i] + "</span>&ThickSpace;";
  }
  // add extra ThickSpace after '&'
  displayString = displayString.replace(/& /g, "&</span>&ThickSpace;<span> ");
  // load updated answer template into gameboard
  document.getElementById("answer").innerHTML = displayString;
  document.getElementById("soFar").innerHTML = "Your Guesses so Far: " + guessesSoFar;
  document.getElementById("guessessLeft").innerHTML = "Guessess Left: " + remainingGuesses;
  document.getElementById("wins").innerHTML = "Guesses Correct / Guesses Total: " + correctGuesses + "<span>&ThickSpace;/</span>&ThickSpace;" + charsGuessed;
}
// function to initialize game
function initializeGame() {
  console.log("initialize Game");
  fadeIn("prestart"); // start slide shows  
  //playIt(song); // start woodstock song
  ramdomize(gameArray); // randomize order of artist names for each game
  roundsMax = 2; // gameArray.length; ******************************************************
}

// function to initialize round 

function initializeRound() {
  console.log("initialize round");
  //console.log("roundCounter: "+roundCounter);
  performerIndex = gameArray[roundCounter];
  //console.log("performerIndex: "+performerIndex);
  artist = performers[performerIndex];
  //console.log("artist: " + artist);
  answerArray = [];
  //console.log("displayArray from prior round: "+ displayArray)
  displayArray = [];
  //  console.log("displayArray from current round: "+ displayArray)

  preDisplayString = "";

  let nospaceartist = "";
  for (let i = 0; i < artist.length; i++) { // get rid of non letters
    if (/[a-z]/i.test(artist[i].toLowerCase())) {
      nospaceartist += artist[i].toLowerCase();
    }
  }
  //console.log("nospaceartist: " + nospaceartist);

  // count number of unique letters in artist, ignoring non-letters
  let uniqueletters = nospaceartist.length;
  for (let i = 0; i < nospaceartist.length - 1; i++) { // for each but the last character in nospaceartist
    if (/[a-z]/i.test(nospaceartist[i].toLowerCase())) { // must be letter
      if (nospaceartist.substr(i + 1).search(nospaceartist[i]) > -1) { // any identical chars following index char
        uniqueletters--;
        // if true, index character has a duplicate;
        //  decrease counter by 1
      } // loop checking for duplicate letters
    } // loop checking for letters only
  } // loop checking every character in artist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

  // initalize maxGuesses, remainingGuesses, numbr of total, correct and letter guesses for this round
  maxGuesses = Math.round(uniqueletters * 1.5); // ? or some other function of artist.length;
  remainingGuesses = maxGuesses;
  charsGuessed = 0;
  correctGuesses = 0;
  guessesSoFar = "";
  // construct artist array, display array and initial predisplay string 
  // use '- ' for letters ' ' (space) for space,'&  ' for &
  //console.log("answerArray going in: " + answerArray);
  //console.log("displayArray going in: " + displayArray);
  //console.log("preDisplayString going in: " + preDisplayString);
  for (let aIndex = 0; aIndex < artist.length; aIndex++) {
    answerArray.push(artist[aIndex]);
    if (artist[aIndex] == " " || artist[aIndex] == "&") {
      displayArray.push(artist[aIndex] + spc);
      preDisplayString += artist[aIndex];
    } else {
      displayArray.push("- ");
      preDisplayString += ("- ");
    }
  }
  //console.log("answerArray comming out: " + answerArray);
  //console.log("displayArray comming out: " + displayArray);
  //console.log("preDisplayString comming out: " + preDisplayString);
  updateGameboard();
  blink("start"); // blink start element
}
// end of functions

//****************************************************************************************** */

// procedure
// a game consists of  (performers.length) rounds
// a round is an attempt to guess one artist
// each round gets at least as many gueses as artist.length (may change this)

document.addEventListener('click', function (e) {
  e = e || window.event;
  let target = e.target || e.srcElement;

  /* jshint -W087 */
  // debugger; 

  // console.log("target.className: " + target.className);
  //  if (target.className == "picture") {
  if (target.className.includes("picture")) {
    // console.log("image Clicked");
    let s = target.src;
    let t = "woodstock/";
    let p = s.search(t);
    p = p + t.length + 2;
    let a = s.slice(p);
    p = a.search(".png");
    a = a.slice(0, p);
    // console.log(a);
    song = "";
    for (let i = 0; i < songs.length; i++) {
      // console.log(songs[i]);
      if (songs[i].includes(a)) {
        song = "./music/" + songs[i];
      }
    }
    // console.log(song);
    playIt(song);
    songPlaying = true;
  }
}, false);

$(document).ready(function () {

  ////////////////////////////////   START OF GAME      /////////////////////////////////////////

  for (let i = 0; i < performers.length; i++) {
    gameArray.push(i); //  create game array 
  }
  initializeGame();

  ///////////////////////////////    START OF ROUND     /////////////////////////////////////////
  // initialize round
  // choose artist for this round (using for loop based on gameArray[i]: 
  //  0 in dev version, roundCounter in full game)
  initializeRound();

  ///////////////////////////////      START OF GUESS     ///////////////////////////////////////////
  document.onkeyup = function (event) { // capture key stroke
    letterGuessed = event.key; // ? 
    letterGuessed = letterGuessed.toLowerCase();
    if (playGame) { // loop: ? still playing game                      
      if (/[a-z]/i.test(letterGuessed.toLowerCase())) { // validate letterGuessed (must be a letter)
        if (remainingGuesses === maxGuesses) { // on first guess of round
          fadeOut("start"); // fade out blinking msg at start of each round
          document.getElementById("start").style.visibility = "hidden";
        }
        if (!guessesSoFar.includes(letterGuessed)) { // ignore duplicate guesses
          guessesSoFar = guessesSoFar + letterGuessed + ", ";
          rightAnswer = false;
          remainingGuesses--;
          charsGuessed++;
          for (i = 0; i < answerArray.length; i++) { // check guess aganst answer
            if (letterGuessed === answerArray[i].toLowerCase()) { // if a match, update display array
              displayArray[i] = answerArray[i] + " ";
              // play 'ding' (win sound) (not  coded yet)
              rightAnswer = true;
            } else {
              // if no match (letter guessed not in artist)
              let x = 1; // dummy placeholder
              // play uh-oh sound ( or equivalent)
            }
          } // end of check guess loop
          // update predisplay string
          if (rightAnswer) {
            correctGuesses++;
          }
          preDisplayString = displayArray.toString();
          preDisplayString = preDisplayString.replace(/,/g, "");
          //console.log("preDisplayString: " + preDisplayString);
          updateGameboard();
        } // end of non-duplicate list loop  N.B.   ! -> logical 'not'
      } // end of 'is guess valid' loop

      /* jshint -W087 */
      // debugger;

      if (remainingGuesses === 0 || !preDisplayString.includes("-")) { // if either true then new round
        roundCounter++; // update rounds played
        // update list with red entry and (L)
        console.log("round complete");
        if (!preDisplayString.includes("-")) {
          winsTotal++; // if win then 
          // update rounds won
          // update list with green entry and (W)
          // update center image with artist's image
          // refresh the banner with new images
          // button for another round
          // refresh C2

        }
        if (roundCounter === roundsMax) {
          initializeGame();
          // initializeRound();
        }
        initializeRound();
      }
    } // end of 'game on' loop
  }; // end of guess entered 'loop' (end of onkeyup wrapper)
}); // end of Document's ready function}; end of Document ready wrapper's parameter list)



// add click event handelers for pictures (click on pic, play the artists song)-- DONE!
// compute number of guesses based on number of unique characters in name -- DONE!
//    easy would be 3 guesses for each unique letter, medium 2, hard 1; 
// consider adding point totals for each round and assigning a letter grade 
//    for each round and for each game
// display stop game button


// guess entered

// still playing this game?
//  no -> exit loop
//  yes - continue

// is guess valid?  
//  no - ignore
//  yes - continue

// has this guess already been used in this round
//  yes - ignore; 
//      - end of is guess valid loop
//      - back to wait for guess entered event (on Key Up)
//  no 
// - add to guesses already used string
// - decrement guesses left
// - continue

//  does guess match any letter(s) in answer
// yes
// play correct guess sound
// update display array
// no
// play incorrect guess sound

//  update predisplay string
//  update gameboard

//*************************************************************************************/

//    yes (!(preDisplayString.includes("-")));  == true
//      play answer correct sound
//      display artists pictureadd to already used string
//      play artists song
//      start new round
//    no
// ? have we run out of guesses  (guesses = 0)
//    yes
//      play 'wrong answer' sound or 'lets try that again'
//      start new round
//    no 
//      decrement number of guesses by one
//      play 'wrong answer' sound or 'lets try that again'
//      continue

//**********************************************************************************************/

// any rounds left (rounds left > 0)
//  yes
// initialize next round
//  no 
// update games won / games played
//  another game?
// yes
// initialize next game
// no
// remove gameboard display
// fade in woodstock
// display 'thanks for playing'
// rotate banner and crowd pictures
// display link to woodstock.com 