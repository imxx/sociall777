"use strict";

import React, { Component } from "react";
import {
    Text,
    TouchableOpacity
} from "react-native";

import Actions from "../Actions";

export default class LogoutButton extends Component {
    render() {
        let style = { marginLeft: 10, color: "white" };

        return (
            <TouchableOpacity
                style={this.props.style}
                activeOpacity={0.5}
                onPress={() => this.onPress()}>
                <Text style={style}>Logout</Text>
            </TouchableOpacity>
        );
    }

    onPress() {
        console.log("Logout invocation.");
        Actions.logout();
    }
}