console.log("Welcome to Spotify");

// initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

//array in javascript
let songs = [
    {songName:" Maan Meri Jaan" , filePath:"songs/1.mp3" , coverPath:"covers/cover1.jpg"},
    {songName:" Tere Vaste" , filePath:"songs/2.mp3" , coverPath:"covers/cover2.jpg"},
    {songName:" Irradey" , filePath:"songs/3.mp3" , coverPath:"covers/cover3.jpg"},
    {songName:" Aaj Din Chadheya" , filePath:"songs/4.mp3" , coverPath:"covers/cover4.jpg"},
    {songName:" Ik Ladki Ko Dekha To Aise Laga" , filePath:"songs/5.mp3" , coverPath:"covers/cover5.jpg"},

];

songItems.forEach((element, i)=>{
    console.log(element ,i);
   
    element.getElementsByTagName("img")[0].src =songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

});

// audioelement.play()

// handle play/pause button
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});
 //listen to events
audioElement.addEventListener('timeupdate',() => {
    console.log('timeupdate');
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressbar.value = progress;


});

myProgressbar.addEventListener('input',() => {
    audioElement.currentTime= myProgressbar.value * audioElement.duration/100;
});

const makeAllPlays = () => {                                       // ye function sare play  buttons jo h unko play kr dega 
    //e.target.classList.add(' fa-circle-pause');
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove(' fa-circle-pause');
        element.classList.add(' fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {   // for each- calls the function for each elemnt
    element.addEventListener('click' , (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove(' fa-circle-play');
        e.target.classList.add(' fa-circle-pause');
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove( 'fa-circle-play');
        masterPlay.classList.add( 'fa-circle-pause');

    });
});

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=4){
        songIndex =0
    }
    else{
        songIndex +=1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove( 'fa-circle-play');
    masterPlay.classList.add( 'fa-circle-pause');

});


document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove( 'fa-circle-play');
    masterPlay.classList.add( 'fa-circle-pause');

});