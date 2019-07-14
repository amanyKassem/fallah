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


class BankPay extends Component {
    constructor(props){
        super(props);

        this.state={
            name: '',
            bankName: '',
            accNum: '',
            num: '',
            nameStatus:0,
            bankNameStatus:0,
            accNumStatus:0,
            numStatus:0,
            image: null,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        console.log(result);

        // check if there is image then set it and make button not disabled
        if (!result.cancelled) {
            this.setState({ image: result.uri ,base64:result.base64});
        }
    };
    activeInput(type){
        if (type === 'name'){
            this.setState({ nameStatus: 1 })
        }else if (type === 'bankName') {
            this.setState({bankNameStatus: 1})
        }else if (type === 'accNum') {
            this.setState({accNumStatus: 1})
        }else
            this.setState({numStatus: 1})
    }

    unActiveInput(type){
        if (type === 'name'){
            this.setState({ nameStatus: 0})
        }else if (type === 'bankName') {
            this.setState({bankNameStatus: 0})
        }else if (type === 'accNum') {
            this.setState({accNumStatus: 0})
        }else
            this.setState({numStatus: 0})
    }




    render() {
        let image = this.state.image;
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
                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
                    <View style={[Styles.parentView,{height:'auto'}]}>
                        <View style={Styles.viewLine}></View>
                        <Image source={require('../../assets/images/payment_bank.png')} style={[Styles.headphone , {width:200 , height:200 , marginBottom:0}]} resizeMode={'contain'} />
                        <Form style={{width: '100%', paddingHorizontal:20 }}>
                            <View style={[Styles.inputParent , {borderColor: this.state.nameStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem , {color:this.state.nameStatus === 1 ? '#0fd1fa': '#acabae' , fontSize:16 , top:4}]}>الاسم بالكامل</Label>
                                    <Input onChangeText={(name) => this.setState({ name })} auto-capitalization={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={Styles.itemInput}/>
                                </Item>
                            </View>
                            <View style={[Styles.inputParent , {borderColor: this.state.bankNameStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem , {color:this.state.bankNameStatus === 1 ? '#0fd1fa': '#acabae' , fontSize:16 , top:4}]}>اسم البنك</Label>
                                    <Input onChangeText={(bankName) => this.setState({ bankName })} auto-capitalization={false} onBlur={() => this.unActiveInput('bankName')} onFocus={() => this.activeInput('bankName')} style={Styles.itemInput}/>
                                </Item>
                            </View>
                            <View style={[Styles.inputParent , {borderColor: this.state.accNumStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem , {color:this.state.accNumStatus === 1 ? '#0fd1fa': '#acabae' , fontSize:16 , top:4}]}>رقم الحساب</Label>
                                    <Input onChangeText={(accNum) => this.setState({ accNum })} keyboardType={'number-pad'}  onBlur={() => this.unActiveInput('accNum')} onFocus={() => this.activeInput('accNum')} style={Styles.itemInput}/>
                                </Item>
                            </View>
                            <View style={[Styles.inputParent , {borderColor: this.state.numStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem , {color:this.state.numStatus === 1 ? '#0fd1fa': '#acabae' , fontSize:16 , top:4}]}>الرقم المحول</Label>
                                    <Input onChangeText={(num) => this.setState({ num })} keyboardType={'number-pad'}  onBlur={() => this.unActiveInput('num')} onFocus={() => this.activeInput('num')} style={Styles.itemInput}/>
                                </Item>
                            </View>
                            <View style={[Styles.inputParent , {borderColor:'#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} onPress={()=> this._pickImage() } bordered>
                                    <Label style={[Styles.labelItem , {color: '#acabae' , fontSize:16 , top:4}]}>صوره الحوالة</Label>
                                    <Input disabled={true} style={Styles.itemInput}/>
                                </Item>
                                <Image source={require('../../assets/images/gray_camera.png')} style={Styles.itemImage} resizeMode={'contain'}/>
                            </View>
                            <View style={{ alignSelf:'center' , marginTop:30}}>

                                {image != null?
                                    <View style={{width:200 , height:150, justifyContent:'center' , alignItems:'center',marginLeft:0 , borderColor:'#acabae' , borderWidth:1 }}>
                                        <Image
                                            resizeMode={'cover'}
                                            style={{ width: '100%', height: '100%'  }}
                                            source={{ uri: image }}
                                        />
                                    </View>
                                    :
                                    <View/>
                                }

                            </View>
                        </Form>
                    </View>
                    <View style={[Styles.btnParent , {backgroundColor:'#fff' }]} >
                        <TouchableOpacity  style={Styles.confirmBtn}  onPress={() => this.props.navigation.navigate('confirmPayment')}>
                            <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>تأكيد</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.cancelBtn} onPress={() => this.props.navigation.navigate('eventDetails')}>
                            <Text style={{color:'#acabae' , fontFamily: 'RegularFont' , fontSize:16}}>الغاء</Text>
                        </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>

        );
    }
}

export default BankPay;