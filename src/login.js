import React, { component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.js';
import foo from './test.js';

function Login() {
  return (
    <div id = "foo">
      <button>
          Login!
      </button>
      <foo />
    </div>
  )
}

export default Login;