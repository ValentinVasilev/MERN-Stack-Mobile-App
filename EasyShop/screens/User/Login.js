/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../shared/Form/FormContainer';
import Input from '../../shared/Form/Input';
import Error from '../../shared/Error';
import EasyButton from '../../shared/StyledComponents/EasyButton';

// Context
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';


const Login = (props) => {

  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("UserProfile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };
  return (
    <FormContainer title={'Login'}>
      <View style={styles.view}>
        <Input
          placeholder={'Enter Email'}
          name={'email'}
          id={'email'}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={'Enter Password'}
          name={'password'}
          id={'password'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <EasyButton primary large onPress={() => handleSubmit()}>
            <Text style={{ color: "white" }}>Login</Text>
          </EasyButton>
        </View>
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <Text style={styles.middleText}>Don't have an account yet ?</Text>
          <EasyButton secondary large onPress={() => props.navigation.navigate('Register')} >
            <Text style={{ color: "white" }}>Register</Text>

          </EasyButton>
        </View>
      </View>
    </FormContainer>
  );
};


const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});
export default Login;
