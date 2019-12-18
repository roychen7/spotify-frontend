// import './Player.css';
import React from 'react';
import { callPlaySong, callPauseSong, updatePlayStatusToFalse, updatePlayStatusToTrue } from './utils/ApiCaller';
var $ = require('jquery');

class Player extends React.Component {
    player = null;
    already_done = false;
    already_paused = null;
    prev_track_uri = "";

    constructor(props) {
        super(props);
        this.playSong = this.playSong.bind(this);
        this.pauseSong = this.pauseSong.bind(this);
    }

    resetBool = () => {
        this.already_done = false;
    }

    playSong() {
        console.log("Player.js::play_spotify()")
        this.already_done = false;
        this.already_paused = false;
        callPlaySong();
    }

    pauseSong() {
        this.already_done = false;
        this.already_paused = true;
        callPauseSong();
    }
    
    test() {
        // $.ajax({
        //     method: 'PUT',
        //     url: 'http://localhost:8080/suggested_playlists',
        //     success: function(data, textStatus, xhr) {
        //         const res = JSON.parse(data);
        //         console.log(res.result);
        //     }
        // })
        const shell = window.require('electron').shell;
        shell.openExternal('https://www.google.com');
    }


    componentDidMount() {
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        // async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            this.player = new window.Spotify.Player({
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
                volume: 0.015
            })

            this.player.on('player_state_changed', ({ paused, position, track_window: { current_track } }) => {            
                if (!this.already_done) {
                    if (current_track.uri !== this.prev_track_uri) {
                        this.prev_track_uri = current_track.uri; 
                    }

                    if (paused === true) {
                        if (this.already_paused === null || this.already_paused === false) {
                            updatePlayStatusToFalse();
                        this.already_paused = true;
                    }
                    } else {
                        if (this.already_paused === null || this.already_paused === true) {
                            updatePlayStatusToTrue();
                            this.already_paused = false;
                        }
                    }
                    console.log(position);
                    console.log("on player state change " + paused);
                    console.log("current track: " + current_track.name )
                    this.already_done = true;
                    setTimeout(
                        this.resetBool, 100
                    )
                }
            })

            this.player.on('initialization_error', ({ message }) => {
                console.error('Failed to initialize', message);
              });


            // player.addListener('ready', () => {
            //     console.log("set interval!");
            //     setInterval(() => {
            //         if (already_paused === null) {
            //             return;
            //         }
            //         if (already_paused === true) {
            //             console.log("pausing refreshing");
            //             this.pause_spotify();
            //         } else {
            //             console.log("playing refreshing");
            //             this.play_spotify();
            //         }
            //     }, 10000);
            // })
            this.player.connect();
        }
    }


    render() {
        return (
            null
        )
    }
}

export default Player;