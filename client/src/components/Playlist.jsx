import React from 'react';
import '../Styles/Playlist.scss';

const Playlist = ({userInfo}) => {
  console.log('userInfo: ', userInfo);

  return (
    <div id="playlist">
      <div>{userInfo.username}</div>
      {userInfo.image
      ?
        <div><img id="album-art" src={ userInfo.image }/></div>
      :
        <div>empty</div>
      }
    </div>
  )
}

export default Playlist;