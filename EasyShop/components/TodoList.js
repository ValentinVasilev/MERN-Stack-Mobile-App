/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

const TodoList = () => {
  const [title, setTitle] = useState('Todo List');
  function changeTitle() {
    setTitle('Just a test!');
  }
  return (
    <View>
          <Text>{title}</Text>
      <Button title="Change Title" onPress={() => changeTitle}/>
    </View>
  );
};

export default TodoList;
