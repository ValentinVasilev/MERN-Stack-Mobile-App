/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Input, StatusBar, HStack, Box } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import ListItem from './ListItem';
import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-community/async-storage';
// import ProductList from '../Products/ProductList';
import EasyButton from '../../shared/StyledComponents/EasyButton';
var { height, width } = Dimensions.get('window');


const ListHeader = () => {
  return (
    <View
      elevation={1}
      style={styles.listHeader}
    >
      <View style={styles.headerItem} />
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '600' }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '600' }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '600' }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: '600' }}>Price</Text>
      </View>
    </View>
  )
}

const Products = (props) => {

  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();


  useFocusEffect(
    useCallback(
      () => {
        // Get Token
        AsyncStorage.getItem('jwt')
          .then((res) => {
            setToken(res)
          })
          .catch((error) => console.log(error));

        axios
          .get(`${baseURL}products`)
          .then((res) => {
            setProductList(res.data);
            setProductFilter(res.data);
            setLoading(false);
          })

        return () => {
          setProductList();
          setProductFilter();
          setLoading(true);
        }
      },
      [],
    )
  );
  const searchProduct = (text) => {
    if (text === '') {
      setProductFilter(productFilter)
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products)
      })
      .catch((error) => console.log(error));
  };


  return (

    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate('Orders')}
        >
          <Icon name="shopping-bag" size={18} color="white" />
          <Text style={styles.buttonText}>Orders</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate('Product Form')}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Products</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate('Categories')}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Categories</Text>
        </EasyButton>
      </View>
      <View>
        <StatusBar />
        <Box safeAreaTop />
        <HStack style={{ width: width / 2 }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Icon name="search" size={27} />
            <Input placeholder="Search" style={{ width: width / 1.1 }} onChangeText={(text) => searchProduct(text)} />
          </View>
        </HStack>

      </View>

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteProduct}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro'
  },
  headerItem: {
    margin: 3,
    width: width / 6
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    marginBottom: 160,
    backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 20,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    marginLeft: 4,
    color: 'white'
  }
})
export default Products;
