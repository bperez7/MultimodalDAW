// variable to store HTML5 audio element

var CURSOR_SPEED_SCALING = .05;

var SLIDER_SPEED_SCALING = .05;
var KNOB_SPEED_SCALING = .03;



var HORIZONTAL_OFFSET = 300;

var VERTICAL_OFFSET = 1000;

var POSITION_SCALING =7;


var BOTTOM_OF_SCREEN = 800
var RIGHT_SIDE_OF_SCREEN = 1500



var VOLUME_MAX = 500;
var VOLUME_OFFSET = 200;

var MINICIRCLE1OFFSET_TOP = 545;
var MINICIRCLE1OFFSET_LEFT = 445;
var KNOB_RADIUS_OFFSET = 45;

var MINICIRCLE2OFFSET_TOP = 545;
var MINICIRCLE2OFFSET_LEFT = 595;

var MINICIRCLE3OFFSET_TOP = 545;
var MINICIRCLE3OFFSET_LEFT = 745;





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
   console.log(volume);
}




//Audio Prototyping


//window.Wad = Wad;
//let m83 = new Wad({source : 'https://github.com/bperez7/outbreak/blob/master/assets/title_tune_1.wav'});


//function playTrack1() {
//    m83.play();
//}
//Play Button 1

//$('.play1').click(playTrack1());








var $cursor = $('.cursor');

$('h1').css('color', 'black');

var testing = true

//slider and knob booleans
var pinchSlide1 = false;
var pinchSlide2 = false;
var pinchSlide3 = false;

var handleElement1 = document.getElementById('handle1');
var handleElement2 = document.getElementById('handle2');

var knobElement1 = document.getElementById('knob1');
var knobElement2 = document.getElementById('knob2');

var pinchKnob1 = false;
var pinchKnob2 = false;
var pinchKnob3 = false;

var knob2Highlight = false;

var slidePosition2 = 200;

var knobAngle1 = 0;
var knobAngle2 = 0;
var knobAngle3 = 0;


var newVolume = 0;
var newCutoffFreq = 10000;
var newPanValue = 0;

var newCompressionReductionValue = 0;

let volumeEvent = new CustomEvent('volumeChange');
let filterEvent = new CustomEvent('filterChange');
let panningEvent = new CustomEvent('panChange');
let compressionEvent = new CustomEvent('compressionChange');

let speechPlayEvent = new CustomEvent('speechPlay');
let speechPauseEvent = new CustomEvent('speechPause');






var controller = Leap.loop(function(frame){

    if(frame.hands.length > 0)
    {
        //console.log('hey you')
       // console.log(processSpeech('hello'));


        var hand = frame.hands[0]
        var position = hand.palmPosition;
        var velocity = hand.palmVelocity;
        var direction = hand.direction;

        var newLeft = Math.round(position[0]*POSITION_SCALING);
        var newTop = Math.round(position[1]*POSITION_SCALING);

        var cursorVelocityX = velocity[0];
        var cursorVelocityY = velocity[1];

        var currentX = parseInt($('.cursor').css('left'));
        var currentY = parseInt($('.cursor').css('top'));

        var newX = currentX + cursorVelocityX*CURSOR_SPEED_SCALING;
        var newY = currentY - cursorVelocityY*CURSOR_SPEED_SCALING;


        //BORDER CASES
        if (newX<0) {
            newX = 0;
        }
        if (newX> RIGHT_SIDE_OF_SCREEN) {
            newX = RIGHT_SIDE_OF_SCREEN;
        }
        if (newY<0) {
            newY = 0;
        }
        if (newY>BOTTOM_OF_SCREEN) {
            newY = BOTTOM_OF_SCREEN;
        }

        //SET position
        $('.cursor').css('left', Math.round(newX));
        $('.cursor').css('top', Math.round(newY));


        //overlapping sliders

        if (overlapRect('.handle1', '.cursor')) {
            $('.handle1').css('background-color', 'blue');
            console.log('overlap');

            //check pinching 

            if (hand.pinchStrength<.4) {
                    pinchSlide1 = false;
                }
            else {
                pinchSlide1 = true;
            }
        }

        if (pinchSlide1) {
                var newTop;
                
                if (velocity[1] > 0) {
                    var currentTop = parseInt($('.handle1').css('top'));
                    var delta_y = velocity[1]*SLIDER_SPEED_SCALING;

                    //newTop = currentTop+delta_y;
                    if (currentTop<205){//upper limit
                        newTop = 205;
                        }
                    else {
                        newTop = currentTop-delta_y;
                    }
   
                }
                else {
                    var currentTop = parseInt($('.handle1').css('top'))
                    var delta_y = velocity[1]*SLIDER_SPEED_SCALING;

                   // var newTop = currentTop-delta_y;
                     if (currentTop>650) {//height of bar, limit
                        newTop = 650;
                    }
                     else {
                        newTop = currentTop-delta_y;
                     }
                }

                //check release
                if (hand.pinchStrength<.4) {
                    pinchSlide1 = false
                }

                $('.handle1').css('background-color', 'blue');
              //  var delta_y = velocity[1]*SLIDER_SPEED_SCALING;
                var volumeDelta = (newTop-(VOLUME_MAX+VOLUME_OFFSET))*(-1/VOLUME_MAX);
                updateVolume(volumeDelta);
             //   setVolume(newVolume);
                $('.handle1').css('top', newTop);


                handleElement1.dispatchEvent(volumeEvent);

        }

        if (!overlapRect('.handle1', '.cursor') && !pinchSlide1) {
            $('.handle1').css('background-color', 'red');
        }

        //slider 2      


        if (overlapRect('.handle2', '.cursor')) {
            $('.handle2').css('background-color', 'blue');


            //check pinching 

            if (hand.pinchStrength<.4) {
                    pinchSlide2 = false;
                }
            else {
                pinchSlide2 = true;
            }
        }

        if (pinchSlide2) {

            var newTop;

            if (velocity[1] > 0) {
                var currentTop = parseInt($('.handle2').css('top'));
                var delta_y = velocity[1]*SLIDER_SPEED_SCALING;


                if (currentTop<205){//upper limit
                    newTop = 205;
                }
                else {
                    newTop = currentTop-delta_y;
                }

            }
            else {
                var currentTop = parseInt($('.handle2').css('top'))
                var delta_y = velocity[1]*SLIDER_SPEED_SCALING;


                if (currentTop>650) {//height of bar, limit
                    newTop = 650;
                }
                else {
                    newTop = currentTop-delta_y;
                }
            }

                //check release
                if (hand.pinchStrength<.4) {
                    pinchSlide2 = false
                }

                $('.handle2').css('background-color', 'blue');

                updateCompressionReductionValue((newTop-200)*(-2/50));
                handleElement2.dispatchEvent(compressionEvent);

                $('.handle2').css('top', newTop);

        }

        if (!overlapRect('.handle2', '.cursor') && !pinchSlide2) {
            $('.handle2').css('background-color', 'red');
        }




//slider 3      

        if (overlapRect('.handle3', '.cursor')) {
            $('.handle3').css('background-color', 'blue');


            //check pinching 

            if (hand.pinchStrength<.4) {
                    pinchSlide3 = false;
                }
            else {
                pinchSlide3 = true;
            }
        }

        if (pinchSlide3) {


            var newTop;

            if (velocity[1] > 0) {
                var currentTop = parseInt($('.handle3').css('top'));
                var delta_y = velocity[1]*SLIDER_SPEED_SCALING;

                //newTop = currentTop+delta_y;
                if (currentTop<205){//upper limit
                    newTop = 205;
                }
                else {
                    newTop = currentTop-delta_y;
                }

            }
            else {
                var currentTop = parseInt($('.handle3').css('top'))
                var delta_y = velocity[1]*SLIDER_SPEED_SCALING;

                if (currentTop>650) {//height of bar, limit
                    newTop = 650;
                }
                else {
                    newTop = currentTop-delta_y;
                }
            }

                //check release
                if (hand.pinchStrength<.4) {
                    pinchSlide3 = false
                }

                $('.handle3').css('background-color', 'blue');

                $('.handle3').css('top', newTop);

        }

        if (!overlapRect('.handle3', '.cursor') && !pinchSlide3) {
            $('.handle3').css('background-color', 'red');
        }

// Knob 1 

        if (overlapRect('.circle1', '.cursor')) {

            $('.circle1').css('opacity', 0.7);

            if(hand.pinchStrength > .4){

                pinchKnob1 = true;
            }

            else {
                pinchKnob1 = false;
            }
        }

        
        


        if (pinchKnob1 && !pinchKnob2 &&!knob2Highlight) {

            //get angle of rotation

            var angleLimit = 3.14/3
            var handAngle = hand.roll();

            if (handAngle>0) {

                if (handAngle<-angleLimit) {
                    knobAngle1=KNOB_SPEED_SCALING*handAngle;
                }
                else {
                    knobAngle1+=KNOB_SPEED_SCALING*(-angleLimit);
                }

            }
            else if (handAngle<0) {

                if (handAngle>angleLimit) {
                knobAngle1+=KNOB_SPEED_SCALING*handAngle;
                }
                else {
                    knobAngle1+=KNOB_SPEED_SCALING*(angleLimit);
                }

            }


            knobElement1.dispatchEvent(filterEvent);

            //update filter value
            updateFilter(300 + angleValue(1)*300);


            $('.miniCircle1').css('left', MINICIRCLE1OFFSET_LEFT + Math.round(KNOB_RADIUS_OFFSET*Math.cos(knobAngle1 - 3.14/2)));
            $('.miniCircle1').css('top', MINICIRCLE1OFFSET_TOP + Math.round(KNOB_RADIUS_OFFSET*Math.sin(knobAngle1 - 3.14/2)));
            $('.circle1').css('opacity', 0.7);

            if (hand.pinchStrength<.3) { //release
                pinchKnob1 = false;
            }



        }

        //normal
        if (!pinchKnob1&& !overlapRect('.circle1', '.cursor'))
                { $('.circle1').css('opacity', 1);  
                }


    // Knob 2 

        if (overlapRect('.circle2', '.cursor')) {

            $('.circle2').css('opacity', 0.7);

            if(hand.pinchStrength > .4){

                pinchKnob2 = true;
            }

            else {
                pinchKnob2 = false;
            }
        }

        
        


        if (pinchKnob2 && !pinchKnob1) {

            //get angle of rotation

            var angleLimit = 3.14/3
            var handAngle = hand.roll();

            if (handAngle>0) {

                if (handAngle<-angleLimit) {
                    knobAngle2=KNOB_SPEED_SCALING*handAngle;
                }
                else {
                    knobAngle2+=KNOB_SPEED_SCALING*(-angleLimit);
                }




            }
            else if (handAngle<0) {

                if (handAngle>angleLimit) {
                    knobAngle2+=KNOB_SPEED_SCALING*handAngle;
                }
                else {
                    knobAngle2+=KNOB_SPEED_SCALING*(angleLimit);
                }

            }

            knobElement2.dispatchEvent(panningEvent);

            updatePanValue(knobAngle2);


            $('.miniCircle2').css('left', MINICIRCLE2OFFSET_LEFT + Math.round(KNOB_RADIUS_OFFSET*Math.cos(knobAngle2 - 3.14/2)));
            $('.miniCircle2').css('top', MINICIRCLE2OFFSET_TOP + Math.round(KNOB_RADIUS_OFFSET*Math.sin(knobAngle2 - 3.14/2)));
            $('.circle2').css('opacity', 0.7);

            if (hand.pinchStrength<.3) { //release
                pinchKnob2 = false;
                knob2Highlight = false;


            }



        }

        //normal
        if (!pinchKnob2&& !overlapRect('.circle2', '.cursor'))
                { $('.circle2').css('opacity', 1);  
                }


//Knob 3 

if (overlapRect('.circle3', '.cursor')) {

            $('.circle3').css('opacity', 0.7);

            if(hand.pinchStrength > .4){

                pinchKnob3 = true;
            }

            else {
                pinchKnob3 = false;
            }
        }

        
        


        if (pinchKnob3) {

            //get angle of rotation

            var angleLimit = 3.14/3
            var handAngle = hand.roll();

            if (handAngle>0) {

                if (handAngle<-angleLimit) {
                    knobAngle3=KNOB_SPEED_SCALING*handAngle;
                }
                else {
                    knobAngle3+=KNOB_SPEED_SCALING*(-angleLimit);
                }



            }
            else if (handAngle<0) {

                //knobAngle1+=.02;
                if (handAngle>angleLimit) {
                    knobAngle3+=KNOB_SPEED_SCALING*handAngle;
                }
                else {
                    knobAngle3+=KNOB_SPEED_SCALING*(angleLimit);
                }


            }


            $('.miniCircle3').css('left', MINICIRCLE3OFFSET_LEFT + Math.round(KNOB_RADIUS_OFFSET*Math.cos(knobAngle3 - 3.14/2)));
            $('.miniCircle3').css('top', MINICIRCLE3OFFSET_TOP + Math.round(KNOB_RADIUS_OFFSET*Math.sin(knobAngle3 - 3.14/2)));
            $('.circle3').css('opacity', 0.7);

            if (hand.pinchStrength<.3) { //release
                pinchKnob3 = false;


            }



        }

        //normal
        if (!pinchKnob3&& !overlapRect('.circle3', '.cursor'))
                { $('.circle3').css('opacity', 1);  
                }




    }
});


function isOverlap(idOne,idTwo){
        var objOne=$(idOne),
            objTwo=$(idTwo),
            offsetOne = objOne.offset(),
            offsetTwo = objTwo.offset(),
            topOne=offsetOne.top,
            topTwo=offsetTwo.top,
            leftOne=offsetOne.left,
            leftTwo=offsetTwo.left,
            widthOne = objOne.width(),
            widthTwo = objTwo.width(),
            heightOne = objOne.height(),
            heightTwo = objTwo.height();
        var leftTop = leftTwo > leftOne && leftTwo < leftOne+widthOne                  
            && topTwo > topOne && topTwo < topOne+heightOne,             
            rightTop = leftTwo+widthTwo > leftOne && leftTwo+widthTwo < leftOne+widthOne                  
            && topTwo > topOne && topTwo < topOne+heightOne,             leftBottom = leftTwo > leftOne && leftTwo < leftOne+widthOne                 
             && topTwo+heightTwo > topOne && topTwo+heightTwo < topOne+heightOne,             

             rightBottom = leftTwo+widthTwo > leftOne && leftTwo+widthTwo < leftOne+widthOne                  
             && topTwo+heightTwo > topOne && topTwo+heightTwo < topOne+heightOne;
        return leftTop || rightTop || leftBottom || rightBottom;
} 

function overlapSlider1() { var overlap = !((parseInt($('.handle1').css('left')) + parseInt($('.handle1').css('width'))) < parseInt($('.cursor').css('left')) || 
                parseInt($('.handle1').css('left')) > parseInt($('.cursor').css('left')) + parseInt($('.cursor').css('width')) || 
                (parseInt($('.handle1').css('top') + parseInt($('.handle1').css('height')))) < parseInt($('.cursor').css('top')) || 
                parseInt($('.handle1').css('top')) > parseInt($('.cursor').css('top')) + parseInt($('.handle1').css('height')))
        return overlap 
}


function overlap(ob1, ob2) {
    var overlapping = !((parseInt($(ob1).css('left')) + parseInt($(ob1).css('width'))) < parseInt($(ob2).css('left')) || 
                parseInt($(ob1).css('left')) > parseInt($(ob2).css('left')) + parseInt($(ob2).css('width')) || 
                (parseInt($(ob1).css('top') + parseInt($(ob1).css('height')))) < parseInt($(ob2).css('top')) || 
                parseInt($(ob1).css('top')) > parseInt($(ob2).css('top')) + parseInt($(ob2).css('height')))
    return overlapping

}



function overlapRect(obj1, obj2) {

                var elem1 = document.querySelector(obj1);
                var elem2 = document.querySelector(obj2);
                var rect1 = elem1.getBoundingClientRect();
                var rect2 = elem2.getBoundingClientRect();
                var overlappingTest = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);

                return overlappingTest;
}




var overlappingtest1 = (parseInt($('.handle1').css('right')) < parseInt($('.cursor').css('left')))



function rotateImage(degree, imageName) {
    $(imageName).animate({
        transform: degree,
        fill: 'forward'
        }, {
            step: function(now, fx) {
                $(this).css({
                    '-webkit-transform': 'rotate(' + now + 'deg)',
                    '-moz-transform': 'rotate(' + now + 'deg)',
                    'transform': 'rotate(' + now + 'deg)',
                    
                    });
                }
            });
        }


function angleValue(knobIndex) {
    if (knobIndex == 1) {
        var result = knobAngle1;
    }

    else if (knobIndex == 2) {
        var result = knobAngle2;
    }

    else if (knobIndex == 3) {
        var result = knobAngle3

    }
    return result;
}

function updateVolume(value) {
    newVolume = value;
}
function newVolumeValue() {
    return newVolume;
}

function updateFilter(value) {
    newCutoffFreq = value;

}

function newFilterValue() {
    return newCutoffFreq;
}

function updatePanValue() {
    newPanValue = -Math.cos(angleValue(2));
}

function getPanValue() {
    return newPanValue;
}


function updateCompressionReductionValue(value) {
    newCompressionReductionValue = -value;
}

function getCompressionReductionValue() {
    return newCompressionReductionValue;
}
















//Audio Logic

var sineaOn = false;
var sinea = false;

var gainNode;
var filterM83;
var pannerOptions;
var panner;
var compressor;


var sourcem83 = false;
sineButton = document.getElementById('playButton1');
var m83Ctx = false;
m83Button = document.querySelector('audio');
m83Button.crossOrigin = "anonymous";


function audioPlayListener() {
    console.log('1');
    console.log(m83Ctx);
    if (m83Ctx==false) {console.log('path');
        m83Ctx = new (window.AudioContext || window.webkitAudioContext)();}
    console.log('2');
    if (!sourcem83) {
        console.log('3');
        sourcem83 = m83Ctx.createMediaElementSource(m83Button);
        console.log('4')
        gainNode = m83Ctx.createGain();



        filterM83 = m83Ctx.createBiquadFilter();
        pannerOptions = { pan: 0 };
        panner = new StereoPannerNode(m83Ctx, pannerOptions);
        compressor = m83Ctx.createDynamicsCompressor();
    }


    // Create a gain node





    compressor.threshold.value = -50;
    compressor.knee.value = 40;


    filterM83.frequency.value = 10000;

    handleElement1.addEventListener('volumeChange', ()=> {
        console.log(newVolume);
        gainNode.gain.value = newVolumeValue();
    })

    handleElement2.addEventListener('compressionChange', ()=> {
        console.log(newCompressionReductionValue);
        compressor.threshold.value = newCompressionReductionValue;
    })

    knobElement1.addEventListener('filterChange', ()=>{
        console.log(newCutoffFreq);
        filterM83.frequency.value = newFilterValue();
    })

    knobElement2.addEventListener('panChange', ()=> {
        console.log(newPanValue);
        panner.pan.value = getPanValue();

    })




    sourcem83.connect(filterM83);
    filterM83.connect(panner);
    panner.connect(compressor);
    compressor.connect(gainNode);


    gainNode.connect(m83Ctx.destination);

}


m83Button.addEventListener('play', audioPlayListener);
m83Button.addEventListener('speechPlay', speechPlayActivate);
m83Button.addEventListener('speechPause', speechPauseActivate);

function speechPlayActivate() {
    m83Button.play();
}

function speechPauseActivate() {
    m83Button.pause();
}






//Speech
//
var processSpeech = function(transcript) {
    // Helper function to detect if any commands appear in a string

    var userSaid = function (str, commands) {
        for (var i = 0; i < commands.length; i++) {
            if (str.indexOf(commands[i]) > -1)
                return true;
        }
        return false;
    };

    var processed = false;

    if (userSaid(transcript, ['play'])) {
        console.log('play');
    //        m83Button.play();
        m83Button.dispatchEvent(speechPlayEvent);

    }

    if (userSaid(transcript, ['pause'])) {
        console.log('pause');
        m83Button.dispatchEvent(speechPauseEvent);
    }

    if (userSaid(transcript, ['volume'])) {
        console.log('volume');
        if (userSaid(transcript, ['up'])) {
            console.log('up');
            speechVolumeUpdate("up");
        }
        else if (userSaid(transcript, ['down'])) {
            console.log('down');
            speechVolumeUpdate("down");
        }

    }

    if (userSaid(transcript, ['filter'])) {
        console.log('filter');
        if (userSaid(transcript, ['up'])) {
            console.log('up');
            speechFilterUpdate("up");
        }
        else if (userSaid(transcript, ['down'])) {
            console.log('down');
            speechFilterUpdate("down");
        }

    }
    if (userSaid(transcript, ['pain','pan'])) {
        console.log('pan');
        if (userSaid(transcript, ['right'])) {
            console.log('right');
            speechPanUpdate("right");
        }
        else if (userSaid(transcript, ['left'])) {
            console.log('left');
            speechPanUpdate("left");
        }

    }


    //
    // if (userSaid(transcript, ['stop'])) {
    //     console.log('')
    // }

    /*if (userSaid(transcript, ['fire'])) {
        registerPlayerShot();


        processed = true;

    }*/
    return transcript;
    //return processed;
};

//console.log(processSpeech('hello'));

//export processSpeech


function speechVolumeUpdate(direction = "up", scale = 50) {
    if (direction == "up")
        var newTop = parseInt($('.handle1').css('top')) - scale;
    else
        var newTop = parseInt($('.handle1').css('top')) + scale;
    if (newTop>700)
        var newTop = 700;
    if (newTop<205)
        var newTop = 205;


    //$('.handle1').css('background-color', 'blue');
    //  var delta_y = velocity[1]*SLIDER_SPEED_SCALING;
    var volumeDelta = (newTop-(VOLUME_MAX+VOLUME_OFFSET))*(-1/VOLUME_MAX);
    console.log('delta');
    console.log(volumeDelta);
    updateVolume(volumeDelta);
    console.log(newTop);
    //   setVolume(newVolume);
    $('.handle1').css('top', newTop);


    handleElement1.dispatchEvent(volumeEvent);
}

function speechFilterUpdate(direction = "up", scale = .4) {
    //get angle of rotation


    if (direction=="up") {

        knobAngle1+=scale;

    }
    else if (direction = "down") {

        knobAngle1-=scale;

    }


    //update filter value
    updateFilter(300 + angleValue(1)*300);

    knobElement1.dispatchEvent(filterEvent);




    $('.miniCircle1').css('left', MINICIRCLE1OFFSET_LEFT + Math.round(KNOB_RADIUS_OFFSET*Math.cos(knobAngle1 - 3.14/2)));
    $('.miniCircle1').css('top', MINICIRCLE1OFFSET_TOP + Math.round(KNOB_RADIUS_OFFSET*Math.sin(knobAngle1 - 3.14/2)));
}


function speechPanUpdate(direction = "right", scale = .4) {
    //get angle of rotation


    if (direction=="right") {

        knobAngle2+=scale;

    }
    else if (direction = "left") {

        knobAngle2-=scale;

    }


    //update pan value
    updatePanValue(knobAngle2);

    knobElement2.dispatchEvent(panningEvent);

    $('.miniCircle2').css('left', MINICIRCLE2OFFSET_LEFT + Math.round(KNOB_RADIUS_OFFSET*Math.cos(knobAngle2 - 3.14/2)));
    $('.miniCircle2').css('top', MINICIRCLE2OFFSET_TOP + Math.round(KNOB_RADIUS_OFFSET*Math.sin(knobAngle2 - 3.14/2)));
}