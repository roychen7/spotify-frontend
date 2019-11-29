// import { React, Component } from 'react';
// const $ = require('jquery');

// class Initializer extends React.Component {
//     constructor() {
//         this.state = {
//             loggedIn: false
//         }
//         this.onClick = this.onClick.bind(this);
//     }

//     onClick(e) {
//         window.location = 'https://accounts.spotify.com/authorize?client_id=ba2aa172bb954f54be32398e8120381c&response_type=code&scope=user-modify-playback-state%20user-read-playback-state%20streaming%20user-read-email%20user-read-private&redirect_uri=http://localhost:8080/callback';
//         $.ajax({
//             url: 'http://localhost:8080/valid_token',
//             method: 'GET',
//             async: true,
//             success: (data, textStatus, xhr) => {
//                 if (data.toString().charAt(0) == "2") {
//                     this.setState( {loggedIn: true });
//                 }
//             },
//         }) 
//     }

//     componentDidMount() {
//         $.ajax({
//             url: 'http://localhost:8080/valid_token',
//             method: 'GET',
//             async: true,
//             success: (data, textStatus, xhr) => {
//                 if (data.toString().charAt(0) == "2") {
//                     this.setState( {loggedIn: true });
//                 }
//             },
//         })
//     }

//     render() {
//         if (this.state.loggedIn === false) {
//             return (
//                 <div className='-loginScreen'>
//                     <button onClick={this.onClick}>
//                         Login
//                     </button>
//                 </div>
//             )
//         }
//     }
// }

// export default Initializer;