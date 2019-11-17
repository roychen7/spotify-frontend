// import './Player.css';
import React, { component } from 'react';
var $ = require('jquery');
// const BrowserWindow = window.require('electron');
// const { ipcRenderer, remote, BrowserWindow } = require('electron');

var player = null;
var opened = false;
var alreadyDone = false;

class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        // async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            player = new window.Spotify.Player({
                name: 'Spotify Player',
                getOAuthToken: callback => {
                    $.ajax({
                        url: 'http://localhost:8080/token',
                        method: 'GET',
                        success: function(data, textStatus, xhr) {
                            callback(data);
                        }
                    })
                },
                volume: 0.1
            })

            player.on('player_state_changed', ({ paused, track_window: { current_track } }) => {
                if (!alreadyDone) {
                console.log("on player state change " + paused);
                console.log("current track: " + current_track)
                alreadyDone = true;
                setTimeout(
                    resetBool, 100
                )
                }
            })

            player.connect();
        }
    }

    render() {
        return (
            <div className="Player">
                <PlayButton />
                <PauseButton />
                <Ransom />
            </div>
        )
    }
}

function resetBool() {
    alreadyDone = false;
}

    
function play_ransom() {
}

function play_spotify() {
    // console.log(alreadyDone);
    alreadyDone = false;
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/play",
        success: function(data, textStatus, xhr) {
            if (xhr.status !== 202) {
                alert("An error was encountered while playing");
            }
        }
    })
}

function pause_spotify() {
    // console.log(alreadyDone);
    alreadyDone = false;
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/pause",
        success: function(data, textStatus, xhr) {
            if (xhr.status !== 202) {
                alert("An error was encountered while pausing");
            }
        }
    })
}

const Ransom = () => {
    return (
        <button id="Ransom" onClick={play_ransom}> Play ransom</button>
    )
}

const PlayButton = () => {
    return (
        <button id="play" onClick={play_spotify}> Play </button>
        )
}
const PauseButton = () => {
    return (
        <button id="pause" onClick={pause_spotify}> Pause </button>
    )
}

export default Player;