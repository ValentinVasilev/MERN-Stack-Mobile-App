/* eslint-disable prettier/prettier */
import React from 'react';
import { ScrollView, Dimensions, Text, StyleSheet } from 'react-native';

var { width } = Dimensions.get('window');

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 400,
        width: width,
        justifyContent: 'center',
        alignContent: 'center',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center'
    },
});
export default FormContainer;
