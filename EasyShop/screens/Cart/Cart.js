/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as actions from '../../Redux/actions/cartActions';
import { SwipeListView } from 'react-native-swipe-list-view';
import CartItem from './CartItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import EasyButton from '../../shared/StyledComponents/EasyButton';
import AuthGlobal from '../../Context/store/AuthGlobal';
var { height } = Dimensions.get('window');

import { connect } from 'react-redux';
import { Container } from 'native-base';


const Cart = props => {

  const context = useContext(AuthGlobal);

  let total = 0;
  props.cartItems.forEach(cart => {
    return (total += cart.product.price);
  });

  return (
    <>
      {props.cartItems.length ? (
        <Container style={styles.mainContainer}>
          <View style={{ width: '100%' }}>
            <SwipeListView
              data={props.cartItems}
              renderItem={(data) => (
                <CartItem item={data} />
              )}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    style={styles.hiddenButton}
                    onPress={() => props.removeFromCart(data.item)}
                  >
                    <Icon name="trash" style={{ color: 'white', alignSelf: 'center' }} size={40} />
                  </TouchableOpacity>
                </View>

              )}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            />
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text style={{ color: 'black' }}>Looks like your cart is empty.</Text>
          <Text style={{ color: 'black' }}>Add products to your cart to get started.</Text>
        </Container>
      )}
      {props.cartItems.length ? (<Container style={styles.bottomContainer}>
        <View>
          <Text style={{ color: 'green', fontSize: 18, paddingRight: 15, fontWeight: 'bold' }}> <Text style={{ color: 'black' }}>Total:</Text> ${total.toFixed(2)}</Text>
        </View>
        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          <EasyButton danger medium onPress={() => props.clearCart()}>
            <Text style={{ color: 'white' }}>Clear</Text>
          </EasyButton>

        </View>
        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          {context.stateUser.isAuthenticated ? (
            <EasyButton
              primary
              medium
              onPress={() => props.navigation.navigate('Checkout')}
            >
              <Text style={{ color: 'white' }}>Checkout</Text>
            </EasyButton>
          ) : (
            <EasyButton
              secondary
              medium
              onPress={() => props.navigation.navigate('Login')}
            >
              <Text style={{ color: 'white' }}>Login</Text>
            </EasyButton>
          )}
        </View>
      </Container>)
        : (
          null
        )
      }

    </>
  );
};

const mapStateToProps = state => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};
const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingBottom: 25,
  },
  hiddenContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  hiddenButton: {
    backgroundColor: 'red',
    height: 56,
    width: 75,
  },
  mainContainer: {
    // borderColor: 'green',
    // borderWidth: 1,
    display: 'flex',
    position: 'relative',
    maxWidth: '100%',
    backgroundColor: 'white',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
