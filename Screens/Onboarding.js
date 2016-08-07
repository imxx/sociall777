"use strict";

import React, { Component } from "react";
import {
    View,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    PropTypes,
    PixelRatio,
    Text
} from "react-native";

import StyleVars from "../StyleVars";
import Actions from "../Actions";
import Routes from "../Views/Routes";

import ImagePickerManger from "react-native-image-picker";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    inputContainer: {
        width: Dimensions.get("window").width - 5,
        flexDirection: "row",
        alignItems: "center",
        marginTop: PixelRatio.roundToNearestPixel(20),
        borderBottomColor: StyleVars.Colors.darkBackground,
        borderBottomWidth: PixelRatio.roundToNearestPixel(1)
    },

    input: {
        flex: 1,
        height: 40,
        backgroundColor: "white",
        color: StyleVars.Colors.primary,
        fontFamily: StyleVars.Fonts.general,
        fontSize: 16,
        padding: 5
    },

    profilePictureContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },

    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden'
    }
});

class Onboarding extends Component {
    constructor(props) {
        super(props);
        console.log("Profile picture: " + this.props.user.profilePicture);
        this.state = {
            name: this.props.user.name,
            profilePicture: (this.props.user.profilePicture || require("../general-photo.jpg"))
        };
    }

    componentWillMount() {
        Actions.onboard.started.listen(this.onOnboardStarted.bind(this));
        Actions.onboard.completed.listen(this.onOnboardingCompleted.bind(this));
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    keyboardShouldPersistTaps={false}
                    automaticallyAdjustContentInsets={false}>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            style={styles.profilePictureContainer}
                            onPress={() => this.onPressProfilePicture()}>
                                <Image
                                    source={this.state.profilePicture}
                                    style={styles.profilePicture} />
                                <Text>Press the image to choose your avatar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            value={this.state.name}
                            placeholder="Full Name"
                            autoFocus={true}
                            onChangeText={(name) => this.setState({name: name})}
                            autoCapitalize="words"
                            returnKeyType="done"/>
                    </View>
                </ScrollView>
            </View>
        );
    }

    onPressProfilePicture() {
        ImagePickerManger.showImagePicker({
            title: "Set Profile Picture"
        }, (picture) => {
            if(picture.data){
                this.setState({
                    profilePicture: {
                        uri: "data:image/jpeg;base64," + picture.data, isStatic: true 
                    }
                });
            }
        });
    }

    onOnboardStarted() {
        console.log(this.state.profilePicture);

        Actions.onboard({
            onboarded: true,
            name: this.state.name,
            profilePicture: this.state.profilePicture
        });
    }

    onOnboardingCompleted() {
        console.log("Onboarding on board complete.");
        this.props.replaceRoute(Routes.home());
    }
}

export default Onboarding;