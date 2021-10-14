import React from 'react';

import '../Styles/Login.scss';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const Login = ({getUser}) => {

  const handleGetUser = () => {
    getUser();
  }

  return (
    <div id="login">
      <a href='http://localhost:8888' onClick={() => handleGetUser}> Login to Spotify </a>
    </div>
  )
}

export default Login;