const $ = require('jquery');

export function updatePlayStatusToFalse() {
    $.ajax({
        url: "http://localhost:8080/update_play_status",
        method: "PUT",
        crossDomain: true, 
        data: JSON.stringify({
            "value": "false"
        }),
        headers: {
            "Content-Type": "application/json"
        },
        success: function(data, textStatus, xhr) {
            console.log(data);
        }
    })
}

export function updatePlayStatusToTrue() {
    $.ajax({
        url: "http://localhost:8080/update_play_status",
        method: "PUT",
        crossDomain: true, 
        data: JSON.stringify({
            "value": "true"
        }),
        headers: {
            "Content-Type": "application/json"
        },
        success: function(data, textStatus, xhr) {
            console.log(data);
        }
    })
}

export function callPlaySong() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/play",
        success: function(data, textStatus, xhr) {
            console.log("Player.js::play_spotify() returned from success");
            if (data !== "OK") {
                alert("An error was encountered while playing, " + data);
            }
        }
    })
}

export function callPauseSong() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/pause",
        success: function(data, textStatus, xhr) {
            if (data !== "OK") {
                alert("An error was encountered while playing, " + data);
            }
        }
    })
}

export function getRecent() {
    $.ajax({
        method: 'GET', 
        url: "http://localhost:8080/recent",
        success: function(data, textStatus, xhr) {
            return data;
        }
    })
}

export function getPlaylists() {
    $.ajax({
        method: 'GET', 
        url: 'http://localhost:8080/playlists', 
        success: function(data, textStatus, xhr) {
            return data;
        }
    })
}