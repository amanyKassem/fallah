import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    BackHandler,
    Linking,
    AsyncStorage,
    I18nManager,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, Toast, Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import axios from 'axios';
import { connect } from 'react-redux';
import CONST from '../consts'

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            usernameStatus: 0,
            phoneStatus: 0,
            mailStatus: 0,
            passwordStatus: 0,
            rePasswordStatus: 0,
            username: '',
            phone: '',
            mail: '',
            password: '',
            rePassword: '',
            isSubmitted: false,
        }
    }


    activeInput(type){
        if (type === 'username'){
            this.setState({ usernameStatus: 1 })
        }else if (type === 'phone'){
            this.setState({ phoneStatus: 1 })
        }else if (type === 'mail'){
            this.setState({ mailStatus: 1 })
        }else if (type === 'password'){
            this.setState({ passwordStatus: 1 })
        }else
            this.setState({ rePasswordStatus: 1 })
    }

    unActiveInput(type){
        if (type === 'username'){
            this.setState({ usernameStatus: 0 })
        }else if (type === 'phone'){
            this.setState({ phoneStatus: 0 })
        }else if (type === 'mail'){
            this.setState({ mailStatus: 0 })
        }else if (type === 'password'){
            this.setState({ passwordStatus: 0 })
        }else
            this.setState({ rePasswordStatus: 0 })
    }



    renderInputImage(type){
        let source ='';
        if (type === 'username'){
            if (this.state.usernameStatus){
                source = require('../../assets/images/blue_user.png')
            } else{
                source = require('../../assets/images/white_user.png')
            }
        }else if (type === 'phone'){
            if (this.state.phoneStatus){
                source = require('../../assets/images/blue_phone.png')
            } else{
                source = require('../../assets/images/white_phone.png')
            }
        }else if (type === 'mail'){
            if (this.state.mailStatus){
                source = require('../../assets/images/blue_email.png')
            } else{
                source = require('../../assets/images/white_email.png')
            }
        }else if (type === 'password'){
            if (this.state.passwordStatus){
                source = require('../../assets/images/blue_lock.png')
            } else{
                source = require('../../assets/images/white_lock.png')
            }
        }else{
            if (this.state.rePasswordStatus){
                source = require('../../assets/images/blue_lock.png')
            } else{
                source = require('../../assets/images/white_lock.png')
            }
        }

        return source;
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.phone.length <= 0 || this.state.phone.length !== 10) {
            isError = true;
            msg = i18n.t('phoneValidation');
        }else if (this.state.password.length <= 0) {
            isError = true;
            msg = i18n.t('passwordRequired');
        }else if (this.state.password != this.state.rePassword) {
            isError = true;
            msg = i18n.t('verifyPassword');
        }else if (this.state.password.length < 6) {
            isError = true;
            msg = i18n.t('passwordLength');
        }else if (this.state.mail.length <= 0 || this.state.mail.indexOf("@") === -1 || this.state.mail.indexOf(".") === -1) {
            isError = true;
            msg = i18n.t('emailNotCorrect');
        }

        if (msg != ''){
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000
            });
        }
        return isError;
    };

    onRegister(){
        const err = this.validate();
        if (!err){
            this.setState({ isSubmitted: true });
            AsyncStorage.getItem('deviceID').then(token => {
                axios.post(CONST.url + 'register' ,{
                    name: this.state.username,
                    phone: this.state.phone,
                    password: this.state.password,
                    email: this.state.mail,
                    lang: this.props.lang,
                    device_id: token
                }).then(response => {
                    this.setState({ isSubmitted: false });

                    if (response.data.status == 200){
                        const {phone, password } = this.state;
                        this.props.navigation.navigate('verify', { phone, password, token, code: response.data.data.code })
                    }

                    Toast.show({
                        text: response.data.msg,
                        type: response.data.status == 200 ? "success" : "danger",
                        duration: 3000
                    });
                }).catch(e => {
                    this.setState({ isSubmitted: false });
                    Toast.show({
                        text: 'يوجد خطأ ما الرجاء المحاولة مرة اخري',
                        type: "danger",
                        duration: 3000
                    });
                })
            })
        }
    }


    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#0fd1fa" />
            )
        }

        if (this.state.username == '' || this.state.phone == '' || this.state.mail == '' || this.state.password == '' || this.state.rePassword == ''){
            return (
                <Button disabled onPress={() => this.onRegister()} style={[styles.loginBtn , { backgroundColor:'#999'}]}>
                    <Text style={styles.btnTxt}>{ i18n.t('registerButton') }</Text>
                </Button>
            );
        }else {
            return (
                <Button onPress={() => this.onRegister()} style={styles.loginBtn}>
                    <Text style={styles.btnTxt}>{ i18n.t('registerButton') }</Text>
                </Button>
            );
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={[styles.header , { marginTop: Platform.OS === 'ios' ? 40 : 10, height:Platform.OS === 'ios' ?70:60 , top:Platform.OS === 'ios' ? 10 : 40 , backgroundColor: 'transparent', position: 'absolute', width: '100%' }]} noShadow>
                    <View style={[styles.headerView , {flexDirection:'row' , paddingHorizontal:10 , top:-5}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={[styles.headerNoti, styles.transform, { transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] } ]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Content contentContainerStyle={{ flexGrow: 1 , top:-1 }}>
                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
                    <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={styles.imageBackgroundStyle}>
                        <Image source={require('../../assets/images/big_logo.png')} style={styles.logoStyle} resizeMode={'contain'} />

                        <View style={[styles.loginFormContainerStyle , {height:'auto' , marginTop:30}]}>
                            <Form style={{ width: '100%' }}>

                                <View style={[ styles.itemView ,{ borderColor: this.state.usernameStatus === 1 ? '#0fd1fa' : '#fff' }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.usernameStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('username') }</Label>
                                        <Input onChangeText={(username) => this.setState({username})} auto-capitalization={false} onBlur={() => this.unActiveInput('username')} onFocus={() => this.activeInput('username')} style={styles.input}  />
                                    </Item>

                                    <Image source={this.renderInputImage('username')} style={styles.img} resizeMode={'contain'}/>
                                </View>

                                <View style={[ styles.itemView ,{ borderColor: this.state.phoneStatus === 1 ? '#0fd1fa' : '#fff' , marginTop:30  }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.phoneStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('phoneNumber') }</Label>
                                        <Input onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={styles.input}  />
                                    </Item>

                                    <Image source={this.renderInputImage('phone')} style={styles.img} resizeMode={'contain'}/>
                                </View>

                                <View style={[ styles.itemView ,{ borderColor: this.state.mailStatus === 1 ? '#0fd1fa' : '#fff' , marginTop:30  }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.mailStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('email') }</Label>
                                        <Input onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'} onBlur={() => this.unActiveInput('mail')} onFocus={() => this.activeInput('mail')} style={styles.input}  />
                                    </Item>

                                    <Image source={this.renderInputImage('mail')} style={styles.img} resizeMode={'contain'}/>
                                </View>


                                <View style={[ styles.itemView ,{ borderColor: this.state.passwordStatus === 1 ? '#0fd1fa' : '#fff' , marginTop:30 }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.passwordStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('password') }</Label>
                                        <Input autoCapitalize='none' onChangeText={(password) => this.setState({password})} secureTextEntry onBlur={() => this.unActiveInput('password')} onFocus={() => this.activeInput('password')} style={styles.input}  />
                                    </Item>

                                    <Image source={this.renderInputImage('password')} style={styles.img} resizeMode={'contain'}/>
                                </View>

                                <View style={[ styles.itemView ,{ borderColor: this.state.rePasswordStatus === 1 ? '#0fd1fa' : '#fff' , marginTop:30 }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.rePasswordStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('verifyNewPass') }</Label>
                                        <Input autoCapitalize='none' onChangeText={(rePassword) => this.setState({rePassword})} secureTextEntry onBlur={() => this.unActiveInput('rePassword')} onFocus={() => this.activeInput('rePassword')} style={styles.input}  />
                                    </Item>

                                    <Image source={this.renderInputImage('rePassword')} style={styles.img} resizeMode={'contain'}/>
                                </View>
                            </Form>

                            <View style={{ marginTop: 50 , marginBottom:40 }}>
                                { this.renderSubmit() }
                            </View>

                        </View>
                    </ImageBackground>
                    </KeyboardAvoidingView>
                </Content>
                <View style={[styles.btnParent ,{marginTop:0 , backgroundColor:'transparent', position: 'absolute', width: '100%', bottom: 0}]} >
                    <TouchableOpacity  style={[styles.registerBtn, { backgroundColor: '#121320' }]}  onPress={() => this.props.navigation.navigate('login')}>
                        <Text style={styles.registerTxt}>{ i18n.t('loginButton') }</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}


const mapStateToProps = ({ lang }) => {
    return {
        lang: lang.lang,
    };
};

export default connect(mapStateToProps, {})(Register);
