// variable to store HTML5 audio element

//TODO
// 1. Keyboard
// 2. Voice commands for buttons
// 3. Different shapes for keyboard (voice command)
// 4. Live response for buttons
// 5. Size and spacing
// 5. Labels
// 6. Finish voice commands
// 7. Improve calibration/smoothing
// 8. Record option
// 9. Upload personal file

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

var MINICIRCLE1OFFSET_TOP = 345;
var MINICIRCLE1OFFSET_LEFT = 445;
var KNOB_RADIUS_OFFSET = 45;

var MINICIRCLE2OFFSET_TOP = 345;
var MINICIRCLE2OFFSET_LEFT = 595;

var MINICIRCLE3OFFSET_TOP = 345;
var MINICIRCLE3OFFSET_LEFT = 745;


//speech variables

var speechButton = false;
var speechButtonActivated = false;

//Keyboard notes
var noteLetters = "abcdefg"
var sharpLetters = "acdfg";
var allNormalKeys = [];
var allSharpKeys = [];




for (var x = 0; x < noteLetters.length; x++)
{
    var c = noteLetters.charAt(x);
    allNormalKeys.push(document.getElementById(c+ '-key'));

}

//don't forget second c
allNormalKeys.push(document.getElementById('c2-key'));

for (var x = 0; x < sharpLetters.length; x++)
{
    var c = sharpLetters.charAt(x);
    allSharpKeys.push(document.getElementById(c+ '-sharp-key'));

}



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
var knobElement3 = document.getElementById('knob3');

var knob1Button = document.getElementById('knob1OnButton');
var knob2Button = document.getElementById('knob2OnButton');
var knob3Button = document.getElementById('knob3OnButton');

var effect1On = false;
var effect2On = false;
var effect3On = false;


var pinchKnob1 = false;
var pinchKnob2 = false;
var pinchKnob3 = false;

var knob2Highlight = false;

var slidePosition2 = 200;

var knobAngle1 = 0;
var knobAngle2 = 0;
var knobAngle3 = 0;


var newVolume = 0;
var newVolume2 = 0;
var newCutoffFreq = 10000;
var newPanValue = 0;

var newCompressionReductionValue = 0;

let volumeEvent = new CustomEvent('volumeChange');
let volume2Event = new CustomEvent('volume2Change');

let filterEvent = new CustomEvent('filterChange');
let panningEvent = new CustomEvent('panChange');
let compressionEvent = new CustomEvent('compressionChange');
let bitEvent = new CustomEvent('bitChange');

let speechPlayEvent = new CustomEvent('speechPlay');
let speechPauseEvent = new CustomEvent('speechPause');

let pianoEvent = new CustomEvent('keyPress');
let releaseEvent = new CustomEvent('keyRelease');

//wave events
let sineEvent = new CustomEvent('sineEvent');
let squareEvent = new CustomEvent('squareEvent');
let sawtoothEvent = new CustomEvent('sawtoothEvent');
let triangleEvent = new CustomEvent('triangleEvent');





var sineAConnected = false;


var frequencyDict = {};

frequencyDict['c-key'] = 261.63;
frequencyDict['c-sharp-key'] = 277.18
frequencyDict['d-key'] = 293.66;
frequencyDict['d-sharp-key'] = 311.13;
frequencyDict['e-key'] = 329.63;
frequencyDict['f-key'] = 349.23;
frequencyDict['f-sharp-key'] = 369.99;
frequencyDict['g-key'] = 392;
frequencyDict['g-sharp-key'] = 415.3;
frequencyDict['a-key'] = 440;
frequencyDict['a-sharp-key'] = 466.16;
frequencyDict['b-key'] = 493.88;
frequencyDict['c2-key'] = 523.25;

// allNormalKeys.forEach((key), ()=> {
//     keyID = key.getAttribute('id');
//     frequencyDict[keyID]
// })




var screenTapGesture = false;
var keyTapGesture = false;


var controller = Leap.loop(function(frame){

    screenTapGesture = false;
    keyTapGesture = false;
    if(frame.valid && frame.gestures.length > 0){
        frame.gestures.forEach(function(gesture){
            switch (gesture.type){
                case "circle":
                    console.log("Circle Gesture");
                    break;
                case "keyTap":
                    console.log("Key Tap Gesture");
                    keyTapGesture = gesture;
                    break;
                case "screenTap":
                    console.log("Screen Tap Gesture");
                    screenTapGesture = gesture;
                    break;
                case "swipe":
                    console.log("Swipe Gesture");
                    break;
            }
        });
    }

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
            var volumeDelta = (newTop-(VOLUME_MAX+VOLUME_OFFSET))*(-1/VOLUME_MAX);
                //scale by 2 for sine waves
            updateVolume2(volumeDelta/2);
            handleElement2.dispatchEvent(volume2Event);
                $('.handle2').css('background-color', 'blue');

               // updateCompressionReductionValue((newTop-200)*(-2/50));
              //  handleElement2.dispatchEvent(compressionEvent);

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


        //overlapping Button

        if (overlapRect('.knob1OnButton', '.cursor')) {

            $('.knob1OnButton').css('opacity',.4)

            if (!effect1On) {
                if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton) {
                    effect1On = true;
                    $('.knob1OnButton').css('background-color', 'magenta');
                    speechButton = false;
                    speechButtonActivated = true;

                }



            }
            //effect 1 already on
            else {
                if ((keyTapGesture!=false) || (screenTapGesture!=false || speechButton)) {
                    effect1On = false;
                    $('.knob1OnButton').css('background-color', 'cyan');
                    speechButton = false;
                    speechButtonActivated = true;

                }
            }
        }
        else {
            $('.knob1OnButton').css('opacity',1)
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




        //overlapping Button

        if (overlapRect('.knob2OnButton', '.cursor')) {

            $('.knob2OnButton').css('opacity',.4)

            if (!effect2On) {
                if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton) {
                    effect2On = true;
                    $('.knob2OnButton').css('background-color', 'magenta');
                    speechButtonActivated = true;
                    speechButton = false;

                }

            }
            //effect 1 already on
            else {
                if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton) {
                    effect2On = false;
                    $('.knob2OnButton').css('background-color', 'cyan');
                    speechButtonActivated = true;
                    speechButton = false;

                }
            }
        }
        else {
            $('.knob2OnButton').css('opacity',1)
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


        knobElement3.dispatchEvent(bitEvent);
        //normal
        if (!pinchKnob3&& !overlapRect('.circle3', '.cursor'))
                { $('.circle3').css('opacity', 1);  
                }


        //overlapping Button

        if (overlapRect('.knob3OnButton', '.cursor')) {

            $('.knob3OnButton').css('opacity',.4)

            if (!effect3On) {
                if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton) {
                    effect3On = true;
                    $('.knob3OnButton').css('background-color', 'magenta');
                    speechButtonActivated = true;
                    speechButton = false;

                }

            }
            //effect 3 already on
            else {
                if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton) {
                    effect3On = false;
                    $('.knob3OnButton').css('background-color', 'cyan');
                    speechButtonActivated = true;
                    speechButton = false;

                }
            }
        }
        else {
            $('.knob3OnButton').css('opacity',1)
        }





        //Keyboard logic!

        var nonePressed = true;
        var blackPressed = false;

        allSharpKeys.forEach((key, index)=> {
            if (overlapRect('.cursor', '.' + key.getAttribute('id'))) {
                $('.' + key.getAttribute('id')).css('opacity', .5);
                nonePressed = false;
                console.log('overlap black key');
                key.dispatchEvent(pianoEvent);
                blackPressed = true;
            }

            else {
                $('.' + key.getAttribute('id')).css('opacity', 1);
                key.dispatchEvent(releaseEvent);

            }
        })

        allNormalKeys.forEach((key, index)=> {
            if (!blackPressed) { //black keys take priority
                if (overlapRect('.cursor', '.' + key.getAttribute('id'))) {
                    $('.' + key.getAttribute('id')).css('opacity', .5);
                    nonePressed = false;
                    key.dispatchEvent(pianoEvent);
                }

                else {
                    $('.' + key.getAttribute('id')).css('opacity', 1);
                    key.dispatchEvent(releaseEvent);
                }
            }

        })


        if (nonePressed)
            handleElement2.dispatchEvent(releaseEvent);










    }
});





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

function updateVolume2(value) {
    newVolume2 = value;
}
function newVolumeValue() {
    return newVolume;
}

function newVolume2Value() {
    return newVolume2;
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

function bitValue() {
    if (knobAngle3>3) {
        return 16
    }
    else if (knobAngle3<-3) {
        return 0
    }
    return Math.round((8/3)*knobAngle3+3);

}
















//Audio Logic

var bufferSize = 4096;
function bitCrusherEffect(context, numBits) {
    var node = context.createScriptProcessor(bufferSize, 1, 1);
    node.bits = numBits; // between 1 and 16
    node.normfreq = 0.1; // between 0.0 and 1.0
    var step = Math.pow(1/2, node.bits);
    var phaser = 0;
    var last = 0;
    node.onaudioprocess = function(e) {
        var input = e.inputBuffer.getChannelData(0);
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            phaser += node.normfreq;
            if (phaser >= 1.0) {
                phaser -= 1.0;
                last = step * Math.floor(input[i] / step + 0.5);
            }
            output[i] = last;
        }
    };
    return node;
}


var sineaOn = false;
var sinea = false;

var gainNode;
var filterM83;
var pannerOptions;
var panner;
var compressor;
var bitNode;


var sourcem83 = false;
sineButton = document.getElementById('playButton1');
var m83Ctx = false;
m83Button = document.querySelector('audio');
m83Button.crossOrigin = "anonymous";



var sinea;
var volumeSinea;





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



        sinea = m83Ctx.createOscillator();
        volumeSinea = m83Ctx.createGain();

        volumeSinea.gain.value = 0;
        volumeSinea.connect(m83Ctx.destination);
        sinea.frequency.value = 440;
        sinea.type = "sine";


        sinea.connect(volumeSinea);
        sinea.start();

        bitNode = bitCrusherEffect(m83Ctx, bitValue());
       // volumeSinea.connect(m83Ctx.destination);




        //filterA.connect(audioCtx.destination);

        // async function createReverb() {
        //     let convolver = audioCtx.createConvolver();
        //
        //     // load impulse response from file
        //     let response     = await fetch("path/to/impulse-response.wav");
        //     let arraybuffer  = await response.arrayBuffer();
        //     convolver.buffer = await audioCtx.decodeAudioData(arraybuffer);
        //
        //     return convolver;
        // }


        // let reverb = await createReverb();

// someOtherAudioNode -> reverb -> destination
      //  someOtherAudioNode.connect(reverb);
      //  reverb.connect(audioCtx.destination);

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
        //console.log(newCompressionReductionValue);
        //compressor.threshold.value = newCompressionReductionValue;
    })




    handleElement2.addEventListener('volume2Change', ()=> {
        console.log(newVolume2Value());
        volumeSinea.gain.value = newVolume2Value();
        //compressor.threshold.value = newCompressionReductionValue;
    })


    //wave events

    handleElement2.addEventListener('sineEvent', ()=> {
        console.log('sine');
        sinea.type = 'sine';
        //compressor.threshold.value = newCompressionReductionValue;
    })
    handleElement2.addEventListener('squareEvent', ()=> {
        console.log('square');
        sinea.type = 'square';
        //compressor.threshold.value = newCompressionReductionValue;
    })

    handleElement2.addEventListener('sawtoothEvent', ()=> {
        console.log('sawtooth');
        sinea.type = 'sawtooth';
        //compressor.threshold.value = newCompressionReductionValue;
    })

    handleElement2.addEventListener('triangleEvent', ()=> {
        console.log('triangle');
        sinea.type = 'triangle';
        //compressor.threshold.value = newCompressionReductionValue;
    })





    knobElement1.addEventListener('filterChange', ()=>{
        console.log(newCutoffFreq);
        filterM83.frequency.value = newFilterValue();
    })

    knobElement2.addEventListener('panChange', ()=> {
        console.log(newPanValue);
        panner.pan.value = getPanValue();

    })

    knobElement3.addEventListener('bitChange', ()=>{
        console.log(bitValue());
        bitNode.bits = bitValue();
    });

    allNormalKeys.forEach((key)=> {
        key.addEventListener('keyPress', () => {
            console.log('key ' + key.getAttribute('id'));
            sinea.frequency.value = frequencyDict[key.getAttribute('id')];
            volumeSinea.connect(m83Ctx.destination);
            sineAConnected = true;
        })
    });
    allSharpKeys.forEach((key)=>{
        key.addEventListener('keyPress', ()=>{
            console.log('key ' + key.getAttribute('id'));
            sinea.frequency.value = frequencyDict[key.getAttribute('id')];
            volumeSinea.connect(m83Ctx.destination);
            sineAConnected = true;

        })

        // key.addEventListener('keyRelease', ()=> {
        //     console.log('key ' + key.getAttribute('id'));
        //    // volumeSinea.disconnect(m83Ctx.destination);
        //     //sinea.frequency.value = 0;
        // })
    });

    //when no keys are pressed
    handleElement2.addEventListener('keyRelease', ()=> {
        //console.log(newCompressionReductionValue);


        if (sineAConnected) {
            sineAConnected = false;
            volumeSinea.disconnect(m83Ctx.destination);

        }
        //compressor.threshold.value = newCompressionReductionValue;
    });





    sourcem83.connect(filterM83);
    filterM83.connect(panner);
    panner.connect(gainNode);
    // compressor.connect(gainNode);

    gainNode.connect(bitNode);
    bitNode.connect(m83Ctx.destination);

    //sinea
    //volumeSinea.connect(m83Ctx.destination);

    if (effect1On && effect2On && effect3On) {
        sourcem83.connect(filterM83);
        filterM83.connect(panner);
        panner.connect(gainNode);
       // compressor.connect(gainNode);

        gainNode.connect(bitNode);
        bitNode.connect(m83Ctx.destination);

        //sinea
        volumeSinea.connect(m83Ctx.destination);

    }

    if (!effect1On && effect2On && effect3On) {
        sourcem83.disconnect(filterM83);
        filterM83.disconnect(panner);
        sourcem83.connect(panner);

        panner.connect(gainNode);
        // compressor.connect(gainNode);

        gainNode.connect(bitNode);
        bitNode.connect(m83Ctx.destination);

        //sinea
        volumeSinea.connect(m83Ctx.destination);

    }

    if (!effect1On && !effect2On && effect3On) {
        sourcem83.disconnect(filterM83);
        filterM83.disconnect(panner);
        sourcem83.connect(gainNode);

        gainNode.connect(bitNode);
        bitNode.connect(m83Ctx.destination);

        //sinea
        volumeSinea.connect(m83Ctx.destination);

    }

    if (!effect1On && !effect2On && !effect3On) {
        console.log('all off');
        sourcem83.disconnect(filterM83);
        filterM83.disconnect(panner);
        panner.disconnect(gainNode);


        gainNode.disconnect(bitNode);
        bitNode.disconnect(m83Ctx.destination);

        sourcem83.connect(gainNode);
       gainNode.connect(m83Ctx.destination);

        volumeSinea.connect(m83Ctx.destination);

    }

    if (effect1On && !effect2On && effect3On) {
        sourcem83.connect(filterM83);
        filterM83.disconnect(panner);
        panner.disconnect(gainNode);
        filterM83.connect(gainNode);

        // compressor.connect(gainNode);

        gainNode.connect(bitNode);
        bitNode.connect(m83Ctx.destination);

        //sinea
        volumeSinea.connect(m83Ctx.destination);

    }

    if (effect1On && !effect2On && !effect3On) {
        sourcem83.connect(filterM83);

        filterM83.disconnect(panner);
        panner.disconnect(gainNode);

        filterM83.connect(gainNode);


        gainNode.disconnect(bitNode);
        bitNode.disconnect(m83Ctx.destination);

        gainNode.connect(m83Ctx.destination);

        //sinea
        volumeSinea.connect(m83Ctx.destination);

    }

    if (effect1On && effect2On && !effect3On) {
        sourcem83.connect(filterM83);

        filterM83.connect(panner);
        panner.connect(gainNode);

        gainNode.disconnect(bitNode);
        bitNode.disconnect(m83Ctx.destination);

        gainNode.connect(m83Ctx.destination);

        //sinea

        volumeSinea.connect(m83Ctx.destination);

    }

    if (!effect1On && effect2On && !effect3On) {
        sourcem83.disconnect(filterM83);
        filterM83.disconnect(panner);

        sourcem83.connect(panner);
        panner.disconnect(gainNode);
        gainNode.disconnect(bitNode);
        bitNode.disconnect(m83Ctx.destination);

        panner.connect(gainNode);



        gainNode.connect(m83Ctx.destination);
        //sinea
        volumeSinea.connect(m83Ctx.destination);

    }






}


m83Button.addEventListener('play', audioPlayListener);
m83Button.addEventListener('pause', otherTrackPauseListener);
m83Button.addEventListener('speechPlay', speechPlayActivate);
m83Button.addEventListener('speechPause', speechPauseActivate);

function speechPlayActivate() {
    m83Button.play();
}

function speechPauseActivate() {
    m83Button.pause();
}

function otherTrackPauseListener() {
    volumeSinea.disconnect(m83Ctx.destination);
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


    //wave command
    if (userSaid(transcript, ['square', 'Square'])) {
        handleElement2.dispatchEvent(squareEvent);
    }
    if (userSaid(transcript, ['sine', 'sign', 'Sign'])) {
        handleElement2.dispatchEvent(sineEvent);
    }
    if (userSaid(transcript, ['triangle', 'Triangle'])) {
        handleElement2.dispatchEvent(triangleEvent);
    }

    if (userSaid(transcript, ['Sawtooth', 'sawtooth'])) {
        handleElement2.dispatchEvent(sawtoothEvent);

    }
    // if (userSaid(transcript, ['pain','pan'])) {
    //     console.log('pan');
    //     if (userSaid(transcript, ['right'])) {
    //         console.log('right');
    //         speechPanUpdate("right");
    //     }
    //     else if (userSaid(transcript, ['left'])) {
    //         console.log('left');
    //         speechPanUpdate("left");
    //     }
    //
    // }
    if (userSaid(transcript, ['right'])) {
                console.log('right');
                speechPanUpdate("right");
            }
    else if (userSaid(transcript, ['left'])) {
            console.log('left');
            speechPanUpdate("left");
        }





    if (userSaid(transcript, ['on', 'off'])) {
        if (!speechButtonActivated)
        speechButton = true;

    }
    // else if (userSaid(transcript, ['on'])) {
    //
    //     if (!speechButtonActivated)
    // }

    else {
        speechButton = false;
        speechButtonActivated = false;
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

function turnOnButton1() {

}


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