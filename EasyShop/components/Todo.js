/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';

const Todo = props => {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
};

export default Todo;
