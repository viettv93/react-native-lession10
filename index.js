/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json'
import  ScreenView from './src/BaiTap/ScreenView' 
import Screen from './src/BaiTap/Lession1/Screen'
AppRegistry.registerComponent(appName, () =>  Screen);
