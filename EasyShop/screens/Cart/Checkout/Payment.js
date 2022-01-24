/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import {Container, Heading, VStack, Divider, Box, Radio, Picker, Select} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const methods = [
{name: 'Cash on Delivery', value: 1},
{name: 'Bank Transfer', value: 2},
{name: 'Card Payment', value: 3},
];

const paymentCards = [
  {name: 'Wallet', value: 1},
  { name: 'Visa', value: 2 },
  {name: 'MasterCard', value: 3},
  {name: 'Other', value: 4},
];


const Payment = (props) => {

  const order = props.route.params;
  const [select, setSelected] = useState('');
  const [card, setCard] = useState('');

    return (
        <View>
        <Container>
          <Heading p={'4'} fontSize={'xl'}>Choose your payment Method</Heading>
          <VStack space={1} alignItems="center" mt={3}>
            <View>
            {methods.map(method => {
              return (
                <Box>
                  <Radio.Group
                    value={select}
                    onChange={(nextValue) => {
                      setSelected(nextValue);
}}
                  >
                    <Radio value={method.value} my='1'>
                       <Text style={{fontSize: 20, paddingLeft: 15}} fontSize="lg" onPress={() => setSelected(method.value)}>
                        {method.name} 
                  </Text>
                    </Radio>
                    </Radio.Group>
                  <Divider my={'2'} thickness="3" />
                  </Box>
              );
            })}
              {select === 3 ? (
                <Select
                  mode="dropdown"
                  dropdownIcon={<Icon name="arrow-down" color={'#007aff'} />}
                  iosIcon={<Icon name="arrow-down" color={'#007aff'} />}
                  headerBackButtonTextStyle={{ color: '#fff' }}
                  headerTitleStyle={{ color: 'fff' }}
                  selectedValue={card}
                  onValueChange={(x) => setCard(x)}
                  placeholder="Choose Payment Method"
                >
                  {paymentCards.map((c, index) => {
                    return (
                      <Select.Item key={c.name} label={c.name} value={c.name}/>
                  )
                })}
                </Select>
              ) : null}
              <View style={{marginTop: 60, alignSelf: 'center'}}>
                <Button title='Confirm' onPress={() => props.navigation.navigate('Confirm', {order})}/>
              </View>
            </View>
         </VStack>
            </Container>
        </View>
    );
};

export default Payment;