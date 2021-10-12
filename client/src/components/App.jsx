import React from 'react';
import Login from './Login.jsx';
import NowPlaying from './NowPlaying.jsx';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends React.Component {
  constructor(props) {
    super(props);
    // const params = this.getHashParams();
    const token = this.getHashParams().access_token;
    if (token) spotifyApi.setAccessToken(token);
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Nothing playing...', albumArt: '', artist: '' }
    }
    console.log('token: ', token);
    // console.log('spotifyApi: ', spotifyApi);
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

  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState()
    .then((response) => {
      console.log('response: ', response);
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
          artist: response.item.artists[0].name
        }
      });
    })
  }


  render() {
    const { loggedIn, nowPlaying } = this.state;

    return (
      <div className='app'>
        <h3>stormi's mvp</h3>
        {loggedIn ?
        <NowPlaying
          nowPlaying={nowPlaying}
          getNowPlaying={this.getNowPlaying}/>
        :
        <Login />}
      </div>
    )
  }
};

export default App;