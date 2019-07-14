import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView} from "react-native";
import {Container, Content, Button, Footer, Icon, Header,  Form, Item,  Label, Input, } from 'native-base'
import Styles from '../../assets/styles'
import {ImagePicker, Permissions } from 'expo';
import i18n from "../../local/i18n";
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';


const height = Dimensions.get('window').height;
class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            name: '',
            phone: '',
            mail: '',
            nameStatus:0,
            phoneStatus: 0,
            mailStatus: 0,
            image:null,
            base64: null,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };


    _pickImage = async () => {

        this.askPermissionsAsync();

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
        if (type === 'name') {
            this.setState({nameStatus: 1})
        }else if (type === 'phone') {
            this.setState({phoneStatus: 1})
        }else  {
            this.setState({mailStatus: 1})
        }
    }

    unActiveInput(type){
        if (type === 'name') {
            this.setState({nameStatus: 0})
        }else if (type === 'phone') {
            this.setState({phoneStatus: 0})
        }else  {
            this.setState({mailStatus: 0})
        }
    }
    render() {
        let image = this.state.image;
        return (

            <Container style={{backgroundColor:'#fff'}}>
                <Header style={Styles.header} noShadow>
                    <View style={[Styles.headerView , {flexDirection:'row'}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity  onPress={this._pickImage} style={{left:5}}>
                                <Image source={require('../../assets/images/add_photo.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Header>
                <Content style={Styles.homecontent}>
                    <View style={[Styles.eventswiper ,  {backgroundColor:'#121320' , height:400}]}>
                        {image != null?
                            <Image
                                style={Styles.eventswiper} resizeMode={'cover'}
                                source={{ uri: image }}
                            />
                            :
                            <Image source={require('../../assets/images/profile_pic.png')} style={Styles.eventswiper} resizeMode={'cover'} />
                        }

                        <View style={[Styles.eventswiper , {backgroundColor: '#00000060' , position:'absolute' , top:0 }]} />

                    </View>

                    <View style={[Styles.parentViewEvent , {height:'auto' , paddingHorizontal:30 , marginTop:-110 , borderTopLeftRadius:75 }]}>
                        <Form style={{width: '100%' , marginTop:30}}>
                            <View style={[Styles.inputParent , {borderColor:this.state.nameStatus === 1 ? '#0fd1fa' : '#acabae' }]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem , {color: this.state.nameStatus === 1 ? '#0fd1fa' : '#acabae' , fontSize:16 }]}>{ i18n.t('username') }</Label>
                                    <Input onChangeText={(name) => this.setState({ name })} auto-capitalization={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={Styles.itemInput}/>
                                </Item>
                            </View>
                            <View style={[ Styles.inputParent ,{ borderColor:this.state.phoneStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem ,{ color: this.state.phoneStatus === 1 ? '#0fd1fa' : '#acabae', fontSize:16 }]}>{ i18n.t('phoneNumber') }</Label>
                                    <Input onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={Styles.itemInput}  />
                                </Item>
                            </View>

                            <View style={[ Styles.inputParent ,{ borderColor: this.state.mailStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem ,{ color:this.state.mailStatus === 1 ? '#0fd1fa' : '#acabae' , fontSize:16 }]}>{ i18n.t('email') }</Label>
                                    <Input onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'} onBlur={() => this.unActiveInput('mail')} onFocus={() => this.activeInput('mail')} style={Styles.itemInput}  />
                                </Item>
                            </View>

                        </Form>
                    </View>

                </Content>

                <View style={[Styles.btnParent ,{marginTop:0 , backgroundColor:'#fff'}]} >
                    <TouchableOpacity  style={Styles.confirmBtn}  onPress={() => this.props.navigation.navigate('profile')}>
                        <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('confirm') }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.cancelBtn} onPress={() => this.props.navigation.navigate('profile')}>
                        <Text style={{color:'#acabae' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('cancel') }</Text>
                    </TouchableOpacity>
                </View>
            </Container>

        );
    }
}

export default EditProfile;