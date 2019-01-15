var userClickedPattern = [];
var gamePattern = [];
var buttonColor = [
  "red",
  "blue",
  "green",
  "yellow"
];
var started = false;
var level = 0;
$(document).keypress(function() {
  if (started == false) {
    nextSequence();
    started = true;

    $("h1").text("Level " + level);
  }
});
$(".btn").click(function(event) {
  var userChosenColor = (event.target.id);
  userClickedPattern.push(userChosenColor);
  // $("." + userChosenColor).fadeOut(100).fadeIn(100);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.random() * 3;
  randomNumber = Math.round(randomNumber);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio(name + '.mp3');
  audio.play();
}

function animatePress(cureentColor) {
  $("." + cureentColor).toggleClass("pressed");
  setTimeout(function() {
    $("." + cureentColor).toggleClass("pressed");
  }, 100);
}

function checkAnswer(cureentLevel) {
  if (gamePattern[cureentLevel] == userClickedPattern[cureentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

    console.log("success");
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").toggleClass("game-over");
    setTimeout(function(){
      $("body").toggleClass("game-over");
    },200);
    $("h1").text("Game Over!. Press any key to restart");
    started=false;
    level=0;
    gamePattern = [];

  }



}
