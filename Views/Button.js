"use strict";

import React, { Component } from 'react';
import {
    TouchabeOpacity,
    Text,
    StyleSheet,
    PropTypes,
    View
} from "react-native";

import StyleVars from "../StyleVars";

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        paddingVertical: 9,
        paddingHorizontal: 15,
        overflow: "hidden",
        backgroundColor: StyleVars.Colors.primary
    },

    buttonText: {
        color: "white",
        fontFamily: StyleVars.Fonts.general,
        fontSize: 14,
        fontWeight: "400"
    }
});

class Button extends Component {
    render() {
        return (
            <TouchabeOpacity
                activeOpacity={this.props.activeOpacity}
                onPress={() => this.onPress()}
                style={styles.button}>
                <Text>{this.props.children}</Text>
            </TouchabeOpacity>
        );
    }

    onPress() {
        if(this.props.enabled) {
            this.props.onPress();
        }
    }
}


Button.propTypes = {
    onPress: React.PropTypes.func,
    style: View.propTypes.style,
    textStyle: View.propTypes.style,
    activeOpacity: React.PropTypes.number,
    enabled: React.PropTypes.bool,
    children: React.PropTypes.string
};

Button.defaultProps = {
    onPress: () => {},
    style: {},
    textStyle: {},
    activeOpacity: 0.8,
    enabled: true
};

export default Button;