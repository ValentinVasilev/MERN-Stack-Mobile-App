/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
import {Container, Left, Body, ListItem, Thumbnail, Text} from 'native-base';

var {width} = Dimensions;

const SearchedProduct = props => {
  const {productsFiltered} = props;
  return (
    // <Container style={{width: width}}>
    //   {productsFiltered.length > 0 ? (
    //     productsFiltered.map(item => {
    //       <ListItem key={item._id.$oid} avatar>
    //         <Left>
    //           <Thumbnail
    //             source={{
    //               uri: item.image
    //                 ? item.image
    //                 : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
    //             }}
    //           />
    //         </Left>
    //         <Body>
    //           <Text>{item.name}</Text>
    //           <Text note>{item.description}</Text>
    //         </Body>
    //       </ListItem>;
    //     })
    //   ) : (
    //     <View style={styles.center}>
    //       <Text style={{alignSelf: 'center'}}>No Products Match!</Text>
    //     </View>
    //   )}
    // </Container>
    <ScrollView>
      {productsFiltered.map(item => {
        return (
          <View>
            <Text>{item.brand}</Text>
            <Text>{item.name}</Text>
            <Text note>{item.description}</Text>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{
                uri: item.image
                  ? item.image
                  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
              }}
            />
            <Text>________________________________</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  image: {
    width: 80,
    height: 60,
    backgroundColor: 'transparent',
    // position: 'absolute',
    // top: -45,
  },
});

export default SearchedProduct;
