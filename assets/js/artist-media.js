let albumId = new URLSearchParams(window.location.search);
albumId = albumId.get('albumId');

let albumEndpoint;

switch(albumId) {
    case 'album_01':
    albumEndpoint = 'https://api.npoint.io/21eb80faa068e7973139';
    break;

    case 'album_02':
    albumEndpoint = 'https://api.npoint.io/5da57dbc99aacab62556';
    break;

    case 'album_03':
    albumEndpoint = 'https://api.npoint.io/4b152dc8e2c19be50717';
    break;

    case 'album_04':
    albumEndpoint = 'https://api.npoint.io/d6f1f004ce1936d529cf';
    break;

    case 'album_05':
    albumEndpoint = 'https://api.npoint.io/2183a1a1f2606cf4ff8a';
    break;

    case 'album_06':
    albumEndpoint = 'https://api.npoint.io/d4137a9ff50205e6d8b9';
    break;
}


let albumData;

let selectedSongIndex;

// API request to get ALBUM data
let request = new XMLHttpRequest();
request.open('GET', albumEndpoint );

request.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){

        albumData = JSON.parse(this.response);
        loadData();
    }
}

request.send(); 


function loadData() {

    // SONGS Panel
    let albumImage = document.getElementById("album-image");
    albumImage.style.backgroundImage = `url(${albumData.albumImage})`;

    let albumName = document.getElementById("album-name");
    albumName.innerText = albumData.albumName;

    let albumSongList = document.getElementById("song-list");

    albumData.songs.forEach( function(element, index) {
        
        let song = document.createElement("div");
        song.className = "song";

        song.innerHTML = `
        <i class="far fa-play-circle song-list-play" id="play-song-icon${index}" onclick="playSong(${index})"></i>
        <i class="far fa-pause-circle song-list-pause" id="pause-song-icon${index}" onclick="pauseSong()"></i>
        <p class="song-title">${element.songName}</p>`;

        albumSongList.append(song);
    });


    // FOLLOWERS
    let followerHolder = document.getElementById("follower-list");

    albumData.followers.forEach(function(element) {

        followerHolder.innerHTML += `<img src="${element.followerImage}" class="panel-img">`;

    });


    // LATEST ALBUM
    let latestAlbum = document.getElementById("latest-album-img");
    latestAlbum.src = albumData.latestAlbum.albumImage;
    
    // CATEGORIES
    let albumCategories = document.getElementById("album-categories");
    albumData.categories.forEach(function(element){

        albumCategories.innerHTML += `<div class="categories">${element}</div>`;

    }) 
}

// Play song
function playSong(index) {
    selectedSongIndex = index; 

    // check next song
    let nextSong = albumData.songs[selectedSongIndex + 1];
    if (nextSong) {
        document.getElementsByClassName("p-next")[0].style.opacity = 1;
        document.getElementsByClassName("p-next")[0].style.top = 0;
    } else {
        document.getElementsByClassName("p-next")[0].style.opacity = 0;
        document.getElementsByClassName("p-next")[0].style.top = "100px";
    }

    let prevSong = albumData.songs[selectedSongIndex - 1];
    if (prevSong) {
        document.getElementsByClassName("p-prev")[0].style.opacity = 1;
        document.getElementsByClassName("p-prev")[0].style.top = 0;
    } else {
        document.getElementsByClassName("p-prev")[0].style.opacity = 0;
        document.getElementsByClassName("p-prev")[0].style.top = "100px";
    }

    let audioInput = document.getElementById("audio-input");
    audioInput.src = albumData.songs[selectedSongIndex].songAttachment;
    audioInput.play();

    albumData.songs.forEach( function(element, i) {
        document.getElementById("play-song-icon" + i).style.display = "initial";
        document.getElementById("pause-song-icon" + i).style.display = "none";
    }) 

    document.getElementById("play-song-icon" + selectedSongIndex).style.display = "none";
    document.getElementById("pause-song-icon" + selectedSongIndex).style.display = "initial";

    document.getElementsByClassName("player-controller")[0].style.bottom = 0;

    // Player controller
    document.getElementsByClassName("player-album-image")[0].style.backgroundImage = `url('${albumData.albumImage}')`;
    document.getElementsByClassName("player-song-name")[0].innerText = albumData.songs[selectedSongIndex].songName;

    document.getElementsByClassName("p-play")[0].style.display = "none";
    document.getElementsByClassName("p-pause")[0].style.display = "initial";

}

// Pause song
function pauseSong() {
    let audioInput = document.getElementById("audio-input");
    audioInput.pause();

    albumData.songs.forEach( function(element, i) {
        document.getElementById("play-song-icon" + i).style.display = "initial";
        document.getElementById("pause-song-icon" + i).style.display = "none";
    }) 

    // Player controller
    document.getElementsByClassName("p-play")[0].style.display = "initial";
    document.getElementsByClassName("p-pause")[0].style.display = "none";
}

function playSongFromController() {
    playSong(selectedSongIndex);

    document.getElementsByClassName();

    document.getElementsByClassName("p-play")[0].style.display = "none";
    document.getElementsByClassName("p-pause")[0].style.display = "initial";
}

function nextSong() {
    playSong(selectedSongIndex + 1);
}

function previousSong() {
    playSong(selectedSongIndex - 1);
}

function changeSongVolume() {
    let volumeInput = document.getElementById("volume-range").value;

    let audioInput = document.getElementById("audio-input");
    audioInput.volume = volumeInput / 100;
}

function unMuteVolume() {
    document.getElementById("volume-range").value = 50;
    let audioInput = document.getElementById("audio-input");
    audioInput.volume = 0.5;

    document.getElementsByClassName("fa-volume-up")[0].style.display = "initial";
    document.getElementsByClassName("fa-volume-mute")[0].style.display = "none";
}

function muteVolume() {
    document.getElementById("volume-range").value = 0;
    let audioInput = document.getElementById("audio-input");
    audioInput.volume = 0;

    document.getElementsByClassName("fa-volume-up")[0].style.display = "none";
    document.getElementsByClassName("fa-volume-mute")[0].style.display = "initial";
}

////////////------------ ARTIST HEADER (PREVIOUS API) ---------------////////////////

// API request to get ARTIST data
let artistData;

let artistId = new URLSearchParams(window.location.search);
artistId = artistId.get('id');

// Get Artist profile data
let request_artist = new XMLHttpRequest();
request_artist.open('GET', `https://api.npoint.io/45461e330dcfb5171c4e?id=${artistId}`);

request_artist.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){

            artistData = JSON.parse(this.response);

            loadArtistData();

        }
    }

    request_artist.send(); 

function loadArtistData() {
    // Cover
    let artistBanner = document.getElementById("artists-banner");
    artistBanner.style.backgroundImage = `url('${artistData.coverImage}')`;

    let artistName = document.getElementById("artist-name");
    artistName.innerText = artistData.artistName;

    let artistAvatar = document.getElementById("artist-avatar");
    artistAvatar.style.backgroundImage = `url('${artistData.artistAvatar}')`;
}