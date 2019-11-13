import ReactDOM from 'react-dom';
import React, { component } from 'react';
import logo from './logo.svg';
import App from './App.js';
import './index.js';
import Foo from './test.js';
var $ = require('jquery');
const _index = require('./index.js');

// import Player from './Player.js';

const Login = () => {
  return (
    <div id = "login">
      <button onClick={loginButton}>
        Login!
      </button>
    </div>
  )
}

function loginButton() {
  window.location = 'https://accounts.spotify.com/authorize?client_id=ba2aa172bb954f54be32398e8120381c&response_type=code&scope=user-modify-playback-state%20user-read-playback-state&redirect_uri=http://localhost:8080/callback';
  $.ajax({
    url: 'http://localhost:8080/login',
    type: 'GET',
    async: false,
    success: function(data, textStatus, xhr) {
      window.location = 'http://localhost:3000';
    },
    error: function(data, textStatus, xhr) {
      alert('error encountered + ' + data);
    }
  });
}
export default Login;