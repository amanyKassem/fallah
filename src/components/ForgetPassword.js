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
import axios from "axios";
import CONST from "../consts";

class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneStatus: 0,
            phone:null,
            isSubmitted: false,
        }
    }


    activeInput(type){
        if (type === 'phone'){
            this.setState({ phoneStatus: 1 })
        }
    }

    unActiveInput(type){
        if (type === 'phone'){
            this.setState({ phoneStatus: 0 })
        }
    }



    renderInputImage(type){
        let source ='';
        if (type === 'phone'){
            if (this.state.phoneStatus){
                source = require('../../assets/images/blue_phone.png')
            } else{
                source = require('../../assets/images/white_phone.png')
            }
        }

        return source;
    }
    onCheckPhone(){
        this.setState({ isSubmitted: true });
        axios.post(CONST.url + 'forget_password' ,{
            phone: this.state.phone,
        }).then(response => {
            Toast.show({
                text: response.data.msg,
                type: response.data.status === 200 ? "success" :"danger",
                duration: 3000
            });
            this.setState({ isSubmitted: false , phone:'' });
            this.props.navigation.navigate("rePassword" , {id:response.data.data.id , code:response.data.data.code});
        })

    }
    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#0fd1fa" />
            )
        }

        return (
            <Button onPress={() => this.onCheckPhone()} style={styles.loginBtn}>
                <Text style={styles.btnTxt}>{ i18n.t('sendButton') }</Text>
            </Button>
        );
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
                                <View style={[ styles.itemView ,{ borderColor: this.state.phoneStatus === 1 ? '#0fd1fa' : '#fff' }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.phoneStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('phoneNumber') }</Label>
                                        <Input onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={styles.input}  />
                                    </Item>

                                    <Image source={this.renderInputImage('phone')} style={styles.img} resizeMode={'contain'}/>
                                </View>

                            </Form>


                            <View style={{ marginTop: 50 }}>
                                {this.renderSubmit()}
                            </View>

                        </View>
                    </ImageBackground>
                </Content>
            </Container>
        );
    }
}


export default ForgetPassword;
