const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');




// Play & Pause ----------------------------------- //
function showPlayIcon(){
    playBtn.classList.replace('fa-circle-pause','fa-circle-play');
    playBtn.setAttribute('title','Play');
}

function togglePlay(){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-circle-play','fa-circle-pause');
        playBtn.setAttribute('title','Pause');

    } else{
        video.pause();
        showPlayIcon();
    }
}

// When video ends, show play button
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //
function formatTime(time){
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);
    seconds = seconds>9 ? seconds : `0${seconds}`; 
    return `${minutes}:${seconds}`;
}

function updateProgress(){
    progressBar.style.width = `${video.currentTime / video.duration * 100}%`;
    duration.textContent = formatTime(video.duration);
    currentTime.textContent = formatTime(video.currentTime) ;
    
}

function setProgress(event){
    const newTime = event.offsetX/progressRange.offsetWidth; 
    progressBar.style.width = `${newTime*100}%`;
    video.currentTime = newTime * video.duration;
}


// Change Playback Speed -------------------- //

function changeSpeed(){
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //
let fullscreen = false;

function toggleFullScreen(){
    if(fullscreen){
        closeFullscreen(player);
    } else{
        openFullscreen(player);
    }
    fullscreen = !fullscreen;
}
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}
  
/* Close fullscreen */
function closeFullscreen(elem) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}

// Event Listeners
playBtn.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay',updateProgress);
progressRange.addEventListener('click',setProgress);
speed.addEventListener('change',changeSpeed);
fullscreenBtn.addEventListener('click',toggleFullScreen)