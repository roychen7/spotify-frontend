// import webView from './webview';
import './login.css'
import Player from './Player';
import React, { component } from 'react';
import App from './App'
var $ = require('jquery');


class Login extends React.Component {

  constructor() {
    super();
    this.state = {
        loggedIn: false
    }
    
    this.onClick = this.onClick.bind(this);

}

onClick(e) {
    const electron = window.require('electron');
    const BrowserWindow = electron.remote.BrowserWindow

    var loginWindow = new BrowserWindow({
        width: 800, 
        height: 600,
       })   

    loginWindow.loadURL("https://accounts.spotify.com/authorize?client_id=ba2aa172bb954f54be32398e8120381c&response_type=code&scope=user-modify-playback-state%20user-read-playback-state%20streaming%20user-read-email%20user-read-private&redirect_uri=http://localhost:8080/callback")

    loginWindow.on('closed', () => {
       loginWindow = null
     })
    $.ajax({
        url: 'http://localhost:8080/login',
        method: 'GET', //
        async: true,
        success: (data, textStatus, xhr) => {
            console.log("successful! " + data)
            if (data.toString().charAt(0) == "2") {
                this.setState( {loggedIn: true });
                loginWindow.close();
            }
        },
    })
}



componentDidMount() {
    $.ajax({
        url: 'http://localhost:8080/valid_token',
        method: 'GET',
        async: true,
        success: (data, textStatus, xhr) => {
            if (data.toString().charAt(0) == "2") {
                this.setState( {loggedIn: true });
            }
        },
    })
}

render() {
    if (this.state.loggedIn === false) {
        return (
            <div className='wrapper'>
                <button className='login-button' onClick={this.onClick}>
                    Login
                </button>
            </div>
        )
    } else {
      return (
        <div className='player-screen'>
            < Player />
        </div>
      )
    }
}
}

export default Login;