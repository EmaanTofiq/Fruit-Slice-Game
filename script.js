var playing = false;
var score;
var trailslft;
var fruits = ["pineapple", "banana", "cherry"];
var step;
var action;
$(function () {
  // click on strt/rest btn
  $("#start-reset").click(function () {
    //we r playing
    if (playing == true) {
      //reload page
      location.reload();
    } else {
      //no

      playing = true;
      score = 0;
      $("#scorevalue").html(score);
      // show trails left
      $("#trial-btn").show();
      trailslft = 3;
      addHearts();
      $("#game-over").hide();
    }
    // chnage strt btn to rest game btn
    $("#start-reset").text("Reset Game");
    startAction();
  });


  $('#fruit1').mouseover(function(){
    score++;
    $('#scorevalue').html(score);
    $('#slicesound')[0].play();     // to access first sound in the audio tag

    // stop fruit
    clearInterval(action);

    // // slice fruit
    $('#fruit1').hide('explode',500);

    // // send new fruit
    setTimeout(startAction,800);
  })
  // slice a fruit
  // play sound
  // explode fruit

  function addHearts() {
    $("#trial-btn").empty();
    for (i = 0; i < trailslft; i++) {
      $("#trial-btn").append('<img src="images/heart.png" class="life">');
    }
  }

  // 1.create random fryuts
  function startAction() {
    $("#fruit1").show();
    choosefruit();
    $("#fruit1").css({ left: Math.round(Math.random() * 550), top: -50 });

    // create a random step
    step = 1 + Math.round(5 * Math.random());

    // 2.move fruits down evry step 30sec
    action = setInterval(function () {
      $("#fruit1").css("top", $("#fruit1").position().top + step);

      // if fruit is too low
      if ($("#fruit1").position().top > $("#fruitContainer").height()) {
        // yes -> check trials left?
        if (trailslft > 1) {
          $("#fruit1").show();
          choosefruit();
          $("#fruit1").css({ left: Math.round(Math.random() * 550), top: -50 });
          // create a random step
          step = 1 + Math.round(5 * Math.random());

          // reduce trials by 1
          trailslft--;
          addHearts();
        } else {
          playing = false;
          $("#start-reset").text("Start Game");
          $("#game-over").show();
          $("#game-over").html(
            "<p>game over!</p><p>your score is " + score + "</p>"
          );
          $("#trial-btn").hide();
          stopAction();
        }
      }
    }, 10);
  }

  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
  function choosefruit() {
    $("#fruit1").attr(
      "src",
      "images/" + fruits[Math.round(2 * Math.random())] + ".png"
    );
  }
});
