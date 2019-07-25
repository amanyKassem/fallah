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
    Platform
} from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, Toast, Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {DoubleBounce} from "react-native-loader";
import { userLogin, profile } from '../actions'
import {connect} from "react-redux";
import axios from "axios";
import CONST from "../consts";

class Verify extends Component {
    constructor(props){
        super(props);
        this.state = {
            codeStatus: 0,
            code:null,
            password: this.props.navigation.state.params.password,
            phone: this.props.navigation.state.params.phone,
            token: this.props.navigation.state.params.token,
            verifyCode: this.props.navigation.state.params.code,
            isSubmitted: false,
            userId: null
        }
    }
    componentWillMount() {
        this.setState({ userId: null })
        alert(this.state.verifyCode);
    }
    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#0fd1fa" />
            )
        }

        return (
            <Button onPress={() => this.onCheckCode()} style={styles.loginBtn}>
                <Text style={styles.btnTxt}>{ i18n.t('confirm') }</Text>
            </Button>
        );
    }

    onCheckCode(){
        if (this.state.code == this.state.verifyCode){
            this.setState({ isSubmitted: true });
            const { phone, password, token } = this.state;
            axios.post(CONST.url + 'active_account' ,{
                phone: this.state.phone,
            }).then(response => {
                if (response.data.status == 200){
                    this.props.userLogin({ phone, password, token }, this.props.lang);
                }
            })
        }else{
            Toast.show({
                text: i18n.t('codeNotCorrect'),
                type: "danger",
                duration: 3000
            });
        }
    }

    componentWillReceiveProps(newProps){
        if (newProps.auth !== null && newProps.auth.status === 200){
            if (this.state.userId === null){
                this.setState({ userId: newProps.auth.data.id });
                this.props.profile(newProps.auth.data.token);
            }

            this.props.navigation.navigate('drawerNavigator');
        }

        if (this.props.profile !== null) {
            Toast.show({
                text: newProps.auth.msg,
                type: newProps.auth.status == 200 ? "success" : "danger",
                duration: 3000
            });
        }

        this.setState({ isSubmitted: false });
    }

    activeInput(type){
        if (type === 'code'){
            this.setState({ codeStatus: 1 })
        }
    }

    unActiveInput(type){
        if (type === 'code'){
            this.setState({ codeStatus: 0 })
        }
    }



    renderInputImage(type){
        let source ='';
        if (type === 'code'){
            if (this.state.codeStatus){
                source = require('../../assets/images/check.png')
            } else{
                source = require('../../assets/images/white_lock.png')
            }
        }

        return source;
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

                            </Form>


                            <View style={{ marginTop: 50 }}>
                                { this.renderSubmit() }
                            </View>

                        </View>
                    </ImageBackground>
                </Content>
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
export default connect(mapStateToProps, { userLogin, profile })(Verify);
