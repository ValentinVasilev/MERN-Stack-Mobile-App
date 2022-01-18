/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet, Text, ScrollView, Button} from 'react-native';
import {Left, Right, Container, H1} from 'native-base';

const SingleProduct = props => {
  //   const [item, setItem] = useState(props.route.params.item);
  let item = props.route.params.item;
  //   const [item, setItem] = useState(props.item);
  console.log('Hello! item', item);
  console.log('item ->', item);
  const [availabilty, setAvailabilty] = useState('');

  return (
    <Container style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          {/* <Image
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            resizeMode="contain"
            style={styles.image}
          /> */}
          <Text>{item.name}</Text>
          <Image source={{uri: item.image}} />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
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
});

export default SingleProduct;
