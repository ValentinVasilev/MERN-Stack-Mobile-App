/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { Text, Box, VStack, Image } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/actions/cartActions';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../../assets/common/baseURL';

var { height, width } = Dimensions.get('window');

const Confirm = (props) => {

  const finalOrder = props.route.params;
  // console.log('Final ORder ->', finalOrder.order.order);
  // Add this
  // const [productUpdate, setProductUpdate] = useState();
  // useEffect(() => {
  //   if (finalOrder) {
  //     getProducts(finalOrder);
  //   }
  //   return () => {
  //     setProductUpdate();
  //   };
  // }, [props]);

  // Add this
  // const getProducts = (x) => {
  //   const order = x.order.order;
  //   var products = [];
  //   if (order) {
  //     order.orderItems.forEach((cart) => {
  //       axios
  //         .get(`${baseURL}products/${cart.product}`)
  //         .then((data) => {
  //           products.push(data.data);
  //           setProductUpdate(products);
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     });
  //   }

  // };

  const confirmOrder = () => {

    const order = finalOrder.order.order;
    // console.log('Order ->', order);
    axios
      .post(`${baseURL}orders/create`, order)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Order Completed',
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate('Cart');
          }, 500);
          // console.log('Order successfully created!')
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
        // console.log(error)
      });


  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: 'orange' }}>
            <Text style={styles.title}>Shiping to: </Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
              <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
              <Text>City: {finalOrder.order.order.city}</Text>
              <Text>ZipCode: {finalOrder.order.order.zipcode}</Text>
              <Text>Country: {finalOrder.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items: </Text>
            {finalOrder.order.order.orderItems.map(x => {
              return (
                <Box style={styles.listItem} key={x.product.name}>
                  <View style={styles.body}>
                    <Image width={100} height={50} source={{ uri: x.product.image }} alt="test image" />
                    <Text style={{ alignSelf: 'center' }}>{x.product.name}</Text>
                    <Text style={{ paddingLeft: 15, fontSize: 15 }}>${x.product.price}</Text>
                  </View>
                </Box>
              )
            })}

          </View>
        ) : null}
        <View style={{ alignItems: 'center', margin: 20 }}>
          <Button title="Place Order" onPress={() => confirmOrder()} />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'space-between',
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',

  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};
export default connect(null, mapDispatchToProps)(Confirm);
