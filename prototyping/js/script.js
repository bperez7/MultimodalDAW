// variable to store HTML5 audio element

//TODO
// 1. Keyboard :-)
// 2. Voice commands for buttons done :-)
// 3. Different shapes for keyboard (voice command) :-)
// 4. Live response for buttons
// 5. Size and spacing :-)
// 5. Labels :-)
// 6. Finish voice commands
// 7. Improve calibration/smoothing
// 8. Record option
// 9. Upload personal file :-)
// 10. Reset buttons?
// 11. Legend :-)
// 12. knob (don't move unless angle is above certain value)
// 13. drum pads

var sourceReverbConnected = false;
var filterReverbConnected = false;
var panReverbConnected = false;
var bitReverbConnected = false;

var sourceConnected = false;
var filterConnected = false;
var panConnected = false;
var bitConnected = false;

var wasSet1 = false;
var wasSet2 = false;
var wasSet3 = false;
var wasSet4 = false;
var wasSet5 = false;
var wasSet6 = false;
var wasSet7 = false;
var wasSet8 = false;
var wasReverbOn = false;



var CURSOR_SPEED_SCALING = .05;

var SLIDER_SPEED_SCALING = .05;
var KNOB_SPEED_SCALING = .03;

var SMOOTHING_WINDOW_SIZE = 20;

var HORIZONTAL_OFFSET = 500;

var VERTICAL_OFFSET = 900;

var POSITION_SCALING_X = 6;
var POSITION_SCALING_Y = 3;

var BOTTOM_OF_SCREEN = 900
var RIGHT_SIDE_OF_SCREEN = 1500



var VOLUME_MAX = 500;
var VOLUME_OFFSET = 200;

var MINICIRCLE1OFFSET_TOP = 290;
var MINICIRCLE1OFFSET_LEFT = 440;
var KNOB_RADIUS_OFFSET = 90;

var MINICIRCLE2OFFSET_TOP = 290;
var MINICIRCLE2OFFSET_LEFT = 740;

var MINICIRCLE3OFFSET_TOP = 290;
var MINICIRCLE3OFFSET_LEFT = 1040;


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


//music upload
function handleFiles(event) {
    var files = event.target.files;
    $("#src").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audio_player").load();
}

document.getElementById("upload").addEventListener("change", handleFiles, false);

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






//Audio Prototyping


//window.Wad = Wad;
//let m83 = new Wad({source : 'https://github.com/bperez7/outbreak/blob/master/assets/title_tune_1.wav'});


//function playTrack1() {
//    m83.play();
//}
//Play Button 1

//$('.play1').click(playTrack1());




var parameterAdjusting = false; //for only adjusting one parameter at a time
var wasPinchSlide1 = false;
var wasPinchSlide2 = false;
var wasPinchKnob1 = false;
var wasPinchKnob2 = false;
var wasPinchKnob3 = false;


var pressActivate1 = false;
var pressActivate2 = false;
var pressActivate3 = false;




var $cursor = $('.cursor');

$('h1').css('color', 'black');

var testing = true

//slider and knob booleans
var pinchSlide1 = false;
var pinchSlide2 = false;
var pinchSlide3 = false;




var nonePressed = true;

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

var wasPressingButton1 = false;
var wasPressingButton2 = false;
var wasPressingButton3 = false;

var button1StartTime = false;
var button2StartTime = false;
var button3StartTime = false;


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

var newBitValue = 0;

var reverbOn = false;


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

let buttonPress = new CustomEvent("buttonPress");





var sineAConnected = false;

var smoothArrayX = Array(SMOOTHING_WINDOW_SIZE);
var smoothArrayY = Array(SMOOTHING_WINDOW_SIZE);

for (let i = 0; i<SMOOTHING_WINDOW_SIZE; i++ ) {
    smoothArrayX[i] = 0;
    smoothArrayY[i] = 0;

}



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
var indexPosition = false;

var controller = Leap.loop(function(frame){

    screenTapGesture = false;
    keyTapGesture = false;
    if(frame.valid && frame.gestures.length > 0){
        frame.gestures.forEach(function(gesture){
            switch (gesture.type){
                case "circle":

                    break;
                case "keyTap":

                    keyTapGesture = gesture;
                    break;
                case "screenTap":

                    screenTapGesture = gesture;
                    break;
                case "swipe":

                    break;
            }
        });
    }

    var leftHand;
    var rightHand;
    var currentLevelTop;
    var pianoPressed = false;

    //TODO
    // add left hand functionality
    if (frame.hands.length > 0)
    {
        // if (frame.hands.length>1) {
        //     if (frame.hands[0].type=="left") {
        //         leftHand = frame.hands[0];
        //         rightHand = frame.hands[1];
        //     }
        //     else {
        //         leftHand = frame.hands[1];
        //         rightHand = frame.hands[0];
        //
        //     }
        //
        //     //left hand
        //
        //
        //
        //     var leftPosition = leftHand.palmPosition;
        //     var leftVelocity = leftHand.palmVelocity;
        //     var leftDirection = leftHand.direction;
        //
        //     var newLeftHandLeft = Math.round(leftPosition[0]*POSITION_SCALING);
        //     var newLeftHandTop = Math.round(leftPosition[1]*POSITION_SCALING);
        //
        //     var cursorLeftVelocityX = leftVelocity[0];
        //     var cursorLeftVelocityY = leftVelocity[1];
        //
        //     var currentLeftX = parseInt($('.cursor2').css('left'));
        //     var currentLeftY = parseInt($('.cursor2').css('top'));
        //
        //     var newLeftX = currentLeftX + cursorLeftVelocityX*CURSOR_SPEED_SCALING;
        //     var newLeftY = currentLeftY - cursorLeftVelocityY*CURSOR_SPEED_SCALING;
        //
        //
        //     //BORDER CASES
        //     if (newLeftX<0) {
        //         newLeftX = 0;
        //     }
        //     if (newLeftX> RIGHT_SIDE_OF_SCREEN) {
        //         newLeftX = RIGHT_SIDE_OF_SCREEN;
        //     }
        //     if (newLeftY<0) {
        //         newLeftY = 0;
        //     }
        //     if (newLeftY>BOTTOM_OF_SCREEN) {
        //         newLeftY = BOTTOM_OF_SCREEN;
        //     }
        //
        //     //SET position
        //     $('.cursor2').css('left', Math.round(newLeftX));
        //     $('.cursor2').css('top', Math.round(newLeftY));
        //
        //
        //     //right hand
        //     var rightPosition = rightHand.palmPosition;
        //     var rightVelocity = rightHand.palmVelocity;
        //     var rightDirection = rightHand.direction;
        //
        //     var newRightHandLeft = Math.round(rightPosition[0]*POSITION_SCALING);
        //     var newRightHandTop = Math.round(rightPosition[1]*POSITION_SCALING);
        //
        //     var cursorRightVelocityX = rightVelocity[0];
        //     var cursorRightVelocityY = rightVelocity[1];
        //
        //     var currentRightX = parseInt($('.cursor').css('left'));
        //     var currentRightY = parseInt($('.cursor').css('top'));
        //
        //     var newRightX = currentRightX + cursorRightVelocityX*CURSOR_SPEED_SCALING;
        //     var newRightY = currentRightY - cursorRightVelocityY*CURSOR_SPEED_SCALING;
        //
        //
        //     //BORDER CASES
        //     if (newRightX<0) {
        //         newRightX = 0;
        //     }
        //     if (newRightX> RIGHT_SIDE_OF_SCREEN) {
        //         newRightX = RIGHT_SIDE_OF_SCREEN;
        //     }
        //     if (newRightY<0) {
        //         newRightY = 0;
        //     }
        //     if (newRightY>BOTTOM_OF_SCREEN) {
        //         newRightY = BOTTOM_OF_SCREEN;
        //     }
        //
        //     //SET position
        //     $('.cursor').css('left', Math.round(newRightX));
        //     $('.cursor').css('top', Math.round(newRightY));
        //
        //
        //     //temporary
        //     var hand = rightHand;
        //     var position = rightPosition;
        //
        // }
       // else { // only one hand
            var twoHands = false;
            if (frame.hands.length>1) {
                twoHands = true;
                if (frame.hands[0].type=="left") {
                    leftHand = frame.hands[0];
                    rightHand = frame.hands[1];
                    leftVelocity = frame.hands[0].palmVelocity;
                    rightVelocity = frame.hands[1].palmVelocity;

                }
                else {
                    leftHand = frame.hands[1];
                    rightHand = frame.hands[0];
                    leftVelocity = frame.hands[1].palmVelocity;
                    rightVelocity = frame.hands[0].palmVelocity;
                }
            }
            var hand = frame.hands[0]

            var position = hand.palmPosition;
            var velocity = hand.palmVelocity;
            var direction = hand.direction;

        //    var newLeft = Math.round(position[0]*POSITION_SCALING);
         //   var newTop = Math.round(position[1]*POSITION_SCALING);

            var cursorVelocityX = velocity[0];
            var cursorVelocityY = velocity[1];

            var currentX = parseInt($('.cursor').css('left'));
            var currentY = parseInt($('.cursor').css('top'));

            var newX = currentX + cursorVelocityX*CURSOR_SPEED_SCALING;
            var newY = currentY - cursorVelocityY*CURSOR_SPEED_SCALING;

            smoothArrayX = ([HORIZONTAL_OFFSET + (position[0]*POSITION_SCALING_X)]).concat(smoothArrayX.slice(0,SMOOTHING_WINDOW_SIZE-1));
            smoothArrayY = ([VERTICAL_OFFSET - (position[1]*POSITION_SCALING_Y)]).concat(smoothArrayY.slice(0,SMOOTHING_WINDOW_SIZE-1))


            var newSmoothXSum = smoothArrayX.reduce(function(a,b) {return a+b});
            var newSmoothYSum = smoothArrayY.reduce(function(a,b) {return a+b});


           // newX = (newSmoothXSum/SMOOTHING_WINDOW_SIZE);
           // newY = (newSmoothYSum/SMOOTHING_WINDOW_SIZE);



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

            // rightHand = hand;
            // rightVelocity = velocity;


    //    }



        //piano level

        indexPosition = hand.indexFinger.tipPosition[1];
        // console.log(indexPosition);
        // console.log('hand');
        // console.log(hand.palmPosition[1]);


        // if (twoHands) {
        //
        //     currentLevelTop = parseInt($('.pianoLevel').css('top'));
        //     var delta_level = SLIDER_SPEED_SCALING*leftVelocity[1];
        //     var newLevelTop = currentLevelTop - delta_level;
        //
        //     if ((currentLevelTop-delta_level)<200) {
        //         newLevelTop = 200
        //     }
        //     else if ((currentLevelTop-delta_level)>700) {
        //         newLevelTop = 700;
        //     }
        //     $('.pianoLevel').css('top', newLevelTop);

            //key press logic
            if (!pianoPressed) {
                // if ((currentLevelTop<450)&&(newLevelTop>450)) {
                //     pianoPressed = true;
                //
                // }
                //if (newLevelTop>450) {
                if (indexPosition<hand.palmPosition[1]) {

                    pianoPressed =true;
                }

            }
            else { //piano pressed
                // if ((currentLevelTop>450)&&(newLevelTop<450)) {
                //     pianoPressed = false;
                // }
               // if (newLevelTop<450) {
                if (indexPosition>hand.palmPosition[1]) {
                    pianoPressed =false;
                }
            }

        // }

        //overlapping sliders
        //1st slider
        var slider1RightHand = true;
        if (overlapRect('.handle1', '.cursor')) {
            $('.handle1').css('background-color', 'blue');





            //check pinching

            if (hand.pinchStrength<.4) {
                    pinchSlide1 = false;
                }
            else {
                pinchSlide1 = true;
            }
        }

        if (pinchSlide1 && (!otherControlOn(1))) {


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

                $('.cursor').css('top', newTop + 15);  //lock onto slider
                $('.cursor').css('left', 90);


                handleElement1.dispatchEvent(volumeEvent);

                wasPinchSlide1 = true;
                parameterAdjusting = true;

        }

        if (!pinchSlide1 && wasPinchSlide1) {
            parameterAdjusting = false;
        }

        if (!overlapRect('.handle1', '.cursor')) {
            $('.handle1').css('background-color', 'red');


        }



        //slider 2

        var slider2RightHand = true;
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

        if (pinchSlide2 && (!otherControlOn(2))) {

            var newTop;
            parameterAdjusting = true;
            wasPinchSlide2 = true;

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

                $('.cursor').css('top', newTop + 15);  //lock onto slider
                $('.cursor').css('left', 215);




        }

        if (!pinchSlide2 && wasPinchSlide2) {
            parameterAdjusting = false;
        }

        if (!overlapRect('.handle2', '.cursor') && !pinchSlide2) {
            $('.handle2').css('background-color', 'red');
        }




//slider 3

        // if (overlapRect('.handle3', '.cursor')) {
        //     $('.handle3').css('background-color', 'blue');
        //
        //
        //     //check pinching
        //
        //     if (hand.pinchStrength<.4) {
        //             pinchSlide3 = false;
        //         }
        //     else {
        //         pinchSlide3 = true;
        //     }
        // }
        //
        // if (pinchSlide3) {
        //
        //
        //     var newTop;
        //
        //     if (velocity[1] > 0) {
        //         var currentTop = parseInt($('.handle3').css('top'));
        //         var delta_y = velocity[1]*SLIDER_SPEED_SCALING;
        //
        //         //newTop = currentTop+delta_y;
        //         if (currentTop<205){//upper limit
        //             newTop = 205;
        //         }
        //         else {
        //             newTop = currentTop-delta_y;
        //         }
        //
        //     }
        //     else {
        //         var currentTop = parseInt($('.handle3').css('top'))
        //         var delta_y = velocity[1]*SLIDER_SPEED_SCALING;
        //
        //         if (currentTop>650) {//height of bar, limit
        //             newTop = 650;
        //         }
        //         else {
        //             newTop = currentTop-delta_y;
        //         }
        //     }
        //
        //         //check release
        //         if (hand.pinchStrength<.4) {
        //             pinchSlide3 = false
        //         }
        //
        //         $('.handle3').css('background-color', 'blue');
        //
        //         $('.handle3').css('top', newTop);
        //
        // }
        //
        // if (!overlapRect('.handle3', '.cursor') && !pinchSlide3) {
        //     $('.handle3').css('background-color', 'red');
        // }

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





        if (pinchKnob1 && !otherControlOn(3)) {

            //get angle of rotation
            wasPinchKnob1 = true;
            parameterAdjusting = true;

            var angleLimit = 3.14/3
            var handAngle = hand.roll();

            if (handAngle>.2) {

                if (handAngle<-angleLimit) {
                    knobAngle1=KNOB_SPEED_SCALING*handAngle;
                }
                else {
                    knobAngle1+=KNOB_SPEED_SCALING*(-angleLimit);
                }

            }
            else if (handAngle<-.5) {


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

            $('.cursor').css('top', MINICIRCLE1OFFSET_TOP);  //lock onto slider
            $('.cursor').css('left', MINICIRCLE1OFFSET_LEFT);

            if (hand.pinchStrength<.3) { //release
                pinchKnob1 = false;
            }



        }

        if (!pinchKnob1 && wasPinchKnob1) {
            parameterAdjusting = false;
        }


        //normal
        if (!pinchKnob1&& !overlapRect('.circle1', '.cursor'))
                { $('.circle1').css('opacity', 1);
                }


        //overlapping Button

        if (overlapRect('.knob1OnButton', '.cursor')) {

            $('.knob1OnButton').css('opacity',.4)

            if (!effect1On) {
                //if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton || pressActivate1) {
                if (speechButton||pressActivate1) {
                    effect1On = true;
                    knob1Button.dispatchEvent(buttonPress);
                    $('.knob1OnButton').css('background-color', 'magenta');
                    speechButton = false;
                    speechButtonActivated = true;
                    pressActivate1 = false;
                    wasPressingButton1 = false;

                }
                //timed press
                if (!wasPressingButton1) {
                    if (indexPosition<position[1]) {
                        wasPressingButton1 = true;
                        button1StartTime = new Date();
                    }
                }
                // pressing
                else {
                    if (indexPosition<position[1]) {
                        //milliseconds
                        console.log(new Date() - button1StartTime)
                        if ((new Date() - button1StartTime)>(1000)) {
                            pressActivate1 = true;
                            wasPressingButton1 = false;
                        }
                    }
                }



            }
            //effect 1 already on
            else {
                //if ((keyTapGesture!=false) || (screenTapGesture!=false || speechButton||pressActivate1)) {
                if (speechButton||pressActivate1) {
                    effect1On = false;
                    knob1Button.dispatchEvent(buttonPress);
                    $('.knob1OnButton').css('background-color', 'cyan');
                    speechButton = false;
                    speechButtonActivated = true;
                    wasPressingButton1 = false;
                    pressActivate1 = false;

                }

                if (!wasPressingButton1) {
                    if (indexPosition<position[1]) {
                        wasPressingButton1 = true;
                        button1StartTime = new Date();
                    }
                }
                // pressing
                else {
                    if (indexPosition<position[1]) {
                        //milliseconds
                        console.log(new Date() - button1StartTime)
                        if ((new Date() - button1StartTime)>(1000)) {
                            pressActivate1 = true;
                            wasPressingButton1 = false;
                        }
                    }
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





        if (pinchKnob2 && !otherControlOn(4)) {

            //get angle of rotation

            parameterAdjusting = true;
            wasPinchKnob2 = true;

            var angleLimit = 3.14/3
            var handAngle = hand.roll();

            if (handAngle>.2) {

                if (handAngle<-angleLimit) {
                    knobAngle2=KNOB_SPEED_SCALING*handAngle;
                }
                else {
                    knobAngle2+=KNOB_SPEED_SCALING*(-angleLimit);
                }




            }
            else if (handAngle<-.5) {

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

            $('.cursor').css('top', MINICIRCLE2OFFSET_TOP);  //lock onto slider
            $('.cursor').css('left', MINICIRCLE2OFFSET_LEFT);

            if (hand.pinchStrength<.3) { //release
                pinchKnob2 = false;
                knob2Highlight = false;


            }





        }

        if (!pinchKnob2 && wasPinchKnob2) {
            parameterAdjusting = false;
        }

        //normal
        if (!pinchKnob2&& !overlapRect('.circle2', '.cursor'))
                { $('.circle2').css('opacity', 1);
                }




        //overlapping Button

        if (overlapRect('.knob2OnButton', '.cursor')) {

            $('.knob2OnButton').css('opacity',.4)

            if (!effect2On) {
                //if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton||pressActivate2) {
                if (speechButton||pressActivate2) {
                    effect2On = true;
                    knob2Button.dispatchEvent(buttonPress);
                    $('.knob2OnButton').css('background-color', 'magenta');
                    speechButtonActivated = true;
                    speechButton = false;
                    pressActivate2 = false;

                }

                if (!wasPressingButton2) {
                    if (indexPosition<position[1]) {
                        wasPressingButton2 = true;
                        button2StartTime = new Date();
                    }
                }
                // pressing
                else {
                    if (indexPosition<position[1]) {
                        //milliseconds
                        //console.log(new Date() - button2StartTime)
                        if ((new Date() - button2StartTime)>(1000)) {
                            pressActivate2 = true;
                            wasPressingButton2 = false;
                        }
                    }
                }

            }
            //effect 2 already on
            else {
                //if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton||pressActivate2) {
                 if (speechButton||pressActivate2) {
                    effect2On = false;

                    knob2Button.dispatchEvent(buttonPress);
                    $('.knob2OnButton').css('background-color', 'cyan');
                    speechButtonActivated = true;
                    speechButton = false;
                    pressActivate2 = false;

                }

                if (!wasPressingButton2) {
                    if (indexPosition<position[1]) {
                        wasPressingButton2 = true;
                        button2StartTime = new Date();
                    }
                }
                // pressing
                else {
                    if (indexPosition<position[1]) {
                        //milliseconds
                        //console.log(new Date() - button2StartTime)
                        if ((new Date() - button2StartTime)>(1000)) {
                            pressActivate2 = true;
                            wasPressingButton2 = false;
                        }
                    }
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





        if (pinchKnob3 && !otherControlOn(5)) {

            //get angle of rotation

            wasPinchKnob3 = true;
            parameterAdjusting = true;

            var angleLimit = 3.14/3
            var handAngle = hand.roll();

            if (handAngle>.2) {

                if (handAngle<-angleLimit) {
                    knobAngle3=KNOB_SPEED_SCALING*handAngle;
                }
                else {
                    knobAngle3+=KNOB_SPEED_SCALING*(-angleLimit);
                }



            }
            else if (handAngle<-.5) {

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

            $('.cursor').css('top', MINICIRCLE3OFFSET_TOP);  //lock onto slider
            $('.cursor').css('left', MINICIRCLE3OFFSET_LEFT);

            updateBitValue(knobAngle3);

            if (hand.pinchStrength<.3) { //release
                pinchKnob3 = false;


            }



        }

        if (!pinchKnob3 && wasPinchKnob3) {
            parameterAdjusting = false;
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
                //if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton || pressActivate3) {
                if (speechButton || pressActivate3) {
                    effect3On = true;
                    knob3Button.dispatchEvent(buttonPress);
                    $('.knob3OnButton').css('background-color', 'magenta');
                    speechButtonActivated = true;
                    speechButton = false;
                    pressActivate3 = false;

                }

                if (!wasPressingButton3) {
                    if (indexPosition<position[1]) {
                        wasPressingButton3 = true;
                        button3StartTime = new Date();
                    }
                }
                // pressing
                else {
                    if (indexPosition<position[1]) {
                        //milliseconds
                        //console.log(new Date() - button2StartTime)
                        if ((new Date() - button3StartTime)>(1000)) {
                            pressActivate3 = true;
                            wasPressingButton3 = false;
                        }
                    }
                }

            }
            //effect 3 already on
            else {
                //if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton || pressActivate3) {
                if (speechButton || pressActivate3) {
                    effect3On = false;
                    knob3Button.dispatchEvent(buttonPress);
                    $('.knob3OnButton').css('background-color', 'cyan');
                    speechButtonActivated = true;
                    speechButton = false;
                    pressActivate3 = false;

                }

                if (!wasPressingButton3) {
                    if (indexPosition<position[1]) {
                        wasPressingButton3 = true;
                        button3StartTime = new Date();
                    }
                }
                // pressing
                else {
                    if (indexPosition<position[1]) {
                        //milliseconds
                        //console.log(new Date() - button2StartTime)
                        if ((new Date() - button3StartTime)>(1000)) {
                            pressActivate3 = true;
                            wasPressingButton3 = false;
                        }
                    }
                }
            }
        }
        else {
            $('.knob3OnButton').css('opacity',1)
        }





        //Keyboard logic!


        var blackPressed = false;
        nonePressed = true;
        allSharpKeys.forEach((key, index)=> {
            if (overlapRect('.cursor', '.' + key.getAttribute('id')) && pianoPressed) {
                $('.' + key.getAttribute('id')).css('opacity', .5);
                nonePressed = false;

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
                if (overlapRect('.cursor', '.' + key.getAttribute('id')) && pianoPressed) {
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







        //Reverb button

        if (overlapRect('.reverbButton', '.cursor')) {

            $('.reverbButton').css('opacity',.4)

            if (!reverbOn) {
                if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton) {
                    reverbOn = true;
                    document.getElementById('reverbButton').dispatchEvent(buttonPress);
                    $('.reverbButton').css('background-color', 'magenta');
                    speechButtonActivated = true;
                    speechButton = false;

                }

            }
            //effect reverb already on
            else {
                if ((keyTapGesture!=false) || (screenTapGesture!=false) || speechButton) {
                    reverbOn = false;
                   document.getElementById('reverbButton').dispatchEvent(buttonPress);
                    $('.reverbButton').css('background-color', 'forestgreen');
                    speechButtonActivated = true;
                    speechButton = false;
                }
            }
        }
        else {
            $('.reverbButton').css('opacity',1)
        }







    }
});




function otherControlOn(index) {
    if (index==1) {
        return pinchSlide2||pinchKnob1||pinchKnob2||pinchKnob3;
    }
    else if (index==2)
        return pinchSlide1||pinchKnob1||pinchKnob2||pinchKnob3;
    else if (index==3)
        return pinchSlide1||pinchSlide2||pinchKnob2||pinchKnob3;
    else if (index==4)
        return pinchSlide1||pinchSlide2||pinchKnob1||pinchKnob3;
    else if (index==5)
        return pinchSlide1||pinchSlide2||pinchKnob1||pinchKnob2;
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
    document.getElementById('knob1label').innerHTML = "Filter: " + String(Math.round(newCutoffFreq));

}

function newFilterValue() {
    return newCutoffFreq;
}

function updatePanValue() {
    newPanValue = -Math.cos((3.14/2)+angleValue(2));
    document.getElementById('knob2label').innerHTML = "Pan: " + String(newPanValue.toFixed(2));
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

function updateBitValue() {

    newBitValue = Math.round((8/3)*knobAngle3+3);
    document.getElementById('knob3label').innerHTML = "Bit: " + String(newBitValue);
}

function currentBitValue() {
    return newBitValue;
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

function reverbEffect(audioContext) {
    var convolver = audioContext.createConvolver(),
        noiseBuffer = audioContext.createBuffer(2, 0.5 * audioContext.sampleRate, audioContext.sampleRate),
        left = noiseBuffer.getChannelData(0),
        right = noiseBuffer.getChannelData(1);
    for (var i = 0; i < noiseBuffer.length; i++) {
        left[i] = Math.random() * 2 - 1;
        right[i] = Math.random() * 2 - 1;
    }
    convolver.buffer = noiseBuffer;
    return convolver;
}


var sineaOn = false;
var sinea = false;

var gainNode;
var filterM83;
var pannerOptions;
var panner;
var compressor;
var bitNode;
var reverbNode;


var sourcem83 = false;
sineButton = document.getElementById('playButton1');
var m83Ctx = false;
m83Button = document.getElementById("audio_player");
m83Button.crossOrigin = "anonymous";



var sinea;
var volumeSinea;





function audioPlayListener() {


    if (m83Ctx==false) {console.log('path');
        m83Ctx = new (window.AudioContext || window.webkitAudioContext)();}

    if (!sourcem83) {

        sourcem83 = m83Ctx.createMediaElementSource(m83Button);

        gainNode = m83Ctx.createGain();




        filterM83 = m83Ctx.createBiquadFilter();
        pannerOptions = { pan: 0 };
        panner = new StereoPannerNode(m83Ctx, pannerOptions);
        compressor = m83Ctx.createDynamicsCompressor();



        sinea = m83Ctx.createOscillator();
        volumeSinea = m83Ctx.createGain();

        volumeSinea.gain.value = .7;
        volumeSinea.connect(m83Ctx.destination);
        sinea.frequency.value = 440;
        sinea.type = "sine";


        sinea.connect(volumeSinea);
        sinea.start();

        bitNode = bitCrusherEffect(m83Ctx, bitValue());
        reverbNode = reverbEffect(m83Ctx);
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

    //key pressing logic
    if (nonePressed) {
        sineAConnected = false;
        volumeSinea.disconnect(m83Ctx.destination);
    }

    // Create a gain node

    compressor.threshold.value = -50;
    compressor.knee.value = 40;

    filterM83.frequency.value = 10000;

    handleElement1.addEventListener('volumeChange', ()=> {

        gainNode.gain.value = newVolumeValue();
    })

    handleElement2.addEventListener('compressionChange', ()=> {
        //console.log(newCompressionReductionValue);
        //compressor.threshold.value = newCompressionReductionValue;
    })




    handleElement2.addEventListener('volume2Change', ()=> {

        volumeSinea.gain.value = newVolume2Value();
        //compressor.threshold.value = newCompressionReductionValue;
    })


    //wave events

    handleElement2.addEventListener('sineEvent', ()=> {

        sinea.type = 'sine';
        //compressor.threshold.value = newCompressionReductionValue;
    })
    handleElement2.addEventListener('squareEvent', ()=> {

        sinea.type = 'square';
        //compressor.threshold.value = newCompressionReductionValue;
    })

    handleElement2.addEventListener('sawtoothEvent', ()=> {

        sinea.type = 'sawtooth';
        //compressor.threshold.value = newCompressionReductionValue;
    })

    handleElement2.addEventListener('triangleEvent', ()=> {

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

        bitNode.bits = bitValue();
    });

    allNormalKeys.forEach((key)=> {
        key.addEventListener('keyPress', () => {

            sinea.frequency.value = frequencyDict[key.getAttribute('id')];
            volumeSinea.connect(m83Ctx.destination);
            sineAConnected = true;
        })
    });
    allSharpKeys.forEach((key)=>{
        key.addEventListener('keyPress', ()=>{

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


    //button presses
    knob1Button.addEventListener('buttonPress', ()=>{

        connectLogic();
    })

    knob2Button.addEventListener('buttonPress', ()=>{
        console.log('pressed 2');
        connectLogic();
    })
    knob3Button.addEventListener('buttonPress', ()=>{

        connectLogic();
    })

    document.getElementById('reverbButton').addEventListener('buttonPress', ()=>{

        connectLogic();
    })





   // sourcem83.connect(gainNode);
    // filterM83.connect(panner);
    // panner.connect(gainNode);
    // // compressor.connect(gainNode);
    //
    // gainNode.connect(bitNode);
    // bitNode.connect(m83Ctx.destination);

    connectLogic();
    //sinea
    //volumeSinea.connect(m83Ctx.destination);


}


function connectLogic() {

    if (wasSet1) {
        wasSet1 = false;
        if(!wasReverbOn) {
            bitNode.disconnect(gainNode);
        }
    }
    if (wasSet2) {
        wasSet2 = false;
        sourcem83.disconnect(panner);
       // panner.disconnect(bitNode);
        if(!wasReverbOn) {
            bitNode.disconnect(gainNode);
        }

    }

    if (wasSet3) {
        wasSet3 = false;
        sourcem83.disconnect(bitNode);

        if(!wasReverbOn) {
            bitNode.disconnect(gainNode);
        }
        else {
            bitNode.disconnect(reverbNode);
        }
    }

    if(wasSet4) {
        wasSet4 = false;

        if(!wasReverbOn) {
            sourcem83.disconnect(gainNode);
        }
        else {
            sourcem83.disconnect(reverbNode);
        }
    }

    if(wasSet5) {
        wasSet5 =false;
        filterM83.disconnect(bitNode);
        if(!wasReverbOn) {
            bitNode.disconnect(gainNode);
        }
        else {
            bitNode.disconnect(reverbNode);
        }
    }

    if(wasSet6) {
        wasSet6 = false;

        if(!wasReverbOn) {
            filterM83.disconnect(gainNode);
        }
        else {
            filterM83.disconnect(reverbNode);
        }
    }

    if(wasSet7) {
        wasSet7 = false;

        if(!wasReverbOn) {
            panner.disconnect(gainNode);
        }
        else{
            panner.disconnect(reverbNode);
        }

    }
    if (wasSet8) {
        wasSet8 = false;
        sourcem83.disconnect(panner);


        if(!wasReverbOn) {
            panner.disconnect(gainNode);
        }
        else {
            panner.disconnect(reverbNode);
        }
    }




    sourcem83.connect(filterM83);
    filterM83.connect(panner);
    panner.connect(bitNode);
    bitNode.connect(reverbNode);
    reverbNode.connect(gainNode);
    // compressor.connect(gainNode);


    gainNode.connect(m83Ctx.destination);

    if (effect1On && effect2On && effect3On) { //set 1
        // sourcem83.connect(filterM83);
        // filterM83.connect(panner);
        // panner.connect(gainNode);
        // compressor.connect(gainNode);
        //
        // gainNode.connect(bitNode);
        //bitNode.connect(m83Ctx.destination);
        wasReverbOn = true;
        if (!reverbOn) {
           reverbNode.disconnect(gainNode)
           bitNode.disconnect(reverbNode);
            //reverbNode.connect(m83Ctx.destination);
            bitNode.connect(gainNode);
            wasReverbOn = false;
        }

        wasSet1 = true;

        //sinea
        if (sineAConnected)
        volumeSinea.connect(m83Ctx.destination);

    }

    if (!effect1On && effect2On && effect3On) { //set 2
        sourcem83.disconnect(filterM83);
        filterM83.disconnect(panner);
        sourcem83.connect(panner);

        panner.connect(bitNode);
        // compressor.connect(gainNode);


       // bitNode.connect(m83Ctx.destination);
        wasReverbOn = true;
        if (!reverbOn) {
            reverbNode.disconnect(gainNode)
            bitNode.disconnect(reverbNode);
            //reverbNode.connect(m83Ctx.destination);
            bitNode.connect(gainNode);
            wasReverbOn = false;
        }

        wasSet2 = true;
        //sinea
        if (sineAConnected)
        volumeSinea.connect(m83Ctx.destination);

    }

    if (!effect1On && !effect2On && effect3On) { //set 3
        sourcem83.disconnect(filterM83);
        filterM83.disconnect(panner);
        sourcem83.connect(bitNode);

        //bitNode.connect(bitNode);
      //  bitNode.connect(m83Ctx.destination);
        wasReverbOn = true;
        wasSet3 = true;
        if (!reverbOn) {
            bitNode.disconnect(reverbNode)
            reverbNode.disconnect(gainNode);
            bitNode.connect(gainNode);
            wasReverbOn = false;
        }


        //sinea
        if (sineAConnected)
        volumeSinea.connect(m83Ctx.destination);

    }

    if (!effect1On && !effect2On && !effect3On) { //set 4
        console.log('all off');
        sourcem83.disconnect(filterM83);
        filterM83.disconnect(panner);
        panner.disconnect(bitNode);
        bitNode.disconnect(reverbNode);
        sourcem83.connect(reverbNode);
        //bitNode.disconnect(m83Ctx.destination);

     //   sourcem83.connect(reverbNode);
       // sourcem83.connect(gainNode);
      //  reverbNode.connect(gainNode);
       // gainNode.connect(m83Ctx.destination);

        wasReverbOn = true;
        wasSet4 = true;
        if (!reverbOn) {
            reverbNode.disconnect(gainNode);
            sourcem83.disconnect(reverbNode);
            sourcem83.connect(gainNode);
            wasReverbOn = false;
            //gainNode.connect(m83Ctx.destination);
        }


        if (sineAConnected)
        volumeSinea.connect(m83Ctx.destination);

    }

    if (effect1On && !effect2On && effect3On) { //set 5
       // sourcem83.connect(filterM83);
        filterM83.disconnect(panner);
        panner.disconnect(bitNode);
        filterM83.connect(bitNode);

        // compressor.connect(gainNode);

        //gainNode.connect(bitNode);
        //bitNode.connect(m83Ctx.destination);
        wasReverbOn = true;
        wasSet5 = true;
        if (!reverbOn) {
            bitNode.disconnect(reverbNode)
            reverbNode.disconnect(gainNode);
            bitNode.connect(gainNode);
            wasReverbOn = false
        }

        //sinea
        if (sineAConnected)
        volumeSinea.connect(m83Ctx.destination);

    }

    if (effect1On && !effect2On && !effect3On) { //set 6

        filterM83.disconnect(panner);
        //sourcem83.connect(filterM83);

       // console.log('connection?')
        panner.disconnect(bitNode);
        bitNode.disconnect(reverbNode);
      //  console.log(filterM83.frequency.value);
        filterM83.connect(reverbNode);

        wasReverbOn = true;
        wasSet6 = true;


       // bitNode.disconnect(m83Ctx.destination);

     //   gainNode.connect(m83Ctx.destination);

        if (!reverbOn) {
            filterM83.disconnect(reverbNode);
            reverbNode.disconnect(gainNode);
            filterM83.connect(gainNode);
            wasReverbOn = false;
        }

        //sinea
        if (sineAConnected)
        volumeSinea.connect(m83Ctx.destination);

    }

    if (effect1On && effect2On && !effect3On) { //set 7
        sourcem83.connect(filterM83);

        filterM83.connect(panner);
        panner.disconnect(bitNode);
        bitNode.disconnect(reverbNode);
        panner.connect(reverbNode);



        wasReverbOn = true;
        wasSet7 = true;
      //  gainNode.connect(m83Ctx.destination);

        if (!reverbOn) {
            panner.disconnect(reverbNode);
            reverbNode.disconnect(gainNode);
            panner.connect(gainNode);
            wasReverbOn = false;
        }


        //sinea
        if (sineAConnected)
        volumeSinea.connect(m83Ctx.destination);

    }

    if (!effect1On && effect2On && !effect3On) { //set 8
        sourcem83.disconnect(filterM83);
        filterM83.disconnect(panner);

        sourcem83.connect(panner);
        panner.disconnect(bitNode);
        bitNode.disconnect(reverbNode);
        panner.connect(reverbNode);

        //panner.connect(gainNode);


        wasReverbOn = true;
        wasSet8 = true;
        //gainNode.connect(m83Ctx.destination);

        if (!reverbOn) {
            panner.disconnect(reverbNode);
            reverbNode.disconnect(gainNode);
            panner.connect(gainNode);
            wasReverbOn = false;
        }

        //sinea
        if (sineAConnected)
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
    if (sineAConnected)
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

    //        m83Button.play();
        m83Button.dispatchEvent(speechPlayEvent);

    }

    if (userSaid(transcript, ['pause'])) {

        m83Button.dispatchEvent(speechPauseEvent);
    }

    if (userSaid(transcript, ['volume'])) {

        if (userSaid(transcript, ['up'])) {

            speechVolumeUpdate("up");
        }
        else if (userSaid(transcript, ['down'])) {

            speechVolumeUpdate("down");
        }

    }

    if (userSaid(transcript, ['filter'])) {

        if (userSaid(transcript, ['up'])) {

            speechFilterUpdate("up");
        }
        else if (userSaid(transcript, ['down'])) {

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

                speechPanUpdate("right");
            }
    else if (userSaid(transcript, ['left'])) {

            speechPanUpdate("left");
        }

//bitcrusher
    if (userSaid(transcript, ['crush', 'bit', '3', 'three', 'third'])) {
        if (userSaid(transcript, ['up'])) {
            speechBitUpdate( 'up');

        }
        if (userSaid(transcript, ['down'])) {
            speechBitUpdate( 'down');

        }
        //        m83Button.play();



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


    updateVolume(volumeDelta);

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

function speechBitUpdate(direction = "up", scale = .4) {
    //get angle of rotation


    if (direction=="up") {

        knobAngle3+=scale;

    }
    else if (direction = "down") {

        knobAngle3-=scale;

    }


    //update pan value
    updateBitValue(knobAngle3);

    knobElement3.dispatchEvent(bitEvent);

    $('.miniCircle3').css('left', MINICIRCLE3OFFSET_LEFT + Math.round(KNOB_RADIUS_OFFSET*Math.cos(knobAngle3 - 3.14/2)));
    $('.miniCircle3').css('top', MINICIRCLE3OFFSET_TOP + Math.round(KNOB_RADIUS_OFFSET*Math.sin(knobAngle3 - 3.14/2)));
}