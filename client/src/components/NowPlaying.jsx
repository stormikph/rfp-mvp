import React from 'react';
import '../Styles/NowPlaying.scss';

const NowPlaying = ({nowPlaying, getNowPlaying, getUser, getUsersPlaylist}) => {

  const handleGetNowPlaying = () => {
    getNowPlaying();
    getUser();
    // getUsersPlaylist();
  }

  return (
    <div className='now-playing'>
      <button
        id="now-playing-btn"
        onClick={() => handleGetNowPlaying()}
        >Check Now Playing</button>
      {nowPlaying.albumArt ?
        <div><img id="album-art" src={ nowPlaying.albumArt } style={{ height: 300 }}/></div>
      :
        <div><img id="album-art" src={ nowPlaying.albumArt }/></div>
      }
      <div id="np-name">{ nowPlaying.name }</div>
      <div id="np-artist">{ nowPlaying.artist }</div>
    </div>
  )
}

export default NowPlaying;