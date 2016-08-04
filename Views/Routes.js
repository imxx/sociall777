"use strict";

import Home from "../Screens/Home";
import LogoutButton from "../Views/LogoutButton";
import PostButton from "../Views/PostButton";

class Routes {
    get(route, args) {
        if("undefined" == typeof this[route]){
            console.warn("No route found with name: " + route);
            return false;
        }else{
            return this[route].call(this, args);
        }
    }

    home() {
        return {
            name: "home",
            title: "Social",
            component: Home,
            leftButton: LogoutButton,
            rightButton: PostButton,
            hideNavigationBar: false,
            statusBarStyle: "light-content"
        }
    }
}

export default new Routes()