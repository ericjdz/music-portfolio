document.addEventListener("DOMContentLoaded", function() {
    // Initialize widgets
    var track1 = SC.Widget(document.getElementById('track1'));
    var track2 = SC.Widget(document.getElementById('track2'));
    var track3 = SC.Widget(document.getElementById('track3'));
    var track4 = SC.Widget(document.getElementById('track4'));
    // Add more tracks as needed

    var tracks = [track1, track2, track3, track4];
    var currentlyPlaying = null;
    var lastPlayed = null;  // Variable to track the last played track

    // Function to set the currently playing track
    function setCurrentlyPlaying(track) {
        currentlyPlaying = track;
    }

    // Function to play a specific track
    function playTrack(track) {
        if (currentlyPlaying && currentlyPlaying !== track) {
            currentlyPlaying.pause();  // Pause the currently playing track
        }
        track.play();
        setCurrentlyPlaying(track);
        lastPlayed = track;  // Update last played track
    }

    // Function to pause all tracks
    function pauseAllTracks() {
        tracks.forEach(function(track) {
            track.pause();
        });
        setCurrentlyPlaying(null); // No track is currently playing
    }

    // Event handlers for each track
    tracks.forEach(function(track) {
        track.bind(SC.Widget.Events.PLAY, function() {
            setCurrentlyPlaying(track);
            lastPlayed = track;  // Update last played track
        });
        track.bind(SC.Widget.Events.PAUSE, function() {
            if (currentlyPlaying === track) {
                setCurrentlyPlaying(null);
            }
        });
    });

    // Function to determine which track is currently playing
    function checkCurrentlyPlaying() {
        if (currentlyPlaying) {
            currentlyPlaying.getCurrentSoundIndex(function(index) {
                console.log("Currently playing track index: " + index);
            });
            currentlyPlaying.getCurrentSound(function(sound) {
                console.log("Currently playing sound: ", sound);
            });
        } else {
            console.log("No track is currently playing.");
        }
    }

    // Volume control
    var volumeKnob = document.getElementById('volume-knob');
    volumeKnob.addEventListener('input', function() {
        var volume = volumeKnob.value;
        tracks.forEach(function(track) {
            track.setVolume(volume);
        });
    });

    // Play button
    var playBtn = document.getElementById('play-btn');
    playBtn.addEventListener('click', function() {
        if (currentlyPlaying) {
            currentlyPlaying.play();  // Resume the currently playing track
        } else if (lastPlayed) {
            lastPlayed.play();  // Resume the last played track
        } else {
            // Play the first track or any logic you prefer
            playTrack(track1);  // Example: Start with track1
        }
    });

    // Pause button
    var pauseBtn = document.getElementById('pause-btn');
    pauseBtn.addEventListener('click', function() {
        if (currentlyPlaying) {
            currentlyPlaying.pause();  // Pause the currently playing track
        }
    });

    // Button to check which track is currently playing
    var checkPlayingBtn = document.getElementById('check-playing-btn');
    checkPlayingBtn.addEventListener('click', checkCurrentlyPlaying);
});
