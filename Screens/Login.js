"use strict";

import React, { Component } from "react";
import {
    View,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

import DeviceInfo from "react-native-device-info";
import {StatusBar} from 'react-native';

import Routes from "../Views/Routes";
import Reflux from "reflux";
import Actions from "../Actions";

import DataStore from "../DataStore";

import Button from "../Views/Button";
import StyleVars from "../StyleVars";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StyleVars.Colors.primary
    },

    scrollView: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: StyleVars.Colors.primary,
        overflow: "visible"
    },

    innerContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: windowHeight - 2 - StatusBar.currentHeight, // android quirk
        width: windowWidth,
        paddingTop: windowHeight * 0.05,
        backgroundColor: StyleVars.Colors.primary
    },

    socialLogo: {
        width: windowWidth * 0.6,
        height: windowHeight * 0.25,
        //tintColor: StyleVars.Colors.secondary
    },

    socialText: {
        color: "white",
        fontSize: 30,
        marginTop: 8,
        fontWeight: "600",
        fontFamily: StyleVars.Fonts.logo,
        marginBottom: 15
    },

    horizontalLine: {
        flex: 1,
        height: 1,
        marginTop: 2,
        marginHorizontal: 10,
        backgroundColor: "rgba(255,255,255, 0.2)"
    },

    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 48,
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.5)"
    },

    footerText: {
        color: "white",
        fontFamily: StyleVars.Fonts.general,
        fontSize: 14
    },

    footerActionText: {
        fontWeight: "600"
    },

    inputContainer: {
        width: windowWidth * 0.8,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        borderBottomColor: "rgb(255,255,255)",
        borderBottomWidth: 1
    },

    input: {
        flex: 1,
        height: 40,
        backgroundColor: StyleVars.Colors.primary,
        color: "white",
        fontFamily: StyleVars.Fonts.general,
        fontSize: 16,
        padding: 5
    },

    loginButtonContainer: {
        marginTop: 5,
        width: windowWidth * 0.8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    loginButton: {
        width: windowWidth * 0.8,
        paddingVertical: 12,
        backgroundColor: "rgba(255,255,255,0.25)"
    }
});

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = { isSignup: false };

        this.email = null;
        this.password = null;
        this.passwordConfirmation = null;
    }

    componentDidMount() {
        this.loadUserUnsubscribe = Actions.loadUser.completed.listen(this.onLoadUserCompleted.bind(this));
    }

    componentWillUnmount() {
        this.loadUserUnsubscribe();
    }

    render() {
        let footerText = this.state.isSignup ? (
            <Text style={styles.footerText}>
                Already signed up? <Text style={styles.footerActionText}>Login.</Text>
            </Text>
        ) : (
            <Text style={styles.footerText}>
                Don't have an account? <Text style={styles.footerActionText}>Sign Up.</Text>
            </Text>
        );

        return (
            <View style={styles.container}>
                <ScrollView
                    ref="scrollview"
                    keyboardShouldPersistTaps={false}
                    automaticallyAdjustContentInserts={true}
                    alwaysBounceVertical={false}
                    style={styles.ScrollView}>
                    <View style={styles.innerContainer}>
                        <Image source={require("./../social.jpg")} style={styles.socialLogo} />
                        <Text style={styles.socialText}>SOCIAL</Text>
                        {this.renderForm()}
                    </View>
                    <View style={styles.horizontalLine}/>
                    <TouchableOpacity 
                        style={styles.footer}
                        activeOpacity={0.8}
                        onPress={() => this.changeSignup()}>
                        {footerText}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    renderForm() {
        let passwordConfirmationField = this.state.isSignup ? (
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={(ref) => this._passwordConfirmationRef = ref}
                        placeholder="Password Confirmation"
                        placeholderTextColor="rgba(255,255,255,0.75)"
                        secureTextEntry={true}
                        selectionColor="white"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(password) => this.passwordConfirmation = password}
                        returnKeyType="next"
                        onSubmitEditing={() => this.submitForm()}/>
                </View>
            ) : null;

        let passwordReturnKeyType = this.state.isSignup ? "next" : "go";

        return (
            <View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="rgba(255,255,255,0.75)"
                        keyboardType="email-address"
                        selectionColor="white"
                        style={styles.input}
                        autoFocus={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(email) => this.email = email}
                        returnKeyType="next"
                        onSubmitEditing={() => this._passwordRef.focus()}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={(ref) => this._passwordRef = ref}
                        placeholder="Password"
                        placeholderTextColor="rgba(255,255,255,0.75)"
                        secureTextEntry={true}
                        selectionColor="white"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(password) => this.password = password}
                        returnKeyType={ passwordReturnKeyType }
                        onSubmitEditing={() => this.state.isSignup ? this._passwordConfirmationRef.focus() : this.submitForm()}/>
                </View>
                {passwordConfirmationField}
                <View style={styles.loginButtonContainer}>
                    <Button
                        onPress={() => this.submitForm()}
                        textStyle={{fontSize: 14}}
                        additionalStyles={styles.loginButton}>
                        {this.state.isSignup ? "Sign Up" : "Login"}
                    </Button>
                </View>
            </View>
        );
    }

    changeSignup() {
        this.setState({ isSignup: !this.state.isSignup });
    }

    submitForm() {
        if(this.state.isSignup) {
            if(!this.email || !this.password || !this.passwordConfirmation)
                return console.error("Missing input fields");
            if(this.password !== this.passwordConfirmation)
                return console.error("Passwords don't match");

            Actions.signup({
                email: this.email,
                password: this.password
            });
        }else{
            Actions.login({
                email: this.email,
                password: this.password
            });
        }
    }

    onLoadUserCompleted(user) {
        if(user.onboarded)
            this.props.replaceRoute(Routes.home());
        else
            this.props.replaceRoute(Routes.onboarding(user))
    }
}