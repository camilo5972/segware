import React, { Component } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { AppProvider } from './AppContext';
import { getAuthor, getPosts, getTheme } from './utils';
import ListPosts from './containers/ListPosts';
import SplashScreen from './containers/SplashScreen';
import { SPLASH_TIME, WS_HOST, UPDATE_LIST } from './utils/constants';

export default class App extends Component {

  state = {
    splashscreen: true,
    posts: [],
    author: null,
    theme: 'main',
    ws: null
  };
  
  async componentDidMount() {
    this.setState({ posts: await getPosts(), author: await getAuthor(), theme: await getTheme() });
    setTimeout(() => {
      this.setState({ splashscreen: false, ws: this.initWS() });
    }, SPLASH_TIME);
  }

  async updateState(newState) {
    await this.setState({ ...this.state, ...newState});
  }

  initWS() {
    const ws = new WebSocket(WS_HOST);
    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.action === UPDATE_LIST) {
        if (data.author !== this.state.author) this.setState({ posts: await getPosts() });
      }
    };
    ws.onerror = (error) => {
      console.trace(error);
    };
    return ws;
  }

  render() {
    return this.state.splashscreen
    ?
      <SplashScreen />
    :
      <AppProvider value={{state: this.state, updateState: this.updateState.bind(this)}}>
        <StatusBar hidden={true} />
        <SafeAreaView style={{flex: 1}}>
          <ListPosts />
        </SafeAreaView>
      </AppProvider>
  }
}