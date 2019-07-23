import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView} from "react-native";
import {Container, Content, Button, Footer, Icon, Header, Left, Form, Item, Picker, Label, Input, Textarea} from 'native-base'
import FooterSection from './Footer';
import Styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {updateProfile} from "../actions";
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';


const height = Dimensions.get('window').height;
class Profile extends Component {
    constructor(props){
        super(props);

        this.state={
            name: this.props.user.name,
            phone: this.props.user.phone,
            mail: this.props.user.email,
            nameStatus:0,
            phoneStatus: 0,
            mailStatus: 0,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

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
        return (

            <Container style={{backgroundColor:'#fff'}}>
                <Header style={Styles.header} noShadow>
                    <View style={[Styles.headerView , {flexDirection:'row'}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../../assets/images/menu.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={{marginRight:10}} onPress={() => this.props.navigation.navigate('editProfile')}>
                                <Image source={require('../../assets/images/edit.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={{left:5}}>
                                <Image source={require('../../assets/images/white_left.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Header>
                <Content style={Styles.homecontent}>
                    <View style={[Styles.eventswiper ,  {backgroundColor:'#121320' , height:400}]}>
                        <Image source={{uri:this.props.user.avatar}} style={[Styles.eventswiper , {height:400}]} resizeMode={'cover'} />

                    </View>

                    <View style={[Styles.parentViewEvent , {height:'auto' , paddingHorizontal:30 , marginTop:-110 , borderTopLeftRadius:75 }]}>
                        <Form style={{width: '100%' , marginTop:30}}>
                            <View style={[Styles.inputParent , {borderColor: '#acabae'}]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem , {color: '#acabae' , fontSize:16 , top:-11}]}>{ i18n.t('username') }</Label>
                                    <Input disabled={true} value={this.state.name} onChangeText={(name) => this.setState({ name })} auto-capitalization={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={Styles.itemInput}/>
                                </Item>
                            </View>
                            <View style={[ Styles.inputParent ,{ borderColor:  '#acabae'  }]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem ,{ color: '#acabae' , fontSize:16 , top:-11 }]}>{ i18n.t('phoneNumber') }</Label>
                                    <Input disabled={true} value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={Styles.itemInput}  />
                                </Item>
                            </View>

                            <View style={[ Styles.inputParent ,{ borderColor: '#acabae' }]}>
                                <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                    <Label style={[Styles.labelItem ,{ color:'#acabae' , fontSize:16 , top:-11}]}>{ i18n.t('email') }</Label>
                                    <Input disabled={true} value={this.state.mail} onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'} onBlur={() => this.unActiveInput('mail')} onFocus={() => this.activeInput('mail')} style={Styles.itemInput}  />
                                </Item>
                            </View>

                        </Form>
                    </View>

                </Content>
                <FooterSection pageRoute={'profile'} navigation={this.props.navigation}/>
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

export default connect(mapStateToProps)(Profile);