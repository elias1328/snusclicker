// 🔊 Playlist array
const playlist = [
	"soundtrack/aint-no-soul.wav",
	"soundtrack/pack-it.wav",
	"soundtrack/take-my-share.wav",
	"soundtrack/smack-it.wav",
	"soundtrack/mellow-hardstyle.mp3",
	"soundtrack/keep-going.wav"
];

let currentTrack = 0;
let savedTime = 0;
let wasPlaying = false;
let userInteracted = false;

const volumeSlider = document.getElementById("volume-slider");
const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const playPauseBtn = document.getElementById("play-pause");

// ✅ Disable Loop to Allow "End" Detection
audioPlayer.loop = false;

// 🎵 Load a track
function loadTrack(index, restoreTime = 0, shouldPlay = false) {
	if (index >= playlist.length) index = 0;
	if (index < 0) index = playlist.length - 1;

	currentTrack = index;
	const track = playlist[currentTrack];
	const fileType = track.endsWith(".wav") ? "audio/wav" : "audio/mp3";

	console.log(`🎵 Loading track: ${track}`);

	audioSource.src = track;
	audioSource.type = fileType;
	audioPlayer.load();

	audioPlayer.onloadedmetadata = () => {
		if (restoreTime > 0 && restoreTime < audioPlayer.duration) {
			audioPlayer.currentTime = restoreTime;
		}

		if (shouldPlay && userInteracted) {
			console.log("▶️ Trying to play track...");
			audioPlayer.play().catch(() => console.warn("🚫 Autoplay blocked"));
		}
	};

	// 🔊 Adjust volume for "mellow-hardstyle.mp3"
	let defaultVolume = 0.2;
	if (track.includes("mellow-hardstyle")) {
		defaultVolume = 0.1;
	}
	audioPlayer.volume = defaultVolume;

	playPauseBtn.textContent = shouldPlay ? "⏸️" : "▶️";
}

// 🎵 Update audio volume when slider is moved
volumeSlider.addEventListener("input", () => {
	audioPlayer.volume = parseFloat(volumeSlider.value); // ✅ Fix: Ensure it's a number
	console.log(`🔊 Volume set to: ${audioPlayer.volume}`); // Debugging log
});

// ▶️ Play/Pause Toggle
playPauseBtn.addEventListener("click", () => {
	console.log("🎵 Play/Pause button clicked!");
	userInteracted = true;
	if (audioPlayer.paused) {
		audioPlayer.play();
		playPauseBtn.textContent = "⏸️";
	} else {
		audioPlayer.pause();
		playPauseBtn.textContent = "▶️";
	}
});

// ⏭️ Next Track
document.getElementById("next-track").addEventListener("click", () => {
	console.log("⏭️ Next track button clicked!");
	userInteracted = true;
	playNextTrack();
});

// ⏮️ Previous Track
document.getElementById("prev-track").addEventListener("click", () => {
	console.log("⏮️ Previous track button clicked!");
	userInteracted = true;
	currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
	loadTrack(currentTrack, 0, true);
});

// 🎵 **Force Next Track to Play**
function playNextTrack() {
	console.log("🎵 Track ended, playing next...");
	currentTrack = (currentTrack + 1) % playlist.length;
	loadTrack(currentTrack, 0, true);

	setTimeout(() => {
		console.log("▶️ Trying to auto-play next track...");
		audioPlayer.play().catch(() => console.warn("🚫 Autoplay blocked"));
	}, 100);
}

// 🔄 **Manual End Detection (Fixes `ended` Not Firing)**
setInterval(() => {
	if (
		audioPlayer.currentTime > 0 &&
		audioPlayer.currentTime >= audioPlayer.duration - 0.5
	) {
		console.log("🚀 Manually detecting track end!");
		playNextTrack();
	}
}, 500);

// 🔥 Save Current Track, Time & Play State Before Unload
window.addEventListener("beforeunload", () => {
	localStorage.setItem("savedTrack", currentTrack);
	localStorage.setItem("savedTime", audioPlayer.currentTime);
	localStorage.setItem("wasPlaying", !audioPlayer.paused);
	localStorage.setItem("savedVolume", audioPlayer.volume); // ✅ Save volume level
});

// 🔥 Detect Any User Click to Resume Music
document.addEventListener("click", () => {
	if (!userInteracted && wasPlaying) {
		console.log("🖱️ User clicked! Resuming music...");
		userInteracted = true;
		audioPlayer.play().catch(() => console.warn("🚫 Autoplay blocked"));
	}
});

// 🔥 Load Track & Resume Playback on Page Load
window.addEventListener("load", () => {
	console.log("🔄 Page loaded! Checking saved state...");
	const lastTrack = localStorage.getItem("savedTrack");
	const lastTime = localStorage.getItem("savedTime");
	wasPlaying = localStorage.getItem("wasPlaying") === "true";
	const savedVolume = localStorage.getItem("savedVolume");

	// ✅ Restore saved volume level
	if (savedVolume !== null) {
		audioPlayer.volume = parseFloat(savedVolume);
		volumeSlider.value = savedVolume;
	}

	if (lastTrack !== null && lastTime !== null) {
		console.log(`🔁 Resuming track ${lastTrack} at ${lastTime}s`);
		loadTrack(parseInt(lastTrack), parseFloat(lastTime), wasPlaying);
	} else {
		console.log("🎵 No saved track found, starting fresh...");
		loadTrack(0, 0, false);
	}
});
