/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Item,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actions from '../../Redux/actions/cartActions';

var {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import { Box, Container, List, Thumbnail } from 'native-base';


const Cart = props => {
  let total = 0;
  props.cartItems.forEach(cart => {
    return (total += cart.product.price)
  });

  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <View style={{alignSelf: 'center'}}>
            {props.cartItems.map(data => {
              return (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <View style={styles.left}>
                    <Image
                      source={{
                        uri: data.product.image
                          ? data.product.image
                          : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                      }}
                      style={{width: 100, height: 50}}
                      resizeMode="contain"
                    />
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 200,
                      borderBottomWidth: 0.8,
                      marginBottom: 25,
                    }}>
                    <Text style={styles.name}>{data.product.name}</Text>
                    <Text style={styles.price}><Text style={{color: 'green'}}>$</Text> {data.product.price}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text style={{color: 'black'}}>Looks like your cart is empty.</Text>
          <Text style={{color: 'black'}}>Add products to your cart to get started.</Text>
        </Container>
      )}
      <Container style={styles.bottomContainer}>
        <View>
        <Text style={{color: 'red', fontSize: 18, paddingRight: 15, fontWeight: 'bold'}}> <Text style={{color: 'black'}}>Total Price:</Text> ${total}</Text>
        </View>
        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          <Button title="Clear"/>
        </View>
          <View style={{ paddingLeft: 15, paddingRight: 15}}>
          <Button title='Checkout' onPress={() => props.navigation.navigate('CheckOut')}/>
        </View>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  const {cartItems} = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    // width: width,
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    // marginRight: 200,
    paddingBottom: 10,
    paddingTop: 10,
  },
  name: {
    paddingTop: 10,
    marginBottom: 25,
    color: 'black',
    fontSize: 15,
    
    // borderBottomWidth: 0.8,
    // width: '50%',
  },
  price: {
    paddingTop: 10,
    marginBottom: 25,
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
    // borderBottomWidth: 0.8,
    // alignSelf: 'flex-end',
    // marginLeft: 50,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingBottom: 25,
  }
});
export default connect(mapStateToProps, null)(Cart);
