import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login';
import Foo from './test';
import * as serviceWorker from './serviceWorker';
import jquery from 'jquery';
var $ = require('jquery');

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
// ReactDOM.render(<Login />, document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
