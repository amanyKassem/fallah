import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    I18nManager,
    Platform,
    Share,
    AsyncStorage,
    Linking
} from "react-native";
import {Container, Content, Button, Footer, Icon, Header, Left, Right, Item, Picker, Label} from 'native-base'
import Swiper from 'react-native-swiper';
import Styles from '../../assets/styles'
import Modal from "react-native-modal";
import DateTimePicker from "./Category";
import i18n from "../../locale/i18n";
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from "axios";
import CONST from "../consts";
import {connect} from 'react-redux';
import {NavigationEvents} from "react-navigation";
import {DoubleBounce} from "react-native-loader";


const height = Dimensions.get('window').height;

class EventDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            isModalVisible: false,
            payOnlineModal:false,
            savedEvent: false,
            fancyModal: false,
            event:[],
            images:[],
            price:'',
            ticketType:'normal'
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        const eventId = this.props.navigation.state.params.id;
        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'event_details',
                method: 'POST',
                data: {id: eventId , lang: this.props.lang , device_id: deviceID}
            }).then(response => {
                this.setState({
                    event: response.data.data,
                    images: response.data.data.images,
                    status: response.data.status
                })
            })
            console.log('deviceID' , deviceID)
        });
    }

    savedEvent() {
        const eventId = this.props.navigation.state.params.id;
        this.setState({savedEvent: !this.state.savedEvent})

        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'set_save',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: {event_id: eventId, device_id: deviceID, lang: this.props.lang}
            })
        })
    }
    payClick() {
        const eventId = this.props.navigation.state.params.id;
        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'booking',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: {id: eventId, device_id: deviceID, lang: this.props.lang , price : this.state.price}
            })
        })
        this.props.navigation.navigate('confirmPayment') ;
        this.setState({ payOnlineModal: !this.state.payOnlineModal })

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
    payOnlineModal = (price, type) => {
        this.setState({ payOnlineModal: !this.state.payOnlineModal });
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.setState({ price , ticketType:type});
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
    _linkPressed (url){
        Linking.openURL(url);
    }

    onFocus(payload){
        console.log('this is onWillFocus', payload)
        this.setState({ status: null });

        this.componentWillMount()
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
    renderTicketType(){
            if(this.state.ticketType === 'normal'){
                return(
                    <TouchableOpacity onPress={() => this.payOnlineModal()} style={[Styles.imgText , {justifyContent:'space-between' , marginBottom:10 , backgroundColor:'#fffaee' , padding:10}]}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../../assets/images/red.png')} style={[Styles.leftImg , {width:40 , height:40 , top:0 , marginRight:5}]} resizeMode={'contain'} />
                            <Text style={[Styles.eventText ,{fontSize:15 , top:3}]}>{ i18n.t('normalTicket') }</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[Styles.eventText ,{fontSize:15 , top:3 , marginRight:5}]}>{this.state.event.normal}</Text>
                            <Image source={require('../../assets/images/success.png')} style={[Styles.leftImg , {width:20 , height:20 , top:10 , marginRight:5}]} resizeMode={'contain'} />
                        </View>
                    </TouchableOpacity>
                )
            }else if(this.state.ticketType === 'vip'){
                return(
                    <TouchableOpacity onPress={() => this.payOnlineModal()} style={[Styles.imgText , {justifyContent:'space-between' , marginBottom:10 , backgroundColor:'#fffaee' , padding:10}]}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../../assets/images/purple.png')} style={[Styles.leftImg , {width:40 , height:40 , top:0 , marginRight:5}]} resizeMode={'contain'} />
                            <Text style={[Styles.eventText ,{fontSize:15 , top:3}]}>{ i18n.t('vipTicket') }</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[Styles.eventText ,{fontSize:15 , top:3 , marginRight:5}]}>{this.state.event.vip}</Text>
                            <Image source={require('../../assets/images/success.png')} style={[Styles.leftImg , {width:20 , height:20 , top:10 , marginRight:5}]} resizeMode={'contain'} />
                        </View>
                    </TouchableOpacity>
                )
            }
            return(
                <TouchableOpacity onPress={() => this.payOnlineModal()} style={[Styles.imgText , {justifyContent:'space-between' , marginBottom:10 , backgroundColor:'#fffaee' , padding:10}]}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../../assets/images/yellow.png')} style={[Styles.leftImg , {width:40 , height:40 , top:0 , marginRight:5}]} resizeMode={'contain'} />
                        <Text style={[Styles.eventText ,{fontSize:15 , top:3}]}>{ i18n.t('goldTicket') }</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[Styles.eventText ,{fontSize:15 , top:3 , marginRight:5}]}>{this.state.event.gold}</Text>
                        <Image source={require('../../assets/images/success.png')} style={[Styles.leftImg , {width:20 , height:20 , top:10 , marginRight:5}]} resizeMode={'contain'} />
                    </View>
                </TouchableOpacity>
            )

    }
    render() {
        const eventName = this.props.navigation.state.params.name;
        return (
            <Container style={{backgroundColor:'#fff'}}>
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
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
                    { this.renderLoader() }
                    <View>
                        <Swiper dotStyle={Styles.eventdoteStyle} activeDotStyle={Styles.eventactiveDot}
                                containerStyle={Styles.eventswiper} showsButtons={false} autoplay={true}>
                            {
                                this.state.images.map((img,i) => (
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
                        <View style={{flexDirection:'row' , flexWrap:'wrap'}}>
                            <Text style={[Styles.eventboldName , {fontSize:16}]}>{eventName}</Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={[Styles.greenCircle , {backgroundColor : this.state.event.available ? "#a6d958" : "#f00"}]}></View>
                                <Text style={[Styles.eventText , {fontSize:16 , marginRight:I18nManager.isRTL ?'20%' : 0 , marginLeft:I18nManager.isRTL ?0 : '20%' }]}>{this.state.event.available? i18n.t('available') : i18n.t('notavailable')}</Text>
                            </View>
                           <Text style={[Styles.eventText , {color:'#e51d6f' , fontSize:16}]}>{this.state.event.normal}</Text>
                        </View>
                        <View style={{flexDirection:'column' , marginTop:10}}>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_clock.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15 , top:-2}]}>{this.state.event.time}</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_calender.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>{this.state.event.date}</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_location.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <TouchableOpacity onPress={()=> this._linkPressed('https://google.com/maps/?q=' + this.state.event.lat +','+  this.state.event.lng +'')}>
                                    <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>{this.state.event.city}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.imgText}>
                                <View style={Styles.blackCircle}></View>
                                <Text style={[Styles.eventText ,{fontSize:15,writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{this.state.event.desc}</Text>
                            </View>
                        </View>
                    </View>
                    <Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal()}>
                        <View style={[Styles.filterModal,{padding:15}]}>
                            <View style={Styles.viewLine}></View>
                            <Text style={[Styles.eventText ,{fontSize:16 , alignSelf:'center'}]}>{ i18n.t('chooseTicket') }</Text>
                            <View style={Styles.modalLine}></View>
                            <View style={{flexDirection:'column'}}>
                                <TouchableOpacity  onPress={() => this.payOnlineModal(this.state.event.vip , 'vip')} style={[Styles.imgText , {justifyContent:'space-between'}]}>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../../assets/images/purple.png')} style={[Styles.leftImg , {width:40 , height:40 , top:-5 , marginRight:5}]} resizeMode={'contain'} />
                                        <Text style={[Styles.eventText ,{fontSize:15}]}>{ i18n.t('vipTicket') }</Text>
                                    </View>
                                    <Text style={[Styles.eventText ,{fontSize:15}]}>{this.state.event.vip}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.payOnlineModal(this.state.event.gold , 'gold')} style={[Styles.imgText , {marginVertical:20 , justifyContent:'space-between'}]}>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../../assets/images/yellow.png')} style={[Styles.leftImg , {width:40 , height:40 , top:-5 , marginRight:5}]} resizeMode={'contain'} />
                                        <Text style={[Styles.eventText ,{fontSize:15}]}>{ i18n.t('goldTicket') }</Text>
                                    </View>
                                    <Text style={[Styles.eventText ,{fontSize:15}]}>{this.state.event.gold}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => this.payOnlineModal(this.state.event.normal , 'normal')} style={[Styles.imgText , {justifyContent:'space-between'}]}>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../../assets/images/red.png')} style={[Styles.leftImg , {width:40 , height:40 , top:-5 , marginRight:5}]} resizeMode={'contain'} />
                                        <Text style={[Styles.eventText ,{fontSize:15}]}>{ i18n.t('normalTicket') }</Text>
                                    </View>
                                    <Text style={[Styles.eventText ,{fontSize:15}]}>{this.state.event.normal}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal style={{}} isVisible={this.state.payOnlineModal} onBackdropPress={() => this.payOnlineModal()}>
                        <View style={[Styles.filterModal,{padding:15}]}>
                            <View style={Styles.viewLine}></View>
                            <Image source={require('../../assets/images/online_payment.png')} style={[Styles.leftImg , {width:40 , height:40 , top:0 , marginRight:0 , alignSelf:'center'}]} resizeMode={'contain'} />
                            <Text style={[Styles.eventText ,{fontSize:16 , alignSelf:'center'}]}>{ i18n.t('payOnline') }</Text>
                            <View style={Styles.modalLine}></View>


                            {this.renderTicketType()}

                            <View style={[Styles.filterPayModal ,{flexDirection:'row' , justifyContent:'space-between'}]}>
                                <TouchableOpacity  style={Styles.imgText} onPress={() => this.payClick() }>
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
                    <TouchableOpacity onPress={() => this.toggleModal()} style={Styles.confirmBtn}>
                        <Text style={{color:'#fff' , fontFamily: 'RegularFont', fontSize:16}}>{ i18n.t('reservation') }</Text>
                    </TouchableOpacity>
                </View>
                <Modal style={{}} isVisible={this.state.fancyModal} onBackdropPress={() => this.fancyModal()}>
                    <ImageViewer enableImageZoom={true} onSwipeDown={() => this.fancyModal()} enableSwipeDown={true} imageUrls={this.state.images}/>
                </Modal>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , profile}) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};

export default connect(mapStateToProps, {})(EventDetails);
