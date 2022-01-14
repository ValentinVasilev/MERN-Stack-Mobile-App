/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Image, SafeAreaView} from 'react-native';

function Header() {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require('../assets/Logo.png')}
        resizeMode="contain"
        style={{height: 50}}
      />
    </SafeAreaView>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 80,
  },
});
