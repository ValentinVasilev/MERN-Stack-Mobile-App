/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text} from 'native-base';

const CartItem = (props) => {
  const data = props.item.item.product;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <View style={styles.left}>
        <Image
          source={{
            uri: data.image
              ? data.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
          style={{ width: 100, height: 50 }}
          resizeMode="contain"
        />
      </View>

      <View
        style={styles.mainView}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.price}><Text style={{ color: 'green' }}>$</Text> {data.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
       display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 290,
          borderBottomWidth: 0.8,
          marginBottom: 25,
          backgroundColor: 'white',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  },
  name: {
    paddingTop: 10,
    marginBottom: 25,
    color: 'black',
    fontSize: 15,
  },
  price: {
    paddingTop: 10,
    marginBottom: 25,
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight: 5,
  },

});
export default CartItem;