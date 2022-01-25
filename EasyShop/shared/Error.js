/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Error = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.texT}>{props.message}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    margin: 10,
  },
  texT: {
    color: 'red',
  },
});

export default Error;