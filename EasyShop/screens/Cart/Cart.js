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
import {Box, Container, List, Thumbnail} from 'native-base';

const Cart = props => {
  //   console.log(props.cartItems[1].product.image);

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
                    }}>
                    <Text style={styles.name}>{data.product.name}</Text>
                    <Text style={styles.price}>${data.product.price}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty.</Text>
          <Text>Add products to your cart to get started.</Text>
        </Container>
      )}
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
    // borderBottomWidth: 0.8,
    // width: '50%',
  },
  price: {
    paddingTop: 10,
    marginBottom: 25,
    // borderBottomWidth: 0.8,
    // alignSelf: 'flex-end',
    // marginLeft: 50,
  },
});
export default connect(mapStateToProps, null)(Cart);
