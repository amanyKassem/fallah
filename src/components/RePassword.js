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
    KeyboardAvoidingView, Platform
} from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, Toast, Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../local/i18n";

class RePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            codeStatus: 0,
            passwordStatus: 0,
            rePasswordStatus: 0,
            code:null,
            password: '',
            rePassword: '',
        }
    }


    activeInput(type){
        if (type === 'code'){
            this.setState({ codeStatus: 1 })
        }else if (type === 'password'){
            this.setState({ passwordStatus: 1 })
        }else
            this.setState({ rePasswordStatus: 1 })
    }

    unActiveInput(type){
        if (type === 'code'){
            this.setState({ codeStatus: 0 })
        }else if (type === 'password'){
            this.setState({ passwordStatus: 0 })
        }else
            this.setState({ rePasswordStatus: 0 })
    }



    renderInputImage(type){
        let source ='';
        if (type === 'code'){
            if (this.state.codeStatus){
                source = require('../../assets/images/blue_phone.png')
            } else{
                source = require('../../assets/images/white_phone.png')
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



    render() {
        return (
            <Container style={styles.container}>
                <Header style={[styles.header , { marginTop:0, height:Platform.OS === 'ios' ?70:60 , top:20 }]} noShadow>
                    <View style={[styles.headerView , {flexDirection:'row' , paddingHorizontal:10 , top:-5}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={[styles.headerNoti, styles.transform ]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content contentContainerStyle={{ flexGrow: 1 , top:-1 }}>
                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
                    <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={styles.imageBackgroundStyle}>
                        <Image source={require('../../assets/images/big_logo.png')} style={styles.logoStyle} resizeMode={'contain'} />

                        <View style={[styles.loginFormContainerStyle , { marginTop:30}]}>
                            <Form style={{ width: '100%' }}>
                                <View style={[ styles.itemView ,{ borderColor: this.state.codeStatus === 1 ? '#0fd1fa' : '#fff' }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.codeStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('verifyCode') }</Label>
                                        <Input onChangeText={(code) => this.setState({code})} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('code')} onFocus={() => this.activeInput('code')} style={styles.input}  />
                                    </Item>

                                    <Image source={this.renderInputImage('code')} style={styles.img} resizeMode={'contain'}/>
                                </View>
                                <View style={[ styles.itemView ,{ borderColor: this.state.passwordStatus === 1 ? '#0fd1fa' : '#fff' , marginTop:30 }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.passwordStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('newPass') }</Label>
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


                            <View style={{ marginTop: 50 }}>
                                <Button onPress={() => this.props.navigation.navigate('login')} style={styles.loginBtn}>
                                    <Text style={styles.btnTxt}>{ i18n.t('confirm') }</Text>
                                </Button>
                            </View>

                        </View>
                    </ImageBackground>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}


export default RePassword;
