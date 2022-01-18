/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {StyleSheet, Text, useColorScheme, View, LogBox} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

// Navigators
import Main from './Navigators/Main';

// Screens
import ProductContainer from './screens/Products/ProductContainer';
import Header from './shared/Header';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

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
    <NavigationContainer>
      <NativeBaseProvider>
        {/* <View style={styles.container}> */}
        <Header />
        <Main />
        {/* </View> */}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
