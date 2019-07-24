import React from 'react';
import { StyleSheet, Text, View , I18nManager , AsyncStorage} from 'react-native';
import { Root } from "native-base";
import AppNavigator from './src/routes';
import {Font} from "expo";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import './ReactotronConfig';


// export default function App() {
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.loadFontAsync();
    this.state = {
      fontLoaded: false
    };
  }


  componentWillMount() {
    I18nManager.forceRTL(true);
    console.log("mmmm",I18nManager.isRTL);
    // AsyncStorage.clear();
  }


  async loadFontAsync() {
    try {
      await Font.loadAsync({ RegularFont: require("./assets/fonts/DINNextLTW23-Regular.ttf") });
      await Font.loadAsync({ BoldFont: require("./assets/fonts/DINNextLTW23-Bold.ttf") });
      await Font.loadAsync({ Roboto: require("native-base/Fonts/Roboto.ttf") });
      await Font.loadAsync({ Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf") });
      this.setState({ fontLoaded: true });
    } catch (e) {
      console.log(e);
    }
  }


  render() {

    if (!this.state.fontLoaded) {
      return <View />;
    }

    return (
        <Provider store={store}>
          <PersistGate persistor={persistedStore}>
            <Root>
              <AppNavigator />
            </Root>
          </PersistGate>
        </Provider>
    );
  }


}
