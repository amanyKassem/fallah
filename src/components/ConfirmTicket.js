import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager} from "react-native";
import {Container, Content, Button ,Icon, Header} from 'native-base'
import Styles from '../../assets/styles'
import i18n from "../../locale/i18n";
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
class ConfirmTicket extends Component {
    constructor(props){
        super(props);

        this.state={

        }
    }
    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    render() {
        return (

            <Container style={{backgroundColor:'#fff'}}>
                <Header style={Styles.header} noShadow>
                    <View style={[Styles.headerView , {flexDirection:'row' , paddingHorizontal:10}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={Styles.homecontent}>

                    <View style={[Styles.eventswiper ,  {backgroundColor:'#121320' , height:400}]}>
                        <Image source={require('../../assets/images/confirm_qr.png')} style={[Styles.eventswiper , {width:290 , height:260 , top:60 , alignSelf:'center'}]} resizeMode={'cover'} />
                    </View>

                    <View style={[Styles.parentViewEvent , {height:'auto'  , marginTop:-105}]}>
                        <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center' , paddingTop:50}}>
                            <Text style={[Styles.eventText , { fontSize:20 , color:'#6d6c72' , textAlign: 'center' , width:width-130}]}>{ i18n.t('confirmQr') }</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('home')}>
                                <Text style={[Styles.eventText , {color:'#e51d6f' , fontSize:20 , marginTop:10}]}>{ i18n.t('home') }</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </Content>
            </Container>

        );
    }
}

export default ConfirmTicket;