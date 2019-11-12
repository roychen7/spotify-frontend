import React, { component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.js';
import Foo from './test.js';
var $ = require('jquery');

const Login = () => {
  return (
    <div id = "login">
      <a href="https://accounts.spotify.com/authorize?client_id=ba2aa172bb954f54be32398e8120381c&response_type=code&scope=user-modify-playback-state&redirect_uri=http://localhost:8080/callback">
        Login!
      </a>
      <button onClick={login}>
        click me!
      </button>
      <Foo />
    </div>
  )
}

function login() {
  $.ajax({
    url: 'http://localhost:8080/token',
    type: 'GET',
    contentType: 'text/plain; charset=UTF-8',
    success: function(data, textStatus, xhr) {
        alert(data);
    },
    error: function(data, textStatus, xhr) {
        alert('failed' + ' ' + data + ' ' + textStatus + ' ' + xhr);
    }
});
}

export default Login;