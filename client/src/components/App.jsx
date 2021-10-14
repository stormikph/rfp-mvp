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
      userInfo: {userID: '', username: '', image: ''},
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
        userInfo: {
          userID: data.id,
          username: data.display_name,
          // image: data.image[0] || ''
        }
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

  getUsersPlaylist = () => {
    const {userID} = this.state;
    spotifyApi.getUserPlaylists()
    .then(data => {
      console.log('Retrieved playlists', data.body);
    },function(err) {
      console.log('Failure to getUserPlaylist', err);
    });
  }

  handleGetNowPlaying = () => {
    this.getNowPlaying();
    this.getUser();
  }

  render() {
    const { loggedIn, nowPlaying, userInfo } = this.state;
    return (
      <div className='app'>
        <div id="header">
          {loggedIn ?
          <button
          id="now-playing-btn"
          onClick={() => this.handleGetNowPlaying()}
          >Check Now Playing</button>
          :
          <h3>stormi's mvp</h3>
        }
        </div>
        <div id="canvas">
          {loggedIn ?
          <div className="music-scope">
            <NowPlaying
              nowPlaying={nowPlaying}
              getNowPlaying={this.getNowPlaying}
              userInfo={userInfo}
              getUser={this.getUser}
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