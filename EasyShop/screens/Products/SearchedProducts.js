/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Container,
  Left,
  Body,
  ListItem,
  Thumbnail,
  Text,
  Content,
} from 'native-base';

const SearchedProduct = props => {
  const {productsFiltered} = props;
  return (
    <Container>
      {productsFiltered.length > 0 ? (
        productsFiltered.map(item => {
          <ListItem key={item._id.$oid} avatar>
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>;
        })
      ) : (
        <View style={styles.center}>
          <Text style={{alignSelf: 'center'}}>No Products Match!</Text>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default SearchedProduct;