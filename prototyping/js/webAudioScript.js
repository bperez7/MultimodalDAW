

// for cross browser
/*const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// load some sound
const audioElement = document.querySelector('audio');
const track = audioCtx.createMediaElementSource(audioElement);

const playButton = document.querySelector('.tape-controls-play');

// play pause audio
playButton.addEventListener('click', function() {
	
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	
	if (this.dataset.playing === 'false') {
		audioElement.play();
		this.dataset.playing = 'true';
	// if track is playing pause it
	} else if (this.dataset.playing === 'true') {
		audioElement.pause();
		this.dataset.playing = 'false';
	}
	
	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
	
}, false);

// if track ends
audioElement.addEventListener('ended', () => {
	playButton.dataset.playing = 'false';
	playButton.setAttribute( "aria-checked", "false" );
}, false);

// volume
const gainNode = audioCtx.createGain();

gainNode.gain.value = 1;

//const volumeControl = document.querySelector('[data-action="volume"]');
//volumeControl.addEventListener('input', function() {
//	gainNode.gain.value = this.value;
//}, false);


/*
// panning
const pannerOptions = {pan: 0};
const panner = new StereoPannerNode(audioCtx, pannerOptions);

const pannerControl = document.querySelector('[data-action="panner"]');
pannerControl.addEventListener('input', function() {
	panner.pan.value = this.value;	
}, false);

// connect our graph
track.connect(gainNode).connect(panner).connect(audioCtx.destination);

const powerButton = document.querySelector('.control-power');

powerButton.addEventListener('click', function() {
	if (this.dataset.power === 'on') {
		audioCtx.suspend();
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		audioCtx.resume();
		this.dataset.power = 'on';
	}
	this.setAttribute( "aria-checked", state ? "false" : "true" );
	console.log(audioCtx.state);
}, false);
*/





/*
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var myAudio = document.getElementById('audio_player');
console.log(myAudio)
//var pre = document.querySelector('pre');
//var myScript = document.querySelector('script');

//pre.innerHTML = myScript.innerHTML;

// Create a MediaElementAudioSourceNode
// Feed the HTMLMediaElement into it

myAudio.addEventListener('play', () => {
var source = audioCtx.createMediaElementSource(myAudio);

// Create a gain node
var gainNode = audioCtx.createGain();

// Create variables to store mouse pointer Y coordinate
// and HEIGHT of screen
var CurY;
var HEIGHT = window.innerHeight;

// Get new mouse pointer coordinates when mouse is moved
// then set new gain value

document.onmousemove = updatePage;

function updatePage(e) {
    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

    gainNode.gain.value = CurY/HEIGHT;
}

// connect the AudioBufferSourceNode to the gainNode
// and the gainNode to the destination, so we can play the
// music and adjust the volume using the mouse cursor
source.connect(gainNode);
gainNode.connect(audioCtx.destination);
});
*/
/*

const ctx = new(window.AudioContext || window.webkitAudioContext)();

const audioElement = document.querySelector('audio');

const mediaElement = ctx.createMediaElementSource(audioElement);

//const filter = ctx.createBiquadFilter();

//mediaElement.connect(filter);
//filter.connect(ctx.destination);
mediaElement.connect(ctx.destination);
//m83Button = document.getElementById('playButton1'); 
//m83audio = document.getElementById('m83');

*/
/*m83Button.addEventListener('click', () => {

	var audioCtx = new (window.AudioContext || window.webkitAudioContext)

	var source = audioCtx.createMediaElementSource(m83audio);
	var volume = audioCtx.createGain();
	volume.connect(audioCtx.destination);
	
	//source.start();
	source.connect(volume);

	volume.gain.value=0.2;

	volume.connect(audioCtx.destination);

});
*/

var sineaOn = false;
var sinea = false;

var sourcem83 = false;
sineButton = document.getElementById('playButton1');
m83Ctx = false;
m83Button = document.querySelector('audio');
m83Button.crossOrigin = "anonymous";

//var handle1= document.getElementById('slider1');


m83Button.addEventListener('play', ()=> {
	if (!m83Ctx) {var m83Ctx = new (window.AudioContext || window.webkitAudioContext)();}

	if (!sourcem83) {
		sourcem83 = m83Ctx.createMediaElementSource(m83Button);
	}


	// Create a gain node
	var gainNode = m83Ctx.createGain();



	var filterm83 = m83Ctx.createBiquadFilter();
	var cutoffm83 = 300 + angleValue(1)*300;
	console.log(cutoffm83);
    filterm83.frequency.value = cutoffm83;
/*
    handle1.addEventListener('volumeChange', ()=> {
    	console.log(newVolumeValue());
		gainNode.volume.value = newVolumeValue();
	})
*/

    //sourcem83.connect(filterm83);
	//filterm83.connect(gainNode);

	sourcem83.connect(gainNode);
	gainNode.connect(m83Ctx.destination);

})

sineButton.addEventListener('click', () => {

	if (!sineaOn) {
		sineaOn = true;
	
	
		var audioCtx = new (window.AudioContext || window.webkitAudioContext)
		// we create the gain module, named as volume, and connect it to our
		var volume = audioCtx.createGain();
		volume.connect(audioCtx.destination);
		//these sines are the same, exept for the last connect statement.
		//Now they are connected to the volume gain module and not to the au
		sinea = audioCtx.createOscillator();
		sinea.frequency.value = 440;
		sinea.type = "sine";
		filterA = audioCtx.createBiquadFilter();

		var cutoffA = 300 + angleValue(1)*300;
		filterA.frequency.value = cutoffA;
		sinea.connect(filterA);
		
		sinea.start();
		filterA.connect(audioCtx.destination);
		/*var sineb = audioCtx.createOscillator();
		sineb.frequency.value = 523.25;
		sineb.type = "sine";
		sineb.start();
		sineb.connect(volume);
		var sinec = audioCtx.createOscillator();
		sinec.frequency.value = 698.46;
		sinec.type = "sine";
		sinec.start();
		sinec.connect(volume);

	*/

		volume.gain.value=0.2;

	}

	else {
		sineaOn = false;
		sinea.stop();
		console.log('pause');
	}

})


sineButton.addEventListener('click', () => {

	if (!sineaOn) {
		sineaOn = true;
	
	
		var audioCtx = new (window.AudioContext || window.webkitAudioContext)
		// we create the gain module, named as volume, and connect it to our
		var volume = audioCtx.createGain();
		volume.connect(audioCtx.destination);
		//these sines are the same, exept for the last connect statement.
		//Now they are connected to the volume gain module and not to the au
		sinea = audioCtx.createOscillator();
		sinea.frequency.value = 440;
		sinea.type = "sine";
		filterA = audioCtx.createBiquadFilter();

		var cutoffA = 300 + angleValue(1)*300;
		filterA.frequency.value = cutoffA;
		sinea.connect(filterA);
		
		sinea.start();
		filterA.connect(audioCtx.destination);
		/*var sineb = audioCtx.createOscillator();
		sineb.frequency.value = 523.25;
		sineb.type = "sine";
		sineb.start();
		sineb.connect(volume);
		var sinec = audioCtx.createOscillator();
		sinec.frequency.value = 698.46;
		sinec.type = "sine";
		sinec.start();
		sinec.connect(volume);

	*/

		volume.gain.value=0.2;

	}

	else {
		sineaOn = false;
		sinea.stop();
		console.log('pause');
	}

})







