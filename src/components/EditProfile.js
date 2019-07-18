import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView} from "react-native";
import {Container, Content, Button, Footer, Icon, Header, Form, Item, Label, Input, Toast,} from 'native-base'
import Styles from '../../assets/styles'
import {ImagePicker, Permissions } from 'expo';
import i18n from "../../local/i18n";
import { updateProfile } from '../actions/ProfileAction'
import axios from 'axios'
import CONST from '../consts'
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import Modal from "react-native-modal";


const height = Dimensions.get('window').height;
class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            name: this.props.user.name,
            phone: this.props.user.phone,
            mail: this.props.user.email,
            nameStatus:0,
            phoneStatus: 0,
            mailStatus: 0,
            userImage: null,
            base64: null,
            isSubmitted: false,
            isModalVisible: false,
            oldPasswordStatus: 0,
            newPasswordStatus: 0,
            verifyPasswordStatus: 0,
            oldPass: '',
            newPass: '',
            verifyNewPass: '',
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

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
            this.setState({ userImage: result.uri ,base64:result.base64});
        }
    };


    onUpdateProfile(){
        const data = {
            name: this.state.name,
            phone: this.state.phone,
            image: this.state.base64,
            email: this.state.mail,
            device_id: null,
            lang: this.props.lang,
            token: this.props.user.token
        };

        this.setState({ isSubmitted: true });
        this.props.updateProfile(data);
    }

    componentWillReceiveProps(newProps){
        this.setState({ isSubmitted: false });
        this.props.navigation.navigate('profile')
    }


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

    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height + 100, alignSelf:'center' , backgroundColor:'#fff' , width:'100%'  , position:'absolute' , zIndex:1 }}>
                    <DoubleBounce size={20} color="#0fd1fa" />
                </View>
            );
        }
    }

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        if (this.state.name == '' || this.state.email == '' || this.state.phone == '' ){
            return (
                <View  style={[Styles.confirmBtn , {backgroundColor:'#999'}]} >
                    <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('confirm') }</Text>
                </View>
            );
        }else {
            return (
                <TouchableOpacity  style={Styles.confirmBtn}  onPress={() => this.onUpdateProfile()}>
                    <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('confirm') }</Text>
                </TouchableOpacity>
            );
        }
    }
    onChangePassword(){
        if (this.state.newPass === this.state.verifyNewPass){
            this.setState({ isSubmitted: true });
            axios({
                method: 'POST',
                url: CONST.url + 'update_password',
                headers: {Authorization: this.props.user.token},
                data: {
                    old_password: this.state.oldPass,
                    new_password: this.state.newPass,
                    lang: this.props.lang,
                }
            }).then(response => {
                this.setState({ isSubmitted: false, isModalVisible: !this.state.isModalVisible, oldPass: '', newPass: '', verifyNewPass: '' });
                Toast.show({
                    text: response.data.msg,
                    type:  response.data.status == 200 ? "success" : "danger",
                    duration: 3000
                });
            })
        } else{
            Toast.show({
                text: i18n.t('verifyPassword'),
                type: "danger",
                duration: 3000
            });
        }
    }
    render() {
        let image = this.state.userImage;
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
                                style={[Styles.eventswiper , {height:400}]} resizeMode={'cover'}
                                source={{ uri: image }}
                            />
                            :
                            <Image source={{uri:this.props.user.avatar}} style={[Styles.eventswiper , {height:400}]} resizeMode={'cover'} />
                        }

                        <View style={[Styles.eventswiper , {backgroundColor: '#00000060' , position:'absolute' , top:0 , height:400}]} />

                    </View>

                    <View style={[Styles.parentViewEvent , {height:'auto' , paddingHorizontal:30 , marginTop:-110 , borderTopLeftRadius:75 }]}>
                        <Form style={{width: '100%' , marginTop:30}}>
                            <View style={[Styles.inputParent , {borderColor:this.state.nameStatus === 1 ? '#0fd1fa' : '#acabae' }]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem , {color: this.state.nameStatus === 1 ? '#0fd1fa' : '#acabae' , fontSize:16 }]}>{ i18n.t('username') }</Label>
                                    <Input value={this.state.name} onChangeText={(name) => this.setState({ name })} auto-capitalization={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={Styles.itemInput}/>
                                </Item>
                            </View>
                            <View style={[ Styles.inputParent ,{ borderColor:this.state.phoneStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem ,{ color: this.state.phoneStatus === 1 ? '#0fd1fa' : '#acabae', fontSize:16 }]}>{ i18n.t('phoneNumber') }</Label>
                                    <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={Styles.itemInput}  />
                                </Item>
                            </View>

                            <View style={[ Styles.inputParent ,{ borderColor: this.state.mailStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem ,{ color:this.state.mailStatus === 1 ? '#0fd1fa' : '#acabae' , fontSize:16 }]}>{ i18n.t('email') }</Label>
                                    <Input value={this.state.mail} onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'} onBlur={() => this.unActiveInput('mail')} onFocus={() => this.activeInput('mail')} style={Styles.itemInput}  />
                                </Item>
                            </View>
                            <TouchableOpacity onPress={this._toggleModal} >
                                <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 17, fontFamily: 'RegularFont', color: '#26b5c4' }}>{ i18n.t('changePass') }</Text>
                            </TouchableOpacity>
                        </Form>
                    </View>
                    <Modal isVisible={this.state.isModalVisible} onBackdropPress={this._toggleModal}>
                        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10, position: 'absolute', width: '100%', borderRadius: 5, height: 350, justifyContent: 'center' }}>
                            <Form>
                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.phoneStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row'  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'RegularFont', color: '#acabae', fontSize: 13 }}>{ i18n.t('password') }</Label>
                                        <Input onChangeText={(oldPass) => this.setState({ oldPass })} value={this.state.oldPass} secureTextEntry onBlur={() => this.unActiveInput('oldPassword')} onFocus={() => this.activeInput('oldPassword')} style={{ width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL ? 'right' : 'left', fontSize: 15, top: 17 }}  />
                                    </Item>

                                </View>


                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.passwordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'RegularFont', color: '#acabae', fontSize: 13 }}>{ i18n.t('newPass') }</Label>
                                        <Input onChangeText={(newPass) => this.setState({ newPass })} value={this.state.newPass} secureTextEntry onBlur={() => this.unActiveInput('newPassword')} onFocus={() => this.activeInput('newPassword')} style={{ width: 200, textAlign: I18nManager.isRTL ? 'right' : 'left', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>

                                </View>

                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.verifyPasswordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'RegularFont', color: '#acabae', fontSize: 13 }}>{ i18n.t('verifyNewPass') }</Label>
                                        <Input onChangeText={(verifyNewPass) => this.setState({ verifyNewPass })} value={this.state.verifyNewPass} secureTextEntry onBlur={() => this.unActiveInput('verifyPassword')} onFocus={() => this.activeInput('verifyPassword')} style={{ width: 200, textAlign: I18nManager.isRTL ? 'right' : 'left', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>

                                </View>

                                <View style={{ marginTop: 20, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    { this.renderSubmit() }
                                </View>
                            </Form>
                        </View>
                    </Modal>
                </Content>

                <View style={[Styles.btnParent ,{marginTop:0 , backgroundColor:'#fff'}]} >
                    { this.renderSubmit() }
                    <TouchableOpacity style={Styles.cancelBtn} onPress={() => this.props.navigation.navigate('profile')}>
                        <Text style={{color:'#acabae' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('cancel') }</Text>
                    </TouchableOpacity>
                </View>
            </Container>

        );
    }
}
const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};

export default connect(mapStateToProps, {updateProfile})(EditProfile);