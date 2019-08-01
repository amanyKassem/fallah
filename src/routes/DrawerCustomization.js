import React, { Component } from "react";
import { View, Text, Image , TouchableOpacity , Share } from "react-native";
import {Container, Content, Icon} from 'native-base';
import {DrawerItems} from 'react-navigation';
import {connect} from "react-redux";
import i18n from "../../locale/i18n";
import CONST from '../consts'
import { logout, tempAuth } from '../actions'


class DrawerCustomization extends Component {
    constructor(props){
        super(props);
        this.state={
            user: [],
        }
    }

    logout(){
        this.props.logout({ token: this.props.user.token })
        this.props.tempAuth();

        this.props.navigation.navigate('login');
    }
    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'fallah app',
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


	filterItems(item){
		return item.routeName !== 'settings';
	}

    render() {
        let { user } = this.props;
        if (user === null)
            user = {
                avatar:  CONST.url +'images/users/default.png',
                name: i18n.t('guest')
            }
        return (
            <Container>
                <Content style={{backgroundColor:'#121320'}}>
                    <TouchableOpacity onPress={()=> this.props.user ? this.props.navigation.navigate("profile") : this.props.navigation.navigate("login")} style={{flex:1 , alignItems: 'center' , marginBottom:20, paddingTop:95}}>
                         <Image source={require('../../assets/images/bg_menu.png')} resizeMode={'contain'} style={{ width: '100%', height: 230 , position:'absolute' , top:15  }}/>
                         <Image source={{ uri: user.avatar }} resizeMode={'cover'} style={{ width: 90, height: 90 , borderRadius:50 }}/>
                        <Text style={{color:'#fff',  fontSize:17, fontFamily: 'RegularFont'}}>{ user.name }</Text>
                    </TouchableOpacity>
                    <DrawerItems {...this.props}
                                 onItemPress={
                                     (route, focused) => {
                                         if (route.route.key === 'logout') {
                                             this.logout()
                                         }else {
                                             route.route.key === 'shareApp' ? this.onShare(): this.props.navigation.navigate(route.route.key)
                                         }
                                     }
                                 }
                                 activeBackgroundColor='transparent' inactiveBackgroundColor='transparent' activeLabelStyle={{color:'#fff'}}
                                 labelStyle={{color: '#bbbcbd' , fontSize:17 , marginLeft: 0 , marginRight: 0 , marginBottom:10 , marginTop:10 , fontFamily: 'RegularFont' ,  fontWeight: 'normal' }} iconContainerStyle ={{  marginRight: 12}}
                                 itemStyle  = {{marginBottom:0 , paddingBottom:0 , marginTop:0 , paddingTop:0 , fontFamily: 'RegularFont'}} itemsContainerStyle ={{fontFamily: 'RegularFont'}}
                                 items={this.props.user ? this.props.items : this.props.items.filter((item) =>  this.filterItems(item) ) }
                    />

                    <View style={{ flex: 1 }}>
                        {
                            this.props.user ? (
                                <TouchableOpacity onPress={() => this.logout()} style={{flexDirection: 'row' }}>
                                    <Image source={require('../../assets/images/logout.png')} style={{ height: 18, width: 18 , marginRight:15, top:10 , marginLeft:20 }} resizeMode={'contain'} />
                                    <Text style={{color:'#bbbcbd',  fontSize:17, fontFamily: 'RegularFont'}}>{ i18n.t('logout') }</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('login')} style={{flexDirection: 'row' }}>
                                    <Image source={require('../../assets/images/login.png')} style={{ height: 18, width: 18 , marginRight:15, top:10 , marginLeft:20 }} resizeMode={'contain'}  />
                                    <Text style={{color:'#bbbcbd',  fontSize:17, fontFamily: 'RegularFont'}}>{ i18n.t('loginButton') }</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    </Content>

            </Container>
        );
    }
}

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth: auth.user,
        user: profile.user
    };
};

export default connect(mapStateToProps, { logout, tempAuth })(DrawerCustomization);