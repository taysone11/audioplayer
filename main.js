const imgAudio = document.querySelector('.imgAudio'),
title = document.querySelector('.NameOfTrack'),
nameOfArtist = document.querySelector('.NameOfArtist'),
prev = document.querySelector('.prev'),
playbtn = document.querySelector('.playNow'),
next = document.querySelector('.next');
iconPlay = document.getElementById('play');
repeatBtn = document.querySelector('.repeat');
randomBtn = document.querySelector('.randomtrack');

nowPlaying = document.getElementById('nowPlayingTrack');

listbtn = document.querySelector('.blist');
listOfTracks = document.getElementById('music-list');



actTime = document.querySelector('.NowTime'),
fullTime = document.querySelector('.FullTime');
audioTrack = document.createElement('audio')
player = document.querySelector('.box');
progressBar = document.querySelector('.line');
elAudio = document.getElementById('audioEl');


isPlaying = false;  

volumeBar = document.querySelector('.volumeBar');
volumeBtn = document.querySelector('.volumeBtn');
volumeImg = document.querySelector('.volumeImg');

imgAudio_container = document.querySelector('.imgAudio__container');

let tracks = [['GONE.Fludd','ВТОРНИК'],['GONE.Fludd','КУБИК ЛЬДА'],
['Joji', 'YEAH RIGHT'],['Joji, BENEE', 'Afterthought'],['GONE.Fludd','ДРИПСЭТ'],['GONE.Fludd','МАМБЛ'],
['GONE.Fludd','САХАРНЫЙ ЧЕЛОВЕК'],['GONE.Fludd','СЕТИ'],['GONE.Fludd','КУБИК ЛЬДА'],['GONE.Fludd','КУБИК ЛЬДА']];

let trackIndex = 0;
let updateTimer;
let isVolume = true;
let valueVolume = 1;
audioTrack.volume = 0.01;
let listActive = false;
let isRepeating = false;
let isRandom = false;
let indexTrack = 0; //for list of tracks
//  let objOfTracks = {
//     track_1 : {
//         artist: "Joji ",
//         track : "YEAR RIGHT",
//         img: 'imgAudio/cover3.jfif'
// },
// track_2 : {
//     artist: "Joji,BENEE ",
//     track : "Afterthought",
//     img: 'imgAudio/cover4.jfif'
// },
// track_3 : {
//     artist: "GONE.Fludd ",
//     track : "КУБИК ЛЬДА",
//     img: 'imgAudio/cover1.jfif'
// },
// track_4 : {
//     artist: "GONE.Fludd ",
//     track : "ВТОРНИК",
//     url: "audio/",
//     img: 'imgAudio/cover2.jfif'
// }

//}







function loadTrack(song) {
    clearInterval(updateTimer);
    title.innerHTML = song;
    nameOfArtist.innerHTML = tracks[trackIndex][0];
    audioTrack.src = `audio/${tracks[trackIndex][0] + " - " + tracks[trackIndex][1]}.mp3`;
    audioTrack.load();
    updateTimer = setInterval(setUpdate, 300);
    imgAudio_container.style.backgroundImage = `url("imgAudio/music.jpg")`;
    nowPlaying.innerHTML = `\n ${tracks[trackIndex][0] + " - " + tracks[trackIndex][1]}`;
}


loadTrack(tracks[trackIndex][1]);

function playTrack() {
    isPlaying = true;
    audioTrack.play()
    iconPlay.src = `buttons/stop.png`
    
}

function pauseTrack() {
    isPlaying = false;

    audioTrack.pause()
iconPlay.src = `buttons/play.png`
}

playbtn.addEventListener('click', () => {

    if (isPlaying) {
        pauseTrack()
    } else
     {
        playTrack();
    }
});

audioTrack.addEventListener('ended', () => {
    if (isRepeating) {
        playTrack();
    } else {
        if (isRandom) {
            trackIndex = Math.floor(Math.random() * tracks.length);
            loadTrack(tracks[trackIndex][1]);
            playTrack();

        }else {
            
        nextTrack();
    }
    }

});


function nextTrack() {
     
    if(isRandom) {
        trackIndex = Math.floor(Math.random() * tracks.length);
        loadTrack(tracks[trackIndex][1]);
        playTrack();
    }
        trackIndex++;
        if (tracks[trackIndex]) {
        loadTrack(tracks[trackIndex][1]);
        audioTrack.play();
        } else {
            
            trackIndex = 0;
            loadTrack(tracks[trackIndex][1]);
            
        }

    }
function prevTrack() {
    trackIndex--;
    
    if (tracks[trackIndex]) {
    loadTrack(tracks[trackIndex][1]);
   } else {
    trackIndex = tracks.length - 1;
    loadTrack(tracks[trackIndex][1]);
   }
}


prev.addEventListener('click', () => {
    prevTrack();
    playTrack();
})

next.addEventListener('click', () => {
    nextTrack();
    playTrack();
})



repeatBtn.addEventListener('click', () => {
    if (isRepeating) {
        isRepeating = false;
        document.getElementById('repeat').style["boxShadow"] = "0px 0px 0px 0px";

    }else {
        isRepeating = true;
        document.getElementById('repeat').style["boxShadow"] = "rgb(214, 86, 205) 0px 0px 10px 5px";
    }
})


randomBtn.addEventListener('click', () => {

    

    if (isRandom) {
        isRandom = false;
        document.getElementById('randomtrack').style["boxShadow"] = "0px 0px 0px 0px";

    }else {
        isRandom = true;
        document.getElementById('randomtrack').style["boxShadow"] = "rgb(214, 86, 205) 0px 0px 10px 5px";
    }
})




function seekTo() {

    let seekto = audioTrack.duration * (progressBar / 100);
    audio.currentTime = seekto;
}

function setUpdate() {
    progressBar.addEventListener('change', function() {
        audioTrack.currentTime = (this.value / 100) * audioTrack.duration;
    })
    let seekPosition = 0;
    if (!isNaN(audioTrack.duration)) {
        seekPosition = audioTrack.currentTime * (100 / audioTrack.duration);
        progressBar.value = seekPosition;

        let currentMinutes = Math.floor(audioTrack.currentTime / 60);
        let currentSeconds = Math.floor(audioTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(audioTrack.duration / 60);
        let durationSeconds = Math.floor(audioTrack.duration - durationMinutes * 60);

        if (currentSeconds < 10) {currentSeconds = "0" + currentSeconds;}
        if (durationSeconds < 10) {durationSeconds = "0" + durationSeconds;}
        if (currentMinutes < 10) {currentMinutes = "0" + currentMinutes;}
        if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes;}

        actTime.textContent = currentMinutes + ":" + currentSeconds;
        fullTime.textContent = durationMinutes + ":" + durationSeconds;

    }
}

function setVolume() {
    volumeBar.addEventListener('change', function() {
        audioTrack.volume = this.value / 100;
        valueVolume = this.value;
})
}

volumeBtn.addEventListener('click', () => {
    NowVolume = this.value;
    if (isVolume) {
        isVolume = false;
        volumeBar.value = 0;
        audioTrack.volume = 0;
        volumeImg.src = 'buttons/volume-off.png';
    } else {
        isVolume = true;
        volumeBar.value = valueVolume;
        audioTrack.volume = valueVolume / 100;
        volumeImg.src = 'buttons/volume-on.png';

    }
})



listbtn.addEventListener('click', () => {
    if (listActive) {
        listOfTracks.style.display = 'none';
        listActive = false;
    } else{
    listOfTracks.style.display = 'block';
    listActive = true;
    }
})
let indexRow = 0;
for (track of tracks) {
    
    let ul = document.getElementById("list");
    let li = document.createElement("li");
    li.setAttribute('id', `${indexTrack}`);
    li.classList.add('btn-li');
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    divRow.setAttribute('id', `${indexTrack}`);
    
    let spanNameOfTrack = document.createElement("span");
    spanNameOfTrack.setAttribute('id', `${indexTrack}`);
    let pNameOfArtist = document.createElement("p");
    pNameOfArtist.setAttribute('id', `${indexTrack}`);
    pNameOfArtist.innerHTML = `${track[0]}`;
    spanNameOfTrack.innerHTML = `${track[1]}`;
    
    divRow.appendChild(spanNameOfTrack);
    divRow.appendChild(pNameOfArtist);
    
    li.appendChild(divRow);
    ul.appendChild(li);
    indexTrack += 1
    
}

let liBtn = document.querySelectorAll('.btn-li');

Array.from(liBtn).forEach(function(button){
    button.addEventListener('click', function(e) {
    		trackIndex = Number(e.target.id);
            loadTrack(tracks[trackIndex][1]);
            playTrack();
            
    		
    })
});

let rowBtn = document.querySelectorAll('.row');

Array.from(rowBtn).forEach(function(button){
    button.addEventListener('click', function(e) {
    		trackIndex = Number(e.target.id);
            loadTrack(tracks[trackIndex][1]);
            playTrack();	
            
    })
});





