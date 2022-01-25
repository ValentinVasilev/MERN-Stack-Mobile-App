/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../shared/Form/FormContainer';
import Input from '../../shared/Form/Input';
import Error from '../../shared/error';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import baseURL from '../../assets/common/baseURL';

const Register = (props) => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = () => {
    if (email === '' ||
      name === '' ||
      phone === '' ||
      password === '') {
      setError('Please fill in the form correctly');
    }

    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };

    axios.post(`${baseURL}users/register`, user)
      .then(res => {
        if (res.status(200)) {
          setTimeout(() => {
            props.navigation.navigate('Login');
          }, 500)
        }
      })
      .catch(err => {
        console.log(error)
      });
  };

  return (
    // <KeyboardAwareScrollView
    //   viewIsInsideTabBar={true}
    //   extraHeight={200}
    //   enableOnAndroid={true}
    // >
    <>

      <FormContainer title={'Register'} />
      <Input
        placeholder={'Email'}
        name="email"
        id="email"
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={'Name'}
        name="name"
        id="name"
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder={'Phone Number'}
        name="phone"
        id="phone"
        type="numeric"
        onChangeText={(text) => setPhone(text)}
      /><Input
        placeholder={'Password'}
        name="password"
        id="password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <View>
        {error ? <Error message={error} /> : null}
      </View>
      <View style={styles.btnView}>
        <Button title={'Register'} onPress={() => register()} />
      </View>
      <View style={styles.btnView}>
        <Button title={'Back to Login'} onPress={() => props.navigation.navigate('Login')} />
      </View>
    </>
    // </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  btnView: {
    padding: 15,
  }
})
export default Register;