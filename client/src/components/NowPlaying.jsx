import React from 'react';
import '../Styles/NowPlaying.scss';

const NowPlaying = ({nowPlaying, getNowPlaying, getUser, getUsersPlaylist, userInfo}) => {

  return (
    <div className='now-playing'>
      <div id="username">{userInfo.username}</div>

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