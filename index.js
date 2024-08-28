import * as React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

import {Provider} from 'react-redux';
import { store } from './src/Redux/store';

class MainComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => MainComponent);