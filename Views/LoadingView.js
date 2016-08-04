"use strict";

import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
    PropTypes,
    StyleSheet,
    Text
} from "react-native";

import StyleVars from "../StyleVars";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: StyleVars.Colors.mediumBackground
    },

    text: {
        fontFamily: StyleVars.Fonts.general,
        color: StyleVars.Colors.primary,
        textAlign: "center",
        marginTop: 12
    }
});

export default class LoadingView extends Component {
    render() {
        return (
            <View style={[styles.container, /*containerStyle */]}>
                <ActivityIndicator color={StyleVars.Colors.primary}/>
                <Text style={styles.text}>{this.props.children}</Text>
            </View>
        );
    }
}