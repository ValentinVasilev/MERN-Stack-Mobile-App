/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartNavigator from './CartNavigator';
// Stacks
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="shopping-cart" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <Icon name="cog" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <Icon name="user" color={color} size={30} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
