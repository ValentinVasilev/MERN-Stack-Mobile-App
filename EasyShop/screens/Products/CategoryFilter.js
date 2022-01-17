/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, View} from 'react-native';
import {ListItem, Badge, Text, List} from 'native-base';

const CategoryFilter = props => {
  const {categories} = props;
  //   const {productsCtg} = props;
  //   props.categories.map(ctg => console.log(ctg));
  //   console.log(props.categories[2].name);
  //   console.log(categories.map(i => i.name));
  console.log(categories.map(i => i.name));
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{backgroundColor: '#f2f2f2', height: 50}}>
      <TouchableOpacity
        style={{margin: 0, padding: 0, borderRadius: 0}}
        key={1}
        onPress={() => {
          props.categoryFilter('all');
          props.setActive(-1);
        }}>
        <Badge
          style={[
            styles.center,
            {margin: 5, backgroundColor: 'red', borderRadius: 20},
            props.active === -1 ? styles.active : styles.inActive,
          ]}>
          <Text style={{color: 'white'}}>All</Text>
        </Badge>
      </TouchableOpacity>
      {categories.map(item => {
        return (
          <TouchableOpacity
            style={{margin: 0, padding: 0, borderRadius: 0}}
            key={item._id}
            onPress={() => {
              props.categoryFilter(item._id);
              props.setActive(props.categories.indexOf(item));
            }}>
            <Badge
              style={[
                styles.center,
                {margin: 5, backgroundColor: 'red', borderRadius: 20},
                props.active === props.categories.indexOf(item)
                  ? styles.active
                  : styles.inActive,
              ]}>
              <Text style={{color: 'white'}}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#03bafc',
  },
  inActive: {
    backgroundColor: '#a0e1eb',
  },
});

export default CategoryFilter;
