/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import ProductCard from './ProductCard';

var {width} = Dimensions.get('window');

const ProductList = props => {
  const {item} = props;
  console.log(item, 'Product List - item');
  //   console.log(item);

  return (
    <TouchableOpacity style={{width: '50%'}}>
      <View style={{width: width / 2, backgroundColor: 'gainsboro'}}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
