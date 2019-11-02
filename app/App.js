import React, { Component } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { AppProvider } from './AppContext';
import { getAuthor, getPosts, getTheme } from './utils';
import ListPosts from './containers/ListPosts';
import SplashScreen from './containers/SplashScreen';
import { SPLASH_TIME } from './utils/constants';

export default class App extends Component {

  state = {
    splashscreen: true,
    posts: [],
    author: null,
    theme: 'main'
  };
  
  async componentDidMount() {
    this.setState({ posts: await getPosts(), author: await getAuthor(), theme: await getTheme() });
    setTimeout(() => {
      this.setState({ splashscreen: false });
    }, SPLASH_TIME);
  }

  async updateState(newState) {
    await this.setState({ ...this.state, ...newState});
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