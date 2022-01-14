/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  // Text,
  FlatList,
} from 'react-native';
import ProductList from './ProductList';
import {
  Container,
  Header,
  Icon,
  Item,
  Input,
  Text,
  HStack,
  Heading,
  SearchIcon,
} from 'native-base';

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    return () => {
      setProducts([]);
    };
  }, []);
  return (
    <View>
      <Heading>Product Container</Heading>
      <HStack>
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          bg="transparent"
          borderRadius="10"
          py="1"
          px="2"
          placeholderTextColor="gray.500"
          _hover={{bg: 'gray.200', borderWidth: 0}}
          borderWidth="0"
          _web={{
            _focus: {style: {boxShadow: 'none'}},
          }}
          InputLeftElement={<SearchIcon size={6} />}
        />
      </HStack>
      <FlatList
        numColumns={2}
        // horizontal
        data={products}
        renderItem={({item}) => <ProductList key={item.id} item={item} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

export default ProductContainer;

const data = [
  {
    _id: {
      $oid: '5f15d8852a025143f9593a7c',
    },
    image:
      'https://lh3.googleusercontent.com/proxy/PHMeEUxncFvxo71Hbw80j6G8IEv8CHaKUPMbfIAU_XfRTkc-S72ohLqMtiU0Ch-yZG9flgxaK1VXh0W4aIzZawc1Z2Yi',
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
      $oid: '5f15d92ee520d44421ed8e9b',
    },
    image: '',
    brand: 'IKEA',
    price: 350.9,
    rating: 5,
    numReviews: 0,
    isFeatured: true,
    name: 'Garden Chair',
    description: 'beautiful chair for garden',
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