import React, { Component } from "react";
import { Image} from "react-native";
import i18n from "../../local/i18n";


class ShareApp extends Component {
    constructor(props){
        super(props);

        this.state={

        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('shareApp'),
        drawerIcon: ( <Image source={require('../../assets/images/share_app.png')} style={{ height: 20, width: 20 , top:5 }} resizeMode={'contain'} />  )
    });

    render() {
        return false
    }
}

export default ShareApp;