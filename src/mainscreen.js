// import webView from './webview';
import './mainscreen.css'
import Player from './Player';
import React, { component } from 'react';
import { Button} from 'react-bootstrap';
import ClientProxy from './utils/ClientProxy';
import PlaylistMixGenerator from './components/PlaylistMixGenerator';
import RecentSongs from './components/RecentSongs';
var $ = require('jquery');

class MainScreen extends React.Component {

  constructor() {
    super();
    this.state = {
        loggedIn: false,
        isStretched: false
    }
}

handleLogin = (e) => {
    e.preventDefault();
    const electron = window.require('electron');
    const BrowserWindow = electron.remote.BrowserWindow;

    var loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
       })   

    loginWindow.loadURL("https://accounts.spotify.com/authorize?client_id=ba2aa172bb954f54be32398e8120381c&response_type=code&scope=user-modify-playback-state%20streaming%20user-read-private%20user-read-playback-state&redirect_uri=http://localhost:8080/callback")

    loginWindow.on('closed', () => { 
       loginWindow = null
     })

     ClientProxy.handleLogin(() => {
        this.loginScb(loginWindow)
    })   
}

handleToggle = (e) => {
    e.preventDefault();
    ClientProxy.togglePlayback();
}

onClick = (e) => {
    e.preventDefault();
    const electron = window.require('electron');
    let window_ = electron.remote.getCurrentWindow();
    if (!this.state.isStretched) {
        window_.setBounds({
            width: 500,
            height: 400
        })
        this.setState({ isStretched: true })
    } else {
        window_.setBounds({
            width: 100,
            height: 80,
        })
        this.setState({ isStretched: false })
    }
}


loginScb = (loginWindow) => {
    this.setState( {loggedIn: true })
    this.openOnRemote();
    loginWindow.close();
    const electron = window.require('electron');
    let window_ = electron.remote.getCurrentWindow();
    window_.setBounds({
        width: 100,
        height: 80
    })
}

validateTokenScb = () => {
    console.log("successful validatetoken!")
    this.setState( {loggedIn: true });
    if (navigator.userAgent.includes('Electron')) {
        console.log(navigator.userAgent);
        // this.openOnRemote();
        const electron = window.require('electron');
        let window_ = electron.remote.getCurrentWindow();
        window_.setBounds({
            width: 100,
            height: 80
        })
    }
}

openOnRemote = () => {
    const shell = window.require('electron').shell;
    shell.openExternal('http://localhost:3000');
}

componentDidMount() {
    ClientProxy.validateToken(() => {
        this.validateTokenScb();
    })
}

render() {
    return (
        <> 
            {!this.state.loggedIn && (<Button className="login-button" onClick = {this.handleLogin}> Login </Button>)} 
             <div id='player-wrapper'>
                {this.state.loggedIn && (<Button className='expand-button' onClick={this.onClick} >  </Button>)}
                {/* <div className='center-toggle'> */}
                    {this.state.loggedIn && (<Button className="toggle-button" onClick = {this.handleToggle}></Button>)}
                    {this.state.loggedIn && this.state.isStretched && (<PlaylistMixGenerator/>)}
                {/* </div> */}
                    {this.state.loggedIn && this.state.isStretched && (<RecentSongs />)}
                {this.state.loggedIn && (<Button className='expand-button-2' onClick={this.onClick} >  </Button>)}
            </div>
            {this.state.loggedIn && < Player />}
        </>
        )
    }
}

export default MainScreen;