import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const Login = () => {
  return (
    <div className='login'>
      <a href='http://localhost:8888'> Login to Spotify </a>
    </div>
  )
}

export default Login;