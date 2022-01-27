/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native"
import { Item, Select } from "native-base"
import FormContainer from '../../shared/Form/FormContainer';
import Input from '../../shared/Form/Input';
import EasyButton from '../../shared/StyledComponents/EasyButton';
import Error from "../../shared/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-community/async-storage"
import baseURL from '../../assets/common/baseURL';
import axios from "axios"

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
    // Get Categories

    axios.get(`${baseURL}categories`)
      .then(res => setCategories(res.data))
      .catch(error => alert("Error to load categories"))

    // Whenever the component is destroted to clear the data
    return () => {
      setCategories([])
    }
  }, []);


  return (
    <FormContainer title="Add Product">
      <View style={{ alignItems: 'center' }}>
        <View>
          <Image source={{ uri: mainImage }} />
          <TouchableOpacity>
            <Text>IMAGE</Text>
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
          <Text style={{ textDecorationLine: "underline" }}>Name</Text>
        </View>
        <Input
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Price</Text>
        </View>
        <Input
          placeholder="Price"
          name="price"
          id="price"
          value={price}
          keyboardType={"numeric"}
          onChangeText={(text) => setPrice(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Count in Stock</Text>
        </View>
        <Input
          placeholder="Stock"
          name="stock"
          id="stock"
          value={countInStock}
          keyboardType={"numeric"}
          onChangeText={(text) => setCountInStock(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: "underline" }}>Description</Text>
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
            iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select your Category"
            selectedValue={pickerValue}
            placeholderStyle={{ color: "#007aff" }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
          >
            {categories.map((c) => {
              return <Select.Item key={c.id} label={c.name} value={c.id} />
            })}
          </Select>
        </View>
        {err ? <Error message={err} /> : null}
        <View style={styles.buttonContainer}>
          <EasyButton
            large
            primary
          // onPress={() => addProduct()}
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
    width: "80%",
    marginTop: 10
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center"
  },
  buttonText: {
    color: "white"
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20
  }
})
export default ProductForm;