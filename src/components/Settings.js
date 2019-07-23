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
    Switch,
    Platform
} from "react-native";
import {Container, Content, Header,  Item,Label, Input, Body , Toast} from 'native-base'
import Modal from "react-native-modal";
import Styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import axios from "axios";
import CONST from "../consts";
import {updateProfile} from "../actions";


const height = Dimensions.get('window').height;
class Settings extends Component {
    constructor(props){
        super(props);

        this.state={
            isModalLangVisible: false,
            isModalPassVisible: false,
            selectedLang: 'ar',
            SwitchOnValueHolder : false,
            currentPass: '',
            newPass: '',
            rePass: '',
            currentPassStatus:0,
            newPassStatus: 0,
            rePassStatus: 0,
            isSubmitted: false
        }
    }
    activeInput(type){
        if (type === 'currentPass'){
            this.setState({ currentPassStatus: 1 })
        }else if (type === 'newPass') {
            this.setState({newPassStatus: 1})
        }else
            this.setState({rePassStatus: 1})
    }

    unActiveInput(type){
        if (type === 'currentPass'){
            this.setState({ currentPassStatus: 0})
        }else if (type === 'newPass') {
            this.setState({newPassStatus: 0})
        }else
            this.setState({rePassStatus: 0})
    }
    static navigationOptions = () => ({
        drawerLabel: i18n.t('settings'),
        drawerIcon: ( <Image source={require('../../assets/images/setting.png')} style={{ height: 20, width: 20 , top:5 }} resizeMode={'contain'} />  )
    });
    _toggleModalLang = () => this.setState({ isModalLangVisible: !this.state.isModalLangVisible });
    _toggleModalPass = () => this.setState({ isModalPassVisible: !this.state.isModalPassVisible });

    onChooseLang() {
        this.setState({ isModalLangVisible: !this.state.isModalLangVisible });
        // if (this.props.lang != this.state.selectedLang){
        //     this.props.chooseLang(this.state.selectedLang);
        // }
    };
    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <View style={{justifyContent:'center' , alignItems:'center', width:'50%', flex:1}}>
                    <DoubleBounce size={20} color="#26b5c4" style={{alignSelf: 'center' , width:'100%'}}/>
                </View>
            )
        }

        if (this.state.currentPass == '' || this.state.newPass == '' || this.state.rePass == '' ){
            return (
                <View  style={[Styles.confirmBtn , {backgroundColor:'#999'}]} >
                    <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('confirm') }</Text>
                </View>
            );
        }else {
            return (
                <TouchableOpacity  style={Styles.confirmBtn}  onPress={() => this.onPassChange()}>
                    <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('confirm') }</Text>
                </TouchableOpacity>
            );
        }
    }

    onPassChange() {
        if (this.state.newPass === this.state.rePass){
            this.setState({ isSubmitted: true });
            axios({
                method: 'POST',
                url: CONST.url + 'update_password',
                headers: {Authorization: this.props.user.token},
                data: {
                    old_password: this.state.currentPass,
                    new_password: this.state.newPass,
                    lang: this.props.lang,
                }
            }).then(response => {
                this.setState({ isSubmitted: false, isModalPassVisible: !this.state.isModalPassVisible, currentPass: '', newPass: '', rePass: '' });
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
    };
    stopNotification = (value) =>{
        this.setState({ SwitchOnValueHolder: value })

        // console.log('swiper val ...', value, this.state.SwitchOnValueHolder);
        // axios({
        //     method: 'POST',
        //     url: CONST.url + 'stop_notifications',
        //     headers: {Authorization: this.props.user.token} })
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
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'RegularFont' }}>{ i18n.t('settings') }</Text>
                        </Body>
                    </View>
                </Header>
                <Content style={Styles.homecontent}>

                    <View style={[Styles.eventswiper ,  {backgroundColor:'#121320' , height:400}]}>
                        <Image source={require('../../assets/images/bg_color_vectors.png')} style={[Styles.eventswiper , { height: 400 }]} resizeMode={'cover'} />
                        <View style={[Styles.dateHours , {bottom:'55%' , textAlign:'center' , left:0 , paddingHorizontal:15}]}>
                            <Text style={[Styles.dateText  , {textAlign:'center' , width:'auto'}]}>نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص</Text>
                        </View>
                    </View>

                    <View style={[Styles.parentViewEvent , {height:'auto' , paddingRight:35 , marginTop:-105 , flexDirection:'column' , paddingTop:20 , paddingLeft:20}]}>
                        <View style={[Styles.settings , {borderBottomWidth:1 , borderColor:'#c5c5c5' }]}>
                            <TouchableOpacity style={{width:'100%' ,flexDirection:'row', top:-7}} onPress={this._toggleModalLang}>
                                <Image source={require('../../assets/images/blue_shape.png')} style={Styles.setImg} resizeMode={'contain'} />
                                <Text style={Styles.setText}>{ i18n.t('language') }</Text>
                            </TouchableOpacity >
                        </View>
                        <View style={[Styles.settings , {borderBottomWidth:1 , borderColor:'#c5c5c5' }]}>
                            <TouchableOpacity style={{width:'100%' ,flexDirection:'row' , top:-7}} onPress={this._toggleModalPass}>
                                <Image source={require('../../assets/images/pink_shape.png')} style={Styles.setImg} resizeMode={'contain'} />
                                <Text style={Styles.setText}>{ i18n.t('changePass') }</Text>
                            </TouchableOpacity >
                        </View>
                        <View style={[Styles.settings , {justifyContent:'space-between'}]}>
                            <View style={{flexDirection:'row', top:-7}}>
                                <Image source={require('../../assets/images/blue_shape.png')} style={Styles.setImg} resizeMode={'contain'} />
                                <Text style={Styles.setText}>{ i18n.t('stopNotification') }</Text>
                            </View >

                            <Switch
                                onValueChange={(value) => this.stopNotification(value)}
                                style={{right:-10 }}
                                value={this.state.SwitchOnValueHolder}
                                onTintColor={'#ddd'}
                                thumbTintColor={'#0fd1fa'}
                                tintColor={'#c5c5c5'}
                            />
                        </View>
                    </View>
                    <Modal style={{}} isVisible={this.state.isModalLangVisible} onBackdropPress={() => this._toggleModalLang()}>
                        <View style={[Styles.filterModal,{paddingTop:15}]}>
                            <View style={Styles.viewLine}></View>
                            <Text style={[Styles.eventText ,{fontSize:16 , alignSelf:'center'}]}>{ i18n.t('chooseLang') }</Text>
                            <View style={Styles.modalLine}></View>
                            <View style={{flexDirection:'column' , marginVertical:10}}>
                                <View style={{marginBottom:10 , borderWidth:1 ,borderColor: this.state.selectedLang === 'ar'  ? '#0fd1fa' : '#c5c5c5' , borderRadius:35 , justifyContent:'center' , flex:1 , height:45 , alignItems:'center'  , width:'85%' , alignSelf:'center' , paddingHorizontal:15}}>
                                    <TouchableOpacity style={{width:'100%'}} onPress={() => this.setState({ selectedLang: 'ar' })}>
                                        <Text style={{fontFamily:'RegularFont' , fontSize:15 ,color: this.state.selectedLang === 'ar'  ? '#0fd1fa' : '#6d6c72' , alignSelf: 'flex-start'}}>العربية</Text>
                                    </TouchableOpacity >
                                </View>
                                <View style={{marginBottom:10 , borderWidth:1 ,borderColor: this.state.selectedLang === 'en' ? '#0fd1fa' : '#c5c5c5' , borderRadius:35 , justifyContent:'center' , flex:1 , height:45 , alignItems:'center'  , width:'85%' , alignSelf:'center'  , paddingHorizontal:15}}>
                                    <TouchableOpacity style={{width:'100%'}} onPress={() => this.setState({ selectedLang: 'en' })}>
                                        <Text style={{fontFamily:'RegularFont' , fontSize:15 ,color: this.state.selectedLang === 'en' ? '#0fd1fa' : '#6d6c72' , alignSelf: 'flex-start' }}>English</Text>
                                    </TouchableOpacity >
                                </View>
                            </View>
                            <View style={[Styles.btnParent ,{marginTop:10 , backgroundColor:'#fff'}]} >
                                <TouchableOpacity  style={Styles.confirmBtn}  onPress={() => this.onChooseLang()}>
                                    <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.cancelBtn} onPress={() => this._toggleModalLang()}>
                                    <Text style={{color:'#e51d6f' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('cancel') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal style={{}} isVisible={this.state.isModalPassVisible} onBackdropPress={() => this._toggleModalPass()}>
                        <View style={[Styles.filterModal,{paddingTop:15}]}>
                            <View style={Styles.viewLine}></View>
                            <View style={{flexDirection:'column' , marginVertical:10}}>
                                <View style={[Styles.inputParent , {borderColor: this.state.currentPassStatus === 1 ? '#0fd1fa' : '#acabae' , width:'85%' , alignSelf:'center'}]}>
                                    <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                        <Label style={[Styles.labelItem , {color:this.state.currentPassStatus === 1 ? '#0fd1fa': '#acabae' , fontSize:16 , left:8}]}>{ i18n.t('password') }</Label>
                                        <Input  value={this.state.currentPass} onChangeText={(currentPass) => this.setState({ currentPass })} auto-capitalization={false} secureTextEntry onBlur={() => this.unActiveInput('currentPass')} onFocus={() => this.activeInput('currentPass')} style={Styles.itemInput}/>
                                    </Item>
                                </View>
                                <View style={[ Styles.inputParent ,{ borderColor: this.state.newPassStatus === 1 ? '#0fd1fa' : '#acabae'  , width:'85%' , alignSelf:'center'}]}>
                                    <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                        <Label style={[Styles.labelItem ,{ color:this.state.newPassStatus === 1 ?'#0fd1fa': '#acabae' , fontSize:16 , left:8}]}>{ i18n.t('newPass') }</Label>
                                        <Input value={this.state.newPass} onChangeText={(newPass) => this.setState({newPass})} auto-capitalization={false} secureTextEntry onBlur={() => this.unActiveInput('newPass')} onFocus={() => this.activeInput('newPass')} style={Styles.itemInput}  />
                                    </Item>
                                </View>
                                <View style={[ Styles.inputParent ,{ borderColor: this.state.rePassStatus === 1 ? '#0fd1fa' : '#acabae'  , width:'85%' , alignSelf:'center'}]}>
                                    <Item floatingLabel style={[Styles.item , {width:'100%'}]} bordered>
                                        <Label style={[Styles.labelItem ,{ color:this.state.rePassStatus === 1 ?'#0fd1fa': '#acabae' , fontSize:16 , left:8 }]}>{ i18n.t('verifyNewPass') }</Label>
                                        <Input value={this.state.rePass} onChangeText={(rePass) => this.setState({rePass})} auto-capitalization={false} secureTextEntry onBlur={() => this.unActiveInput('rePass')} onFocus={() => this.activeInput('rePass')} style={Styles.itemInput}  />
                                    </Item>
                                </View>
                            </View>
                            <View style={[Styles.btnParent ,{marginTop:30 , backgroundColor:'#fff'}]} >
                                { this.renderSubmit() }
                                <TouchableOpacity style={Styles.cancelBtn} onPress={() => this._toggleModalPass()}>
                                    <Text style={{color:'#e51d6f' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('cancel') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
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

export default connect(mapStateToProps, {updateProfile})(Settings);