/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Select } from 'native-base';
import FormContainer from '../../shared/Form/FormContainer';
import Input from '../../shared/Form/Input';
import EasyButton from '../../shared/StyledComponents/EasyButton';
import Error from '../../shared/Error';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-community/async-storage';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
// import * as ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { FileMimeTypeEnum } from '../../assets/common/FileMimeTypeEnum';
import mime from 'mime';

const mimeType = FileMimeTypeEnum;

const ProductForm = (props) => {

  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);




  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      // Populate data on edit page
      setItem(props.route.params.item);
      setBrand(props.route.params.item.brand);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setMainImage(props.route.params.item.image);
      setImage(props.route.params.item.image);
      setCategory(props.route.params.item.category._id);
      setCountInStock(props.route.params.item.countInStock.toString());
    }
    console.log('Category->', category)
    // console.log(props.route.params.item.category._id);
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    // Get Categories

    axios.get(`${baseURL}categories`)
      .then(res => setCategories(res.data))
      .catch(error => alert('Error to load categories'));


    // Whenever the component is destroted to clear the data
    return () => {
      setCategories([]);
    };
  }, []);

  function createBase64Url(
    imageData,
    mimeType) {
    if (!imageData) return '';

    return `data:${mimeType};base64,${imageData}`;
  }


  const OpenCamera = () => {

    launchCamera({ mediaType: 'photo', includeBase64: true, maxWidth: 300, maxHeight: 300 }, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User canceled image picker!');
      } else if (response.errorMessage) {
        console.log('Error -> ', response.errorMessage);
      } else {
        setImage(createBase64Url(response.assets[0]));
      }
    });
  };

  // const openImg = () => {
  //   launchImageLibrary();
  // };

  const addProduct = () => {
    if (
      name === '' ||
      brand === '' ||
      price === '' ||
      description === '' ||
      category === '' ||
      countInStock === ''
    ) {
      setError('Please fill in the form correctly');
    }

    // console.log("Image before ->", image);
    let formData = new FormData();
    const newImageUri = 'file:///' + image.split('file:/').join('');

    // formData.append('image', {
    //   uri: newImageUri,
    //   type: mime.getType(newImageUri),
    //   name: newImageUri.split('/').pop()
    // });
    // console.log("Image after ->", newImageUri);
    formData.append('image', {
      uri: newImageUri,
      type: mimeType.Jpg,
      name: newImageUri.split('/').pop()
    });

    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('richDescription', richDescription);
    formData.append('rating', rating);
    formData.append('numReviews', numReviews);
    formData.append('isFeatured', isFeatured);

    console.log('Form Data->', formData)
    const config = {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };

    if (item !== null) {
      axios
        .put(`${baseURL}products/${item.id}`, formData, config)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Product successfuly updated',
              text2: '',
            });
            setTimeout(() => {
              props.navigation.navigate('Products');
            }, 500)
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again'
          })
        })
    } else {
      axios
        .post(`${baseURL}products`, formData, config)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'New Product added',
              text2: '',
            });
            setTimeout(() => {
              props.navigation.navigate('Products');
            }, 500)
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
    }
  };

  return (
    <FormContainer title="Add Product">
      <View style={{ alignItems: 'center' }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
          <TouchableOpacity onPress={() => OpenCamera()} style={styles.imagePicker}>
            <Icon style={{ color: 'white' }} name="camera" />
            {/* <Button onPress={openImg} title="Image" /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.label}>
          <Text >Brand</Text>
        </View>
        <Input
          placeholder="Brand"
          name="brand"
          id="brand"
          value={brand}
          onChangeText={(text) => setBrand(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: 'underline' }}>Name</Text>
        </View>
        <Input
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: 'underline' }}>Price</Text>
        </View>
        <Input
          placeholder="Price"
          name="price"
          id="price"
          value={price}
          keyboardType={'numeric'}
          onChangeText={(text) => setPrice(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: 'underline' }}>Count in Stock</Text>
        </View>
        <Input
          placeholder="Stock"
          name="stock"
          id="stock"
          value={countInStock}
          keyboardType={'numeric'}
          onChangeText={(text) => setCountInStock(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: 'underline' }}>Description</Text>
        </View>
        <Input
          placeholder="Description"
          name="description"
          id="description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <View style={styles.label}>
          <Select
            mode="dropdown"
            iosIcon={<Icon color={'#007aff'} name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select your Category"
            selectedValue={pickerValue}
            placeholderStyle={{ color: '#007aff' }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
          >
            {categories.map((c) => {
              return <Select.Item key={c.id} label={c.name} value={c._id} />;
            })}
          </Select>
        </View>
        {err ? <Error message={err} /> : null}
        <View style={styles.buttonContainer}>
          <EasyButton
            large
            primary
            onPress={() => addProduct()}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </EasyButton>
        </View>
      </View>

    </FormContainer>
  );
};





const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 80,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default ProductForm;
