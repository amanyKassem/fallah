import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, BackHandler, Linking, AsyncStorage, I18nManager, KeyboardAvoidingView , Platform} from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, Toast, Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../local/i18n'
import { connect } from 'react-redux';
import { userLogin, profile } from '../actions'
import { Permissions, Notifications } from 'expo'
import {DoubleBounce} from "react-native-loader";
import {NavigationEvents} from "react-navigation";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneStatus: 0,
            passwordStatus: 0,
            phone: '',
            password: '',
            token: '',
            userId: null,
            isLoaded: false
        }
    }


    activeInput(type){
        if (type === 'phone'){
            this.setState({ phoneStatus: 1 })
        }else
            this.setState({ passwordStatus: 1 })
    }

    unActiveInput(type){
        if (type === 'phone'){
            this.setState({ phoneStatus: 0 })
        }else
            this.setState({ passwordStatus: 0 })
    }



    renderInputImage(type){
        let source ='';
        if (type === 'phone'){
            if (this.state.phoneStatus){
                source = require('../../assets/images/blue_phone.png')
            } else{
                source = require('../../assets/images/white_phone.png')
            }
        }else{
            if (this.state.passwordStatus){
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
    renderSubmit(){
        if (this.state.isLoaded){
            return(
                <DoubleBounce size={20} color="#0fd1fa" />
            )
        }

        return (
            <Button onPress={() => this.onLoginPressed()} style={styles.loginBtn}>
                <Text style={styles.btnTxt}>{ i18n.t('loginButton') }</Text>
            </Button>
        );
    }

    onLoginPressed() {
        const err = this.validate();
        if (!err){
            this.setState({ isLoaded: true });
            const {phone, password, token} = this.state;
            this.props.userLogin({ phone, password, token }, this.props.lang);
        }
    }

    async componentWillMount() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        token = await Notifications.getExpoPushTokenAsync();
        this.setState({ token, userId: null })
        AsyncStorage.setItem('deviceID', token);

        console.log('app lang', this.props.lang);

    }

    componentWillReceiveProps(newProps){
        // console.log('newProps' , newProps)
        if (newProps.auth !== null && newProps.auth.status === 200){

            if (this.state.userId === null){
                this.setState({ userId: newProps.auth.data.id });
                this.props.profile(newProps.auth.data.token);
            }

            this.props.navigation.navigate('drawerNavigator');
        }

        if (newProps.auth !== null) {
            Toast.show({
                text: newProps.auth.msg,
                type: newProps.auth.status === 200 ? "success" : "danger",
                duration: 3000
            });
        }

        this.setState({ isLoaded: false });
    }

    onFocus(){
        this.componentWillMount()
    }

    render() {
        return (

            <Container style={styles.container}>
                <Header style={[styles.header , { marginTop:0, height:Platform.OS === 'ios' ?70:60 , top:40 }]} noShadow>
                    <View style={[styles.headerView , {flexDirection:'row' , paddingHorizontal:10 , top:-5}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={[styles.headerNoti , styles.transform ]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <Content contentContainerStyle={{ flexGrow: 1 , top:-1 }}>
                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
                    <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={styles.imageBackgroundStyle}>
                        <Image source={require('../../assets/images/big_logo.png')} style={styles.logoStyle} resizeMode={'contain'} />

                        <View style={styles.loginFormContainerStyle}>
                            <Form style={{ width: '100%' }}>
                                <View style={[ styles.itemView ,{ borderColor: this.state.phoneStatus === 1 ? '#0fd1fa' : '#fff' }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.phoneStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('phoneNumber') }</Label>
                                        <Input onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={styles.input}  />
                                    </Item>

                                    <Image source={this.renderInputImage('phone')} style={styles.img} resizeMode={'contain'}/>
                                </View>


                                <View style={[ styles.itemView ,{ borderColor: this.state.passwordStatus === 1 ? '#0fd1fa' : '#fff' , marginTop:30 }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.passwordStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('password') }</Label>
                                        <Input autoCapitalize='none' onChangeText={(password) => this.setState({password})} secureTextEntry onBlur={() => this.unActiveInput('password')} onFocus={() => this.activeInput('password')} style={styles.input}  />
                                    </Item>

                                    <Image source={this.renderInputImage('password')} style={styles.img} resizeMode={'contain'}/>
                                </View>
                            </Form>

                            <View style={styles.forgetVisitor}>
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate('forgetPassword')}>
                                    <Text style={styles.forget}>{ i18n.t('forgetPass') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('drawerNavigator')}>
                                    <Text style={styles.forget}>{ i18n.t('visitor') }</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 50 }}>
                                { this.renderSubmit() }
                            </View>

                        </View>
                    </ImageBackground>
                    </KeyboardAvoidingView>
                </Content>
                <View style={[styles.btnParent ,{marginTop:0 , backgroundColor:'#121320'}]} >
                    <TouchableOpacity  style={styles.registerBtn}  onPress={() => this.props.navigation.navigate('register')}>
                        <Text style={styles.registerTxt}>{ i18n.t('registerButton') }</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        loading: auth.loading,
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile })(Login);