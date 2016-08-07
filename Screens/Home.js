"use strict"

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from "react-native";

import Button from "../Views/Button";
import LoadingView from "../Views/LoadingView";
import SharedStyles from "../SharedStyles";
import StyleVars from "../StyleVars";
import Actions from "../Actions";
import Routes from "../Views/Routes";

import DataStore from  "../DataStore";

const styles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 96,
        alignItems: "center"
    },
    reloadText: {
        textAlign: "center",
        marginVertical: 20
    },
    button: { width: 256 }
});

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            failed: true //false
        };
    }

    componentWillMount() {
        Actions.auth();
    }

    componentDidMount() {
        this.loadUserCompletedUnsubscribe = Actions.loadUser.completed.listen(this._onLoadUserCompleted.bind(this));
        this.logoutUnsubscribe = Actions.logout.listen(this._onLogout.bind(this));
    }

    componentWillUnmount() {
        this.loadUserCompletedUnsubscribe();
        this.logoutUnsubscribe();
    }

    render() {
        if(this.state.failed){
            return (
                <View style={[SharedStyles.screenContainer, styles.buttonContainer]}>
                    <Text style={[SharedStyles.headingText, styles.reloadText]}>
                        Could not fetch posts.
                    </Text>
                    <Button onPress={() => this._retryFetch()} style={styles.button}>
                        Retry Now
                    </Button>
                </View>
            );
        }else if(this.state.loaded){
            return (
                <View style={SharedStyles.screenContainer}/>
            );
        }else{
            return (
                <LoadingView backgroundColor={StyleVars.Colors.mediumBackground}>
                    Loading...
                </LoadingView>
            );
        }
    }

    _retryFetch() {

    }

    _onLoadUserCompleted() {
        let currentUser = DataStore.getCurrentUser();

        if(currentUser.onboarded)
            this.setState({loaded: true})
        else
            this.props.replaceRoute(Routes.onboarding(currentUser));
    }

    _onLogout() {
        this.props.replaceRoute(Routes.login());
    }
}