const openbtn=document.querySelector("#open");
const videobtn=document.querySelector("#videobtn");
const main=document.querySelector("#main");
const speedup=document.querySelector("#speedup");
const speeddown=document.querySelector("#speeddown");
const volumeup=document.querySelector("#volumeup");
const volumedown=document.querySelector("#volumedown");
const timeid=document.querySelector("#time");
const duration=document.querySelector("#duration");
const slider=document.querySelector("#slider");
const fullscreen=document.querySelector(".fullscreen");
const toast=document.querySelector(".toast");


function getinput(){
    videobtn.click();
}
function inputhandler(obj){
    
    const file=obj.target.files[0];
    const link=URL.createObjectURL(file);
    const videotag=document.createElement("video");
    videotag.setAttribute("class","mainvideo");
    videotag.setAttribute("id","mainvideoid");
    videotag.src=link;
    if(main.children.length > 0){
        //console.log(main.children);
        main.removeChild(main.children[1]);
    }
    main.appendChild(videotag);
    videotag.play();
    

    /******current playtime**************** */
    /*function showtime(){
        const time=timeformat(videotag.currentTime);
        timeid.textContent=time;
    }
    videotag.addEventListener("timeupdate",showtime);*/
    
    /**video-duration  */
    function durationtime(){
        slider.setAttribute("max",videotag.duration);
        const durationTime=timeformat(videotag.duration);
        duration.textContent=durationTime;
    }
    videotag.addEventListener("loadedmetadata",durationtime);
    startTimer();

    slider.addEventListener("click",function(){
        videotag.currentTime=slider.value;
    });
    
}
openbtn.addEventListener("click",getinput);
videobtn.addEventListener("change",inputhandler);

/**fullscreen */
fullscreen.addEventListener("click",function(){
    main.requestFullscreen();
    const videotag=document.querySelector("video");
    videotag.controls=true;
})


/***pause-btn and pause on screen click */

const pausebutton = () => {
    const videotag=document.querySelector("video");
    if(videotag.paused==false){
        videotag.pause();
        stopTimer();
        const itag=document.querySelector("i");
        itag.setAttribute("class","fa-solid fa-play");
    }
    else{
        videotag.play();
        startTimer();
        const itag=document.querySelector("i");
        itag.setAttribute("class","fa-solid fa-pause");
    }
}
const pauseelem=document.querySelector("#play-pause");
pauseelem.addEventListener("click",pausebutton);

const mainpause = () => {
    const videotag=document.querySelector("video");
    if (videotag.paused==false){
        videotag.pause();
        stopTimer();
        const itag=document.querySelector("i");
        itag.setAttribute("class","fa-solid fa-play");
    }
    else{
        videotag.play();
        startTimer();
        const itag=document.querySelector("i");
        itag.setAttribute("class","fa-solid fa-pause");
    }
}
main.addEventListener("click",mainpause);




/****speed-up,speed-down,volume-up,volume-down */ 

function speedu(){
    const vid=document.getElementById("mainvideoid");
    vid.playbackRate+=0.25;
    showToast(vid.playbackRate+"x");
}
function speedd(){
    const vid=document.getElementById("mainvideoid");
    vid.playbackRate-=0.25;
    showToast(vid.playbackRate+"x");
}
function volumeu(){
    const vid=document.getElementById("mainvideoid");
    if(vid.volume==1){
        showToast("Full volume");
    }
    vid.volume+=0.1;
    showToast("volume:"+Math.round((vid.volume)*100) + "%");
}
function volumed(){
    const vid=document.getElementById("mainvideoid");
    if(vid.volume==0){
        showToast("volume:0%");
    }
    vid.volume-=0.1;
    showToast("volume:"+Math.round((vid.volume)*100) + "%");
}


speedup.addEventListener("click",speedu);
speeddown.addEventListener("click",speedd);
volumeup.addEventListener("click",volumeu);
volumedown.addEventListener("click",volumed);

/****tosat */
function showToast(message) {
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none"
    }, 1000);
}


/****controls */

function startTimer() {
    timerObj = setInterval(function () {
        const videotag=document.querySelector("video");
        const currentPlayTime = Math.round(videotag.currentTime);
        slider.value = currentPlayTime;
        const time = timeformat(currentPlayTime);
        timeid.innerText = time;
        if (currentPlayTime == videotag.duration) {
            stopTimer();
            slider.value = 0;
            timeid.innerText = "00:00:00";
            duration.innerText = '--/--/--';
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(timerObj);
}


function timeformat(time){
    const videotag=document.querySelector("video");
    var hours=Math.floor(time/3600);
    var minutes=Math.floor((time/60) %60 );
    var seconds=Math.floor(time%60);
    
    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds

    return `${hours}:${minutes}:${seconds}`;
}

/*****keyboard support */

const body = document.querySelector("body");
body.addEventListener("keyup",function(e){
    const videotag=document.querySelector("video");
    if(e.key=="ArrowRight"){
        videotag.currentTime+=10;
    }
    else if(e.key=="ArrowLeft"){
        videotag.currentTime-=10;
    }
    else if(e.code=="Space"){
        pausebutton();
    }
    else if(e.key=="ArrowUp"){
        volumeu();
    }
    else if(e.key=="ArrowDown"){
        volumed();
    }
    else if(e.key=="d" || e.key=="D"){
        videotag.playbackRate+=0.1;
        showToast(Math.floor(videotag.playbackRate*100)/100+"X");
    }
    else if(e.key=="s" || e.key=="S"){
        videotag.playbackRate-=0.1;
        showToast(Math.floor(videotag.playbackRate*100)/100+"X");
    }
})







