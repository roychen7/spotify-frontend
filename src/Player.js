// import './Player.css';
import React, { component } from 'react';
var $ = require('jquery');

var player = null;
var opened = false;
var alreadyDone = false;
var already_paused = null;
var i = 0;
var prev_track_uri = "";

class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: null
        }

        this.pause_spotify = this.pause_spotify.bind(this);
        this.play_spotify = this.play_spotify.bind(this);
        this.test = this.test.bind(this);
    }

    play_spotify() {
        // console.log(alreadyDone);
        alreadyDone = false;
        already_paused = false;
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

    pause_spotify() {
        // console.log(alreadyDone);
        alreadyDone = false;
        already_paused = true;
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
    
    test() {
        var BrowserWindow;
        if (true) {
            const electron = window.require('electron');
            BrowserWindow = electron.remote.BrowserWindow
        }
        var playWindow = new BrowserWindow({
            width: 300, 
            height: 200,
            webPreferences: {
                nodeIntegration: true
            }
           })   
        playWindow.loadURL("http://localhost:3000")
    
        playWindow.on('closed', () => {
           playWindow = null
         })
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

            player.on('player_state_changed', ({ paused, position, track_window: { current_track } }) => {            
                if (!alreadyDone) {
                    if (current_track.uri !== prev_track_uri) {
                        prev_track_uri = current_track.uri; 
                    }

                    if (paused === true) {
                        if (already_paused === null || already_paused === false) {
                        $.ajax({
                            url: "http://localhost:8080/pause_upd"
                        })
                        already_paused = true;
                    }
                    } else {
                        if (already_paused === null || already_paused === true) {
                        $.ajax({
                            url: "http://localhost:8080/play_upd"
                        })
                        already_paused = false;
                    }
                    }
                    console.log(position + i);
                    console.log("on player state change " + paused + ' ' + i);
                    console.log("current track: " + current_track.name + ' ' + i)
                    alreadyDone = true;
                    i++;
                    setTimeout(
                        resetBool, 100
                    )
                }
            })

            player.on('authentication_error', ({ message }) => {
                console.error('Failed to authenticate', message);
              });

            player.addListener('ready', () => {
                console.log("set interval!");
                setInterval(() => {
                    if (already_paused === null) {
                        return;
                    }
                    if (already_paused === true) {
                        console.log("pausing refreshing");
                        this.pause_spotify();
                    } else {
                        console.log("playing refreshing");
                        this.play_spotify();
                    }
                }, 10000);
            })

            player.connect();
        }
    }


    render() {
        return (
            <div id='wrapper-class'>
                <button id="play" onClick={this.play_spotify}> Play </button>
                <button id="pause" onClick={this.pause_spotify}> Pause </button>
            </div>
        )
    }
}

function resetBool() {
    alreadyDone = false;
}

export default Player;