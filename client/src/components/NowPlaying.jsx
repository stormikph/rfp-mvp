import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const NowPlaying = () => {
  const {nowPlaying, getNowPlaying} = this.props;

  handleGetNowPlaying = () => {
    getNowPlaying()
  }

  return (
    <div className='now-playing'>
      <button onClick={() => this.handleGetNowPlaying()}>Check Now Playing</button>
      <div> Now Playing: { nowPlaying.name } </div>
      <div> {nowPlaying.artist }</div>
      <div> <img src={ nowPlaying.albumArt } id="album-art"/> </div>
    </div>
  )
}

export default NowPlaying;