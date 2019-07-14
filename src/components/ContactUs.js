import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    I18nManager,
    KeyboardAvoidingView,
    Linking,
    Platform
} from "react-native";
import {Container, Content, Button, Footer, Icon, Header, Left, Form, Item, Textarea,Label, Input, Body} from 'native-base'
import Styles from '../../assets/styles'
import Modal from "react-native-modal";
import i18n from "../../local/i18n";
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';


const height = Dimensions.get('window').height;
class ContactUs extends Component {
    constructor(props){
        super(props);

        this.state={
            address: '',
            phone: '',
            mail: '',
            name: '',
            email: '',
            msg: '',
            addressStatus:0,
            phoneStatus: 0,
            mailStatus: 0,
            nameStatus: 0,
            emailStatus: 0,
            msgStatus: 0,
            isModalVisible: false,
            Links: []
        }
    }
    _linkPressed (url){
        Linking.openURL(url);
    }


    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    onConfirm() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    static navigationOptions = () => ({
        drawerLabel: i18n.t('contactUs'),
        drawerIcon: ( <Image source={require('../../assets/images/contact_us.png')} style={{ height: 20, width: 20 , top:5 }} resizeMode={'contain'} />  )
    });
    activeInput(type){
        if (type === 'address'){
            this.setState({ addressStatus: 1 })
        }else if (type === 'phone') {
            this.setState({phoneStatus: 1})
        }else if (type === 'mail') {
            this.setState({mailStatus: 1})
        }else if (type === 'name') {
            this.setState({nameStatus: 1})
        }else if (type === 'email') {
            this.setState({emailStatus: 1})
        }else
            this.setState({msgStatus: 1})
    }

    unActiveInput(type){
        if (type === 'address'){
            this.setState({ addressStatus: 0 })
        }else if (type === 'phone') {
            this.setState({phoneStatus: 0})
        }else if (type === 'mail') {
            this.setState({mailStatus: 0})
        }else if (type === 'name') {
            this.setState({nameStatus: 0})
        }else if (type === 'email') {
            this.setState({emailStatus: 0})
        }else
            this.setState({msgStatus: 0})
    }
    render() {
        return (

            <Container style={{backgroundColor:'#fff'}}>
                <Header style={[Styles.header , {height:Platform.OS === 'ios' ?50:10}]} noShadow>
                    <View style={[Styles.headerView , {flexDirection:'row' , paddingHorizontal:10}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Body style={[Styles.bodyHeadrt , {top:Platform.OS === 'ios' ? -9:-13}]}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'RegularFont' }}>{ i18n.t('contactUs') }</Text>
                        </Body>
                    </View>
                </Header>
                <Content style={Styles.homecontent}>
                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
                    <View style={[Styles.eventswiper ,  {backgroundColor:'#121320' , height:400}]}>
                        <Image source={require('../../assets/images/bg_color_vectors.png')} style={[Styles.eventswiper , { height: 400 }]} resizeMode={'cover'} />
                        <View style={[Styles.dateHours , {bottom:'55%' , textAlign:'center' , left:0 , paddingHorizontal:15}]}>
                            <Text style={[Styles.dateText  , {textAlign:'center', width:'auto'}]}>نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص</Text>
                        </View>
                    </View>

                    <View style={[Styles.parentViewEvent , {height:'auto' , paddingRight:40 , marginTop:-105 , flexDirection:'column' , paddingTop:20 , paddingLeft:20}]}>
                        <Form style={{width: '100%', paddingHorizontal:20 }}>
                            <View style={[Styles.inputParent , {borderColor: this.state.addressStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem , {color:this.state.addressStatus === 1 ? '#0fd1fa': '#acabae' , fontSize:16 }]}>{ i18n.t('address') }</Label>
                                    <Input onChangeText={(address) => this.setState({ address })} auto-capitalization={false} onBlur={() => this.unActiveInput('address')} onFocus={() => this.activeInput('address')} style={Styles.itemInput}/>
                                </Item>
                            </View>
                            <View style={[ Styles.inputParent ,{ borderColor: this.state.phoneStatus === 1 ? '#0fd1fa' : '#acabae'  }]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem ,{ color:this.state.phoneStatus === 1 ?'#0fd1fa': '#acabae' , fontSize:16  }]}>{ i18n.t('phoneNumber') }</Label>
                                    <Input onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={Styles.itemInput}  />
                                </Item>
                            </View>

                            <View style={[ Styles.inputParent ,{ borderColor: this.state.mailStatus === 1 ? '#0fd1fa' : '#acabae' }]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem ,{ color:this.state.mailStatus === 1 ? '#0fd1fa': '#acabae' , fontSize:16 }]}>{ i18n.t('email') }</Label>
                                    <Input onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'} onBlur={() => this.unActiveInput('mail')} onFocus={() => this.activeInput('mail')} style={Styles.itemInput}  />
                                </Item>
                            </View>

                            <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:30 , marginBottom:15}}>
                                <TouchableOpacity onPress={()=> this._linkPressed('https://www.facebook.com/')}>
                                    <Image source={require('../../assets/images/facebook.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> this._linkPressed('https://www.twitter.com/')}>
                                    <Image source={require('../../assets/images/twitter.png')} style={{width:35 , height:35 , marginHorizontal:25}} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> this._linkPressed('https://www.instagram.com/')}>
                                    <Image source={require('../../assets/images/insta.png')} style={{width:35 , height:35}} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity  onPress={this._toggleModal}>
                                <Text style={{ color: '#6d6c72', textAlign: 'center', fontSize: 18 , fontFamily:'RegularFont' , marginBottom : 30 }}>{ i18n.t('complaint') }</Text>
                            </TouchableOpacity>
                        </Form>
                    </View>

                    <Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this._toggleModal()}>
                        <View style={[Styles.filterModal,{paddingTop:15}]}>
                            <View style={Styles.viewLine}></View>
                            <Text style={[Styles.eventText ,{fontSize:16 , alignSelf:'center'}]}>{ i18n.t('complaint') }</Text>
                            <View style={Styles.modalLine}></View>
                            <View style={{flexDirection:'column' , marginVertical:10}}>
                                <View style={[Styles.inputParent , {borderColor: this.state.nameStatus === 1 ? '#0fd1fa' : '#acabae' , width:'85%' , alignSelf:'center'}]}>
                                    <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                        <Label style={[Styles.labelItem , {color:this.state.nameStatus === 1 ? '#0fd1fa': '#acabae' , fontSize:16  , left:8}]}>{ i18n.t('username') }</Label>
                                        <Input onChangeText={(name) => this.setState({ name })} auto-capitalization={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={Styles.itemInput}/>
                                    </Item>
                                </View>
                                <View style={[ Styles.inputParent ,{ borderColor: this.state.emailStatus === 1 ? '#0fd1fa' : '#acabae'  , width:'85%' , alignSelf:'center'}]}>
                                    <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                        <Label style={[Styles.labelItem ,{ color:this.state.emailStatus === 1 ? '#0fd1fa': '#acabae' , fontSize:16  , left:8}]}>{ i18n.t('email') }</Label>
                                        <Input onChangeText={(email) => this.setState({email})} keyboardType={'email-address'} onBlur={() => this.unActiveInput('email')} onFocus={() => this.activeInput('email')} style={Styles.itemInput}  />
                                    </Item>
                                </View>
                                <View style={[ Styles.inputParent ,{ borderColor: this.state.msgStatus === 1 ? '#0fd1fa' : '#acabae'  , width:'85%' , alignSelf:'center' , height:'auto'}]}>

                                        <Textarea rowSpan={5} placeholder={ i18n.t('msg') } placeholderTextColor={"#acabae"} onChangeText={(msg) => this.setState({msg})} auto-capitalization={false} onBlur={() => this.unActiveInput('msg')} onFocus={() => this.activeInput('msg')} style={{width:'100%' , fontFamily: 'RegularFont', color: '#0fd1fa',textAlign:'right'}}  />

                                </View>
                            </View>
                            <View style={[Styles.btnParent ,{marginTop:30 , backgroundColor:'#fff'}]} >
                                <TouchableOpacity  style={Styles.confirmBtn}  onPress={() => this.onConfirm()}>
                                    <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.cancelBtn} onPress={() => this._toggleModal()}>
                                    <Text style={{color:'#e51d6f' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('cancel') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    </KeyboardAvoidingView>
                </Content>
            </Container>

        );
    }
}

export default ContactUs;