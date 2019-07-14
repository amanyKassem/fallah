import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView, Slider} from "react-native";
import {Container, Content, Button, Footer, Icon, Header, Left, Form, Item, Picker, Label, Input} from 'native-base'
import Styles from '../../assets/styles'
import i18n from "../../local/i18n";
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';


const height = Dimensions.get('window').height;
class ConfirmPayment extends Component {
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
                    <View style={[Styles.headerView , {flexDirection:'row'}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={Styles.homecontent}>
                    <View style={[Styles.eventswiper ,  {backgroundColor:'#121320' , height:400}]}>
                        <Image source={require('../../assets/images/confirm_payment.png')} style={{ width: '100%',
                            height: 300,top:15}} resizeMode={'cover'} />
                    </View>
                    <View style={[Styles.parentViewEvent , {height:'auto' , paddingRight:40 , marginTop:-70}]}>
                        <View style={{flexDirection:'row' , justifyContent:'center' , paddingTop:50}}>
                            <Text style={[Styles.eventboldName , {fontSize:20}]}>{ i18n.t('paymentConfirmed') }</Text>
                        </View>

                    </View>

                </Content>
                <View style={[Styles.btnParent ,{marginTop:0 , backgroundColor:'#fff'}]} >
                    <TouchableOpacity  style={Styles.confirmBtn}  onPress={() => this.props.navigation.navigate('getTicket')}>
                        <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('ticket') }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.cancelBtn} onPress={() => this.props.navigation.navigate('home')}>
                        <Text style={{color:'#acabae' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('home') }</Text>
                    </TouchableOpacity>
                </View>
            </Container>

        );
    }
}

export default ConfirmPayment;