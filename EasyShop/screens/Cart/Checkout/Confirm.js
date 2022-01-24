/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button} from 'react-native';
import { Text, Box, VStack, Image } from 'native-base';
import { connect } from "react-redux";
import * as actions from '../../../Redux/actions/cartActions';

var { height, width } = Dimensions.get('window');
const Confirm = (props) => {
  const confirm = props.route.params;

  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate('Cart');
    }, 500)
  }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
                {props.route.params ? (
                    <View style={{borderWidth: 1, borderColor: 'orange'}}>
                        <Text style={styles.title}>Shiping to: </Text>
              <View style={{padding: 8}}>
                <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
                <Text>City: {confirm.order.order.city}</Text>
                <Text>ZipCode: {confirm.order.order.zipCode}</Text>
                <Text>Country: {confirm.order.order.country}</Text>
              </View>
              <Text style={styles.title}>Items: </Text>
              {confirm.order.order.orderItems.map(x => {
                return (
                  <Box style={styles.listItem} key={x.product.name}>
                    <VStack space="2" alignItems="center">
                    </VStack>
                    <View style={styles.body}>
                      <Image width={100} height={50} source={{ uri: x.product.image }} alt="react-native" />
                      <Text style={{alignSelf: 'center'}}>{x.product.name}</Text>
                      <Text style={{paddingLeft: 15, fontSize: 15}}>${x.product.price}</Text>
                    </View>
                  </Box>
                )
               })}
             
            </View>
          ) : null}
          <View style={{alignItems: 'center', margin: 20}}>
               <Button title="Place Order" onPress={() => confirmOrder()}/>
          </View>
             </View>
       </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    title: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
     alignContent: 'space-between',
    width:width/ 1.2,
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
   
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};
export default connect(null, mapDispatchToProps)(Confirm);