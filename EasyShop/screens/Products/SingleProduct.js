/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  H1,
} from 'react-native';
import { Left, Right, Container } from 'native-base';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import * as actions from '../../Redux/actions/cartActions';
import EasyButton from '../../shared/StyledComponents/EasyButton';

const SingleProduct = props => {

  let item = props.route.params.item;

  const [availabilty, setAvailabilty] = useState('');


  return (
    <Container style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Image
            resizeMode="contain"
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            // style={styles.image}
            style={{ height: 100, width: 200 }}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{item.name}</Text>
          <Text style={styles.contentHeader}>{item.brand}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
      <View style={styles.bottomLeft}>
        <EasyButton medium primary onPress={() => {
          props.addItemToCart(item), Toast.show({
            topOffset: 60,
            type: 'success',
            text1: `${item.name} added to cart`,
            text2: 'Go to your Cart to complete order',
          });
        }} >
          <Text style={{ color: 'white' }}>Add</Text>
        </EasyButton >
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    marginLeft: 35,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    marginBottom: 80,
    padding: 5,
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100',
    height: '250',
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: 'red',
  },
  bottomLeft: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    margin: 20,
  },
});

const mapToDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product }))
  };
};

export default connect(null, mapToDispatchToProps)(SingleProduct);