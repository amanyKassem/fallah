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
import i18n from "../../local/i18n";

class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneStatus: 0,
            phone:null
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
                                <Button onPress={() => this.props.navigation.navigate('rePassword')} style={styles.loginBtn}>
                                    <Text style={styles.btnTxt}>{ i18n.t('sendButton') }</Text>
                                </Button>
                            </View>

                        </View>
                    </ImageBackground>
                </Content>
            </Container>
        );
    }
}


export default ForgetPassword;
