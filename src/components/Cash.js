import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions , I18nManager , KeyboardAvoidingView} from "react-native";
import { Container, Content, Button, Picker, Icon, Header , Left, Right, Body , Form, Item, Input, Label  } from 'native-base'
import { ImagePicker } from 'expo';
import Styles from '../../assets/styles';
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


class Cash extends Component {
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
                <Header style={[Styles.altHeaader , {height:120}]} noShadow>
                    <Right style={Styles.rightHeader}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={Styles.backStyle} resizeMode={'contain'} />
                        </Button>
                    </Right>
                    <Left style={{flex:1}}/>
                </Header>
                <Content style={[Styles.content , {marginTop:-30}]} >
                        <View style={[Styles.parentView,{height:'auto'}]}>
                            <View style={Styles.viewLine}></View>
                            <Image source={require('../../assets/images/payment_cash.png')} style={[Styles.headphone , {width:200 , height:200 , marginBottom:0 , left:30}]} resizeMode={'contain'} />
                            <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center' , marginTop :50 }}>
                                <Text style={[Styles.eventText , { fontSize:20 , textAlign: 'center' }]}>المبلغ المراد دفعه</Text>
                                <Text style={[Styles.eventText , {color:'#e51d6f' , fontSize:20 , marginTop:5}]}>500 ر.س</Text>
                            </View>
                        </View>
                </Content>
                <View style={[Styles.btnParent , {backgroundColor:'#fff' }]} >
                    <TouchableOpacity  style={Styles.confirmBtn}  onPress={() => this.props.navigation.navigate('confirmPayment')}>
                        <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>تأكيد</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.cancelBtn} onPress={() => this.props.navigation.navigate('eventDetails')}>
                        <Text style={{color:'#acabae' , fontFamily: 'RegularFont' , fontSize:16}}>الغاء</Text>
                    </TouchableOpacity>
                </View>
            </Container>

        );
    }
}

export default Cash;