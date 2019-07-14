import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView, Slider} from "react-native";
import {Container, Content, Button, Footer, Icon, Header, Left, Form, Item, Picker, Label, Input} from 'native-base'
import Styles from '../../assets/styles'
import QRCode from 'react-native-qrcode';
import i18n from "../../local/i18n";
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';


const height = Dimensions.get('window').height;
class GetTicket extends Component {
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

                    <View style={Styles.QR}>
                        <QRCode
                            value={'amany'}
                            size={80}
                            bgColor='#000'
                            fgColor='white'/>
                    </View>
                    <View style={[Styles.eventswiper ,  {backgroundColor:'#121320' , height:400}]}>
                        <Image source={require('../../assets/images/pic_two.png')} style={Styles.eventswiper} resizeMode={'cover'} />
                        <View style={Styles.dateHours}>
                            <View style={[Styles.dateView , {backgroundColor:"#0fd1fac2" , marginRight:10}]}>
                                <Text style={Styles.dateText}>15 مايو</Text>
                            </View>
                            <View style={[Styles.dateView , {backgroundColor:"#ea518eb5" }]}>
                                <Text style={Styles.dateText}>13 س { i18n.t('remaining') }</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[Styles.parentViewEvent , {height:'auto' , paddingRight:40 , marginTop:-105}]}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[Styles.eventboldName , {fontSize:16, marginRight:140}]}>حفلة عمر خيرت</Text>
                            <Text style={[Styles.eventText , {color:'#e51d6f' , fontSize:16}]}>500 { i18n.t('RS') }</Text>
                        </View>
                        <View style={{flexDirection:'column' , marginTop:10}}>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_clock.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15 , top:-2}]}>10 مساءا</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_calender.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>22/5/2019</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_location.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>الرياض التخصصي</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_ticket.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>حجز اونلاين</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[Styles.modalLine ]}></View>
                    <View style={{ paddingLeft:10, paddingBottom:10 ,paddingRight:40 }}>
                        <Text style={[Styles.eventText , { fontSize:16 , marginBottom:100 , writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('process') }</Text>
                    </View>
                </Content>
                <View style={[Styles.btnParent ,{marginTop:0 , backgroundColor:'#fff'}]} >
                    <TouchableOpacity  style={[Styles.confirmBtn , {backgroundColor:'#fff' , borderColor:'#e51d6f' , borderWidth:1 , borderBottomWidth:0}]}  onPress={() => this.props.navigation.navigate('home')}>
                        <Text style={{color:'#e51d6f' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('deleteTicket') }</Text>
                    </TouchableOpacity>
                </View>
            </Container>

        );
    }
}

export default GetTicket;