/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { View, Button } from 'react-native';
import {Select } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import FormContainer from '../../../shared/Form/FormContainer';
import Input from '../../../shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/tools';

const countries = require('../../../assets/data/countries.json');

const Checkout = (props) => {

    const [orderItems, setOrderItems] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [country, setContry] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        setOrderItems(props.cartItems);

        return () => {
                setOrderItems();
        };
    }, []);
    // console.log('orderItems -->', props)
    // console.log('Cat Items ==>', props.cartItems);
    // console.log('orderItems ---->', orderItems);
    const CheckOut = () => {
        let order = {
            city,
            country,
            dateOrder: Date.now(),
            orderItems: orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            zipcode,
        };
        props.navigation.navigate('Payment', { order: order });
    };

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer
            title={'Shipping Address'}
            >
                <Input
                    placeholder={'Phone'}
                    name={'phone'}
                    value={phone}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPhone(text)}
                />
                   <Input
                    placeholder={'Shipping Address'}
                    name={'shipping address'}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                    <Input
                    placeholder={'Shipping Address 2'}
                    name={'shipping address 2'}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                      <Input
                    placeholder={'City'}
                    name={'city'}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                        <Input
                    placeholder={'ZipCode'}
                    name={'Zip code'}
                    value={zipcode}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setZipcode(text)}
                />
                <View >
                    <Select
                        mode="dropdown"
                        dropdownIcon={<Icon name="arrow-down" color={'#007aff'} />}
                        iosIcon={<Icon name="arrow-down" color={'#007aff'} />}
                        style={{ width: undefined }}
                        selectedValue={country}
                        placeholder="Select your country"
                        placeholderStyle={{ color: '007aff' }}
                        placeholderIconColor="#007aff"
                        onValueChange={(e) => setContry(e)}
                    >
                        {countries.map((c) => {
                            return (
                                <Select.Item key={c.code} label={c.name} value={c.name} />
                            );
                   })}
                </Select>
                </View>
                <View style={{width: '80%', alignItems: 'center'}}>
                   <Button title="Confirm" onPress={() => CheckOut()}/>
                </View>
            </FormContainer>
    </KeyboardAwareScrollView>
);
};
const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

export default connect(mapStateToProps)(Checkout)