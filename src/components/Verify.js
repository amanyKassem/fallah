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

class Verify extends Component {
    constructor(props){
        super(props);
        this.state = {
            codeStatus: 0,
            code:null
        }
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
                                <View style={[ styles.itemView ,{ borderColor: this.state.codeStatus === 1 ? '#0fd1fa' : '#fff' }]}>
                                    <Item floatingLabel style={styles.loginItem} bordered>
                                        <Label style={[styles.label ,{ color:this.state.codeStatus === 1 ? '#0fd1fa' : '#fff'}]}>{ i18n.t('verifyCode') }</Label>
                                        <Input onChangeText={(code) => this.setState({code})} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('code')} onFocus={() => this.activeInput('code')} style={styles.input}  />
                                    </Item>

                                    <Image source={this.renderInputImage('code')} style={styles.img} resizeMode={'contain'}/>
                                </View>

                            </Form>


                            <View style={{ marginTop: 50 }}>
                                <Button onPress={() => this.props.navigation.navigate('drawerNavigator')} style={styles.loginBtn}>
                                    <Text style={styles.btnTxt}>{ i18n.t('confirm') }</Text>
                                </Button>
                            </View>

                        </View>
                    </ImageBackground>
                </Content>
            </Container>
        );
    }
}


export default Verify;
