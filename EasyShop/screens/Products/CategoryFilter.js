/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, View} from 'react-native';
import {ListItem, Badge, Text, List} from 'native-base';

const CategoryFilter = props => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{backgroundColor: '#f2f2f2', height: 50}}>
      <TouchableOpacity
        style={{margin: 0, padding: 0, borderRadius: 0}}
        key={1}>
        <Badge style={[styles.center, {margin: 5, backgroundColor: 'red'}]}>
          <Text style={{color: 'white'}}>Name</Text>
        </Badge>
      </TouchableOpacity>
      {/* <List>
        <List.Item style={{margin: 0, padding: 0, borderRadius: 0}}></List.Item>
      </List> */}
      {/* <ListItem style={{margin: 0, padding: 0, borderRadius: 0}}>
        <TouchableOpacity
          key={1}
          // onPress
        >
          <Badge style={[styles.center, {margin: 5}]}>
            <Text style={{color: 'white'}}></Text>
          </Badge>
        </TouchableOpacity>
      </ListItem> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryFilter;
