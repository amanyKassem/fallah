import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, Platform, Share} from "react-native";
import {Container, Content, Button, Footer, Icon, Header, Left, Right, Item, Picker, Label, Input} from 'native-base'
import Swiper from 'react-native-swiper';
import Styles from '../../assets/styles'
import Modal from "react-native-modal";
import DateTimePicker from "./Category";
import i18n from "../../local/i18n";
import ImageViewer from 'react-native-image-zoom-viewer';
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';


const height = Dimensions.get('window').height;
const images = [{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
},{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
},{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
},{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
},]
class EventDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            isModalVisible: false,
            payOnlineModal:false,
            savedEvent: false,
            fancyModal: false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    savedEvent() {
        this.setState({savedEvent: !this.state.savedEvent})

        // AsyncStorage.getItem('deviceID').then(deviceID => {
        //     axios({
        //         url: CONST.url + 'set_fav',
        //         method: 'POST',
        //         headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
        //         data: {product_id: this.state.id, device_id: deviceID, lang: this.props.lang}
        //     })
        // })
    }

    renderImage() {
        let source = '';
        if (this.state.savedEvent) {
            source = require('../../assets/images/saved.png')
        } else {
            source = require('../../assets/images/save_event.png')
        }
        return source;
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    fancyModal = () => {
        this.setState({ fancyModal: !this.state.fancyModal });
    };
    payOnlineModal = () => {
        this.setState({ payOnlineModal: !this.state.payOnlineModal });
        // this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    render() {
        return (

            <Container style={{backgroundColor:'#fff'}}>
                <Header style={[Styles.header , {marginTop:Platform.OS === 'ios' ?15:40}]} noShadow>
                    <View style={[Styles.headerView , {flexDirection:'row'}]}>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/white_right.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={{marginRight:10}}  onPress={() => this.savedEvent()}>
                                <Image source={this.renderImage()} style={Styles.headerMenu} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={this.onShare}>
                                <Image source={require('../../assets/images/share_event.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Header>
                <Content style={Styles.homecontent}>
                    <View>
                        <Swiper dotStyle={Styles.eventdoteStyle} activeDotStyle={Styles.eventactiveDot}
                                containerStyle={Styles.eventswiper} showsButtons={false} autoplay={true}>
                            {
                                images.map((img,i) => (
                                    <TouchableOpacity onPress={() => this.fancyModal()} style={[Styles.slide , {borderBottomRightRadius:0}]}>
                                            <View style={Styles.swiperLine} />
                                        <Image source={{ uri: img.url }} style={Styles.swiperimageEvent}
                                               resizeMode={'cover'}/>
                                    </TouchableOpacity>
                                ))


                            }
                        </Swiper>
                    </View>
                    <View style={[Styles.parentViewEvent , {height:'auto' , paddingRight:40 , marginTop:-70}]}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[Styles.eventboldName , {fontSize:16}]}>حفلة عمر خيرت</Text>
                            <View style={Styles.greenCircle}></View>
                            <Text style={[Styles.eventText , {fontSize:16 , marginRight:110}]}>متاح</Text>
                            <Text style={[Styles.eventText , {color:'#e51d6f' , fontSize:16}]}>500 { i18n.t('RS') }</Text>
                        </View>
                        <View style={{flexDirection:'column' , marginTop:10}}>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_clock.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15 , top:-2}]}>10 مساءا</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_calender.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>22/5/2019</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_location.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>الرياض التخصصي</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <View style={Styles.blackCircle}></View>
                                <Text style={[Styles.eventText ,{fontSize:15,writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص والله نص</Text>
                            </View>
                        </View>
                    </View>
                    {/*<Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal()}>*/}
                        {/*<View style={[Styles.filterModal,{padding:15}]}>*/}
                            {/*<View style={Styles.viewLine}></View>*/}
                            {/*<Text style={[Styles.eventText ,{fontSize:16 , alignSelf:'center'}]}>اختر وسيلة الدفع</Text>*/}
                            {/*<View style={Styles.modalLine}></View>*/}
                            {/*<View style={{flexDirection:'column'}}>*/}
                                {/*<TouchableOpacity onPress={() => this.payOnlineModal()} style={Styles.imgText}>*/}
                                    {/*<Image source={require('../../assets/images/online_payment.png')} style={[Styles.leftImg , {width:40 , height:40 , top:-5 , marginRight:5}]} resizeMode={'contain'} />*/}
                                    {/*<Text style={[Styles.eventText ,{fontSize:15}]}>دفع اول لاين</Text>*/}
                                {/*</TouchableOpacity>*/}
                                {/*<TouchableOpacity onPress={() => { this.props.navigation.navigate('bankPay') ;this.setState({ isModalVisible: !this.state.isModalVisible })}} style={[Styles.imgText , {marginVertical:20}]}>*/}
                                    {/*<Image source={require('../../assets/images/bank_transfer.png')} style={[Styles.leftImg , {width:40 , height:40 , top:-5 , marginRight:5}]} resizeMode={'contain'} />*/}
                                    {/*<Text style={[Styles.eventText ,{fontSize:15}]}>دفع حوالة بنكية</Text>*/}
                                {/*</TouchableOpacity>*/}
                                {/*<TouchableOpacity onPress={() => { this.props.navigation.navigate('cash') ;this.setState({ isModalVisible: !this.state.isModalVisible })}} style={Styles.imgText}>*/}
                                    {/*<Image source={require('../../assets/images/cash.png')} style={[Styles.leftImg , {width:40 , height:40 , top:-5 , marginRight:5}]} resizeMode={'contain'} />*/}
                                    {/*<Text style={[Styles.eventText ,{fontSize:15}]}>دفع كاش</Text>*/}
                                {/*</TouchableOpacity>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    {/*</Modal>*/}

                    <Modal style={{}} isVisible={this.state.payOnlineModal} onBackdropPress={() => this.payOnlineModal()}>
                        <View style={[Styles.filterModal,{padding:15}]}>
                            <View style={Styles.viewLine}></View>
                            <Text style={[Styles.eventText ,{fontSize:16 , alignSelf:'center'}]}>{ i18n.t('paymentMethod') }</Text>
                            <View style={Styles.modalLine}></View>
                            <TouchableOpacity onPress={() => this.payOnlineModal()} style={[Styles.imgText , {justifyContent:'space-between' , marginBottom:10 , backgroundColor:'#f9f7fb' , padding:10}]}>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../../assets/images/online_payment.png')} style={[Styles.leftImg , {width:40 , height:40 , top:0 , marginRight:5}]} resizeMode={'contain'} />
                                    <Text style={[Styles.eventText ,{fontSize:15}]}>{ i18n.t('payOnline') }</Text>
                                </View>
                                <Image source={require('../../assets/images/success.png')} style={[Styles.leftImg , {width:20 , height:20 , top:10 , marginRight:5}]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <View style={[Styles.filterPayModal ,{flexDirection:'row' , justifyContent:'space-between'}]}>
                                <TouchableOpacity  style={Styles.imgText} onPress={() => { this.props.navigation.navigate('confirmPayment') ;this.setState({ payOnlineModal: !this.state.payOnlineModal })}}>
                                    <Image source={require('../../assets/images/visa.png')} style={[Styles.leftImg , {width:50 , height:50 , top:-5 , marginRight:5}]} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.imgText}>
                                    <Image source={require('../../assets/images/sadad.png')} style={[Styles.leftImg , {width:50 , height:50 , top:-5 , marginRight:5}]} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.imgText}>
                                    <Image source={require('../../assets/images/mada.png')} style={[Styles.leftImg , {width:50 , height:50 , top:-5 , marginRight:5}]} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
                <View style={[Styles.btnParent ,{marginTop:0 , backgroundColor:'#fff'}]} >
                    <TouchableOpacity onPress={() => this.payOnlineModal()} style={Styles.confirmBtn}>
                        <Text style={{color:'#fff' , fontFamily: 'RegularFont', fontSize:16}}>{ i18n.t('reservation') }</Text>
                    </TouchableOpacity>
                </View>
                <Modal style={{}} isVisible={this.state.fancyModal} onBackdropPress={() => this.fancyModal()}>
                    <ImageViewer enableImageZoom={true} onSwipeDown={() => this.fancyModal()} enableSwipeDown={true} imageUrls={images}/>
                </Modal>
            </Container>

        );
    }
}

export default EventDetails;