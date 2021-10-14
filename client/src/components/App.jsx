import React from 'react';
import Login from './Login.jsx';
import NowPlaying from './NowPlaying.jsx';
import Playlist from './Playlist.jsx';

import '../Styles/App.scss';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = this.getHashParams().access_token;
    if (token) spotifyApi.setAccessToken(token);
    this.state = {
      loggedIn: token ? true : false,
      userID: '',
      username: '',
      nowPlaying: {
        name: 'Nothing playing...',
        albumArt: '',
        artist: ''
      },
      playlist: ''
    }
  }

  getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getUser = () => {
    spotifyApi.getMe()
    .then(data => {
      this.setState({
        ...this.state,
        userID: `${data.id}`,
        username: `${data.display_name}`
      });
    }, function(err) {
      console.log('Failure to getUser', err);
    });
  }

  getNowPlaying = () => {
    const {userID} = this.state;
    spotifyApi.getMyCurrentPlaybackState()
    .then((response) => {
      this.setState({
        ...this.state,
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
          artist: response.item.artists[0].name
        }
      });
    })
  }

  // getUsersPlaylist = () => {
  //   const {userID} = this.state;
  //   spotifyApi.getUserPlaylists()
  //   .then(data => {
  //     console.log('Retrieved playlists', data.body);
  //   },function(err) {
  //     console.log('Failure to getUserPlaylist', err);
  //   });
  // }

  render() {
    const { loggedIn, nowPlaying, playlist } = this.state;
    return (
      <div className='app'>
        <div id="header">
          <h3>stormi's mvp</h3>
        </div>
        <div id="canvas">
          {loggedIn ?
          <div className="music-scope">
            <NowPlaying
              nowPlaying={nowPlaying}
              getNowPlaying={this.getNowPlaying}
              // getUsersPlaylist={this.getUsersPlaylist}
              getUser={this.getUser}
              />
            <Playlist
              playlist={playlist}
              />
          </div>
          :
          <Login
          />
          }
        </div>
      </div>
    )
  }
};

export default App;