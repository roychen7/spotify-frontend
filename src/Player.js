// import './Player.css';
import React, { component } from 'react';
var $ = require('jquery');

function Player() {
    return (
        <div className="Player">
            <PlayButton />
            <PauseButton />
        </div>
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

function play_spotify() {
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
export default Player;