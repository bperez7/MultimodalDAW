// variable to store HTML5 audio element
var music = document.getElementById('audio_player');
  
function playAudio() {
  if (music.paused) {
    music.play();
    pButton.className = "";
    pButton.className = "pause";
  } else {
    music.pause();
    pButton.className = "";
    pButton.className = "play";
  }
}


function setVolume(volume) {
   music.volume = volume;
}


var $cursor = $('.cursor');



var controller = Leap.loop(function(frame){
	
    if(frame.hands.length > 0)
    {
    	
        var hand = frame.hands[0];
        var position = hand.palmPosition;
        var velocity = hand.palmVelocity;
        var direction = hand.direction;

        var newLeft = position[0]
        var newTop = position[1]

        console.log(newLeft);
        $cursor.css('left',newLeft);
        $cursor.css('top', newTop);

    }
});