var $ = require('jquery');

class ClientProxy {
    handleLogin = (handleLoginSuccess) => {
        $.ajax({
            url: 'http://localhost:8080/login',
            method: 'GET',
            async: true,
            success: (data, textStatus, xhr) => {
                console.log("successful! " + data)
                if (data === "OK") {
                    handleLoginSuccess()
                }
            },
        })
    }

    validateToken = (validateTokenScb) => {
        $.ajax({
            url: 'http://localhost:8080/valid_token',
            method: 'GET',
            async: true,
            success: (data, textStatus, xhr) => {
                if (data.toString().charAt(0) === "2") {
                    validateTokenScb();
                }
            }
        })
    }

    togglePlayback = () => {
        $.ajax({
            url: 'http://localhost:8080/toggle_playback',
            method: 'GET',
            async: true,
        })
    }
}

export default new ClientProxy()