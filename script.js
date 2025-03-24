let songImage = document.querySelector(".songPng img");
let songrange = document.querySelector(".songRange");
let player = document.querySelector("#player");
let nextButton = document.querySelector("#forwerd");
let prevButton = document.querySelector("#backward");
let songNameDisplay = document.querySelector("#songName");

let currentSongIndex = 0;

let songList = [
    { songName: "fonk song 1", filePath: "song/1.mp3", coverpath: "cover/1.jpg" },
    { songName: "fonk song 2", filePath: "song/2.mp3", coverpath: "cover/2.jpg" },
    { songName: "fonk song 3", filePath: "song/3.mp3", coverpath: "cover/3.jpg" },
    { songName: "fonk song 4", filePath: "song/4.mp3", coverpath: "cover/4.jpg" },
    { songName: "fonk song 5", filePath: "song/5.mp3", coverpath: "cover/5.jpg" },
    { songName: "fonk song 6", filePath: "song/6.mp3", coverpath: "cover/6.jpg" },
    { songName: "fonk song 7", filePath: "song/7.mp3", coverpath: "cover/7.jpg" },
    { songName: "fonk song 8", filePath: "song/8.mp3", coverpath: "cover/8.jpg" },
    { songName: "fonk song 9", filePath: "song/9.mp3", coverpath: "cover/9.jpg" },
    { songName: "fonk song 10", filePath: "song/10.mp3", coverpath: "cover/10.jpg" },
    { songName: "fonk song 11", filePath: "song/11.mp3", coverpath: "cover/11.jpg" },
    { songName: "fonk song 12", filePath: "song/12.mp3", coverpath: "cover/12.jpg" }
];

// Function to update the song and cover image **before** starting playback
function updateSongDetails() {
    songImage.src = songList[currentSongIndex].coverpath;  // Change cover image first
    songNameDisplay.textContent = songList[currentSongIndex].songName;  // Update the song name
    song.src = songList[currentSongIndex].filePath;  // Set the audio source to the new song

    // Once cover and song are updated, start playing the song
    song.load();  // Reload the audio with the new source
    song.play();  // Play the updated song
}

// Play/Pause functionality
player.addEventListener("click", () => {
    if (song.paused || song.currentTime <= 0) {
        song.play();
        player.classList.remove("fa-play");
        player.classList.add("fa-pause");
    } else {
        song.pause();
        player.classList.add("fa-play");
        player.classList.remove("fa-pause");
    }
});

// Update the progress bar as the song plays
song.addEventListener("timeupdate", () => {
    let progress = (song.currentTime / song.duration) * 100;
    songrange.value = progress;
});

// Seek functionality (allowing user to change song position with range input)
songrange.addEventListener("input", function () {
    let seekTime = (songrange.value / 100) * song.duration;
    song.currentTime = seekTime;
});

// Next song functionality
nextButton.addEventListener("click", () => {
    // Move to next song, loop around if needed
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    updateSongDetails();  // Update song and cover before playing
});

// Previous song functionality
prevButton.addEventListener("click", () => {
    // Move to previous song, loop around if needed
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    updateSongDetails();  // Update song and cover before playing
});

// Automatically play the next song when the current song ends
song.addEventListener("ended", () => {
    // Move to next song, loop around if needed
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    updateSongDetails();  // Update song and cover before playing
});

// Start by playing the first song
updateSongDetails();
