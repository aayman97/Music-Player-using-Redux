import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import MediaPlayer from './Screens/MediaPlayer'
import {Provider} from 'react-redux'
import {store} from './Redux/Store'

export default function App() {

    return (

    <Provider store={store} >
       <MediaPlayer/>
    </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});