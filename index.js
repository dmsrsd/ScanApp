// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';

class MainComponent extends React.Component {
  render() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }
}

AppRegistry.registerComponent(appName, () => MainComponent);