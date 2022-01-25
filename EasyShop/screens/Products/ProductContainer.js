/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import {
  Input,
  HStack,
  SearchIcon,
  CloseIcon,
  Button,
  Text,
  ScrollView,
  Container,
} from 'native-base';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../shared/Banner';
import CategoryFilter from './CategoryFilter';
import { useFocusEffect } from '@react-navigation/native';

import baseURL from '../../assets/common/baseURL';
import axios from 'axios';


var { height } = Dimensions.get('window');

const ProductContainer = props => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect((
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios.get(`${baseURL}products`)
        .then(res => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        }).catch(err => {
          console.log('API call Error', err);
        });

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log('Api call error');
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };


    }, [])
  ));

  const searchProduct = text => {
    setProductsFiltered(
      products.filter(i => i.name.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories

  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
          setProductsCtg(
            products.filter((i) => i.category._id === ctg),
            setActive(true)
          ),
        ];
    }
  };

  return (
    <>
      {loading === false ? (
        <View>
          <HStack>
            <Input
              placeholder="Search"
              variant="outline"
              width="100%"
              bg="transparent"
              borderRadius="10"
              py="1"
              px="2"
              placeholderTextColor="gray.500"
              _hover={{ bg: 'gray.200', borderWidth: 0 }}
              borderWidth="2"
              _web={{
                _focus: { style: { boxShadow: 'none' } },
              }}
              InputLeftElement={<SearchIcon size={6} />}
              onFocus={openList}
              onChangeText={text => searchProduct(text)}
              InputRightElement={
                focus === true ? (
                  <Button onPress={onBlur} style={{ backgroundColor: 'transparent' }}>
                    <CloseIcon style={{ width: 15, height: 15 }} />
                  </Button>
                ) : null
              }
            />
          </HStack>
          {focus === true ? (
            <SearchedProduct
              productsFiltered={productsFiltered}
              navigation={props.navigation}
            />
          ) : (
            <ScrollView>
              <View>
                <Banner />
              </View>
              <View>
                <CategoryFilter
                  categories={categories}
                  categoryFilter={changeCtg}
                  productsCtg={productsCtg}
                  active={active}
                  setActive={setActive}
                />
              </View>
              {productsCtg.length > 0 ? (
                <View style={styles.listContainer}>
                  {productsCtg.map(item => {
                    return (
                      <ProductList
                        key={item._id.$oid}
                        item={item}
                        navigation={props.navigation}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={([styles.center], { height: '40%' })}>
                  <Text>No Products found!</Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      ) : (
        // Loading
        <Container style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
          <ActivityIndicator
            size='large'
            color='red'
          />
        </Container>
      )}

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProductContainer;

const data = [
  {
    _id: {
      $oid: '5f15d8852a025143f9593a7c',
    },
    image: '../../assets/data/fifa20.jpg',
    brand: 'PS3',
    price: 250,
    rating: 1,
    numReviews: 0,
    isFeatured: true,
    name: 'FIFA 20',
    description: 'The most hard FIFA ever',
    category: {
      $oid: '5f15d5cdcb4a6642bddc0fe9',
    },
    countInStock: 25,
    __v: 0,
  },
  {
    _id: {
      $oid: '5f15d92ee520d44421ed8e4b',
    },
    image: '',
    brand: 'IKEA',
    price: 0.5,
    rating: 5,
    numReviews: 0,
    isFeatured: true,
    name: 'Kiros`s Kashon',
    description: 'Kiro`s kashon',
    category: {
      $oid: '5f15d5b7cb4a6642bddc0fe8',
    },
    countInStock: 10,
    __v: 0,
  },

  {
    _id: {
      $oid: '5f15d964e520d44421ed8e9c',
    },
    image: '',
    brand: 'OBI',
    price: 1350.9,
    rating: 5,
    numReviews: 0,
    isFeatured: true,
    name: 'Swimming Pool',
    description: 'beautiful Swimming Pool for garden',
    category: {
      $oid: '5f15d5b7cb4a6642bddc0fe8',
    },
    countInStock: 10,
    __v: 0,
  },
  {
    _id: {
      $oid: '5f15d9b3e520d44421ed8e9d',
    },
    image:
      'https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w',
    brand: 'OBI',
    price: 490.9,
    rating: 5,
    numReviews: 0,
    isFeatured: true,
    name: 'Grass Cut Machine',
    description: 'Grass Cut Machine for garden',
    category: {
      $oid: '5f15d5b7cb4a6642bddc0fe8',
    },
    countInStock: 5,
    __v: 0,
  },
  {
    _id: {
      $oid: '5f15da13e520d44421ed8e9e',
    },
    image:
      'https://lh3.googleusercontent.com/proxy/ZqRo12bOfeU7xg7mTMfgENdMop_Zl9srLYDKeFilLCZkych8UO4ldDlRzT-8q5scq35krZsqxprZA85RdGLEVvejnPY4RRfNZ1eXDUJRoqHHRWBB5iMCx7UxT4l6iA',
    brand: 'Mobilix',
    price: 1000,
    rating: 5,
    numReviews: null,
    isFeatured: true,
    name: 'Sofa',
    description: 'Big Sofa for living room',
    category: {
      $oid: '5f15d5b2cb4a6642bddc0fe7',
    },
    countInStock: 2,
    __v: 0,
  },
];
