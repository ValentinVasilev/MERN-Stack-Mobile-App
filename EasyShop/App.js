/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import { StyleSheet, Text, useColorScheme, View, LogBox } from 'react-native';
import Toast from "react-native-toast-message";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

// Navigators
import Main from './Navigators/Main';

// Screens
import ProductContainer from './screens/Products/ProductContainer';
import Header from './shared/Header';

// Context API
import Auth from '../EasyShop/Context/store/Auth';

LogBox.ignoreAllLogs(true);

const App: () => Node = () => {
  const [title, setTitle] = useState('Todo List');
  function changeTitle(title) {
    if (title === 'Todo List') {
      setTitle('Just a test!');
    } else {
      setTitle('Todo List');
    }
  }
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <NativeBaseProvider>
            {/* <View style={styles.container}> */}
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
            {/* </View> */}
          </NativeBaseProvider>
        </NavigationContainer>
      </Provider>
    </Auth>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
