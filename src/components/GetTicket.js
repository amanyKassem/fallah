import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, KeyboardAvoidingView, Slider} from "react-native";
import {
    Container,
    Content,
    Button,
    Footer,
    Icon,
    Header,
    Left,
    Form,
    Item,
    Picker,
    Label,
    Input,
    Toast
} from 'native-base'
import Styles from '../../assets/styles'
import QRCode from 'react-native-qrcode';
import i18n from "../../locale/i18n";
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import { DoubleBounce } from 'react-native-loader';


const height = Dimensions.get('window').height;
class GetTicket extends Component {
    constructor(props){
        super(props);

        this.state={
            ticket:[],
            status:null
        }
    }
    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        const ticketId = this.props.navigation.state.params.id;

        axios({
            url: CONST.url + 'ticket_details',
            method: 'POST',
            headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
            data: { lang: this.props.lang , booking_id : ticketId}
        }).then(response => {
            this.setState({
                ticket: response.data.data,
                status: response.data.status
            })
        })
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
    deleteTicket(){
        const ticketId = this.props.navigation.state.params.id;

        axios({
            url: CONST.url + 'delete_ticket',
            method: 'POST',
            headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
            data: { lang: this.props.lang , booking_id : ticketId}
        }).then(response => {
            Toast.show({
                text: response.data.msg,
                type: response.data.status === 200 ? "success" : "danger",
                duration: 3000
            });
            this.props.navigation.navigate('home')
        })
    }
    onFocus(payload){
        console.log('this is onWillFocus', payload)
        this.setState({ status: null });

        this.componentWillMount()
    }
    render() {
        const name = this.props.navigation.state.params.name;
        return (

            <Container style={{backgroundColor:'#fff'}}>
                { this.renderLoader() }
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Header style={Styles.header} noShadow>
                    <View style={[Styles.headerView , {flexDirection:'row' , paddingHorizontal:10}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={Styles.homecontent}>

                    <View style={Styles.QR}>
                        <QRCode
                            value={this.state.ticket.booking_id}
                            size={80}
                            bgColor='#000'
                            fgColor='white'/>
                    </View>
                    <View style={[Styles.eventswiper ,  {backgroundColor:'#121320' , height:400}]}>
                        <Image source={{ uri: this.state.ticket.image }} style={[Styles.eventswiper , {height:400}]} resizeMode={'cover'} />
                        <View style={Styles.dateHours}>
                            <View style={[Styles.dateView , {backgroundColor:"#0fd1fac2" , marginRight:10}]}>
                                <Text style={Styles.dateText}>{this.state.ticket.date}</Text>
                            </View>
                            <View style={[Styles.dateView , {backgroundColor:"#ea518eb5" }]}>
                                <Text style={Styles.dateText}>{this.state.ticket.remain} { i18n.t('remaining') }</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[Styles.parentViewEvent , {height:'auto' , paddingRight:40 , marginTop:-105}]}>
                        <View style={{flexDirection:'row' , flexWrap:'wrap'}}>
                            <Text style={[Styles.eventboldName , {fontSize:16, marginRight:I18nManager.isRTL ?'25%':0 ,  marginLeft:I18nManager.isRTL ?0 : '25%'}]}>{name}</Text>
                            <Text style={[Styles.eventText , {color:'#e51d6f' , fontSize:16}]}>{this.state.ticket.price}</Text>
                        </View>
                        <View style={{flexDirection:'column' , marginTop:10}}>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_clock.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15 , top:-2}]}>{this.state.ticket.time}</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_calender.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>{this.state.ticket.no_date}</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_location.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>{this.state.ticket.city}</Text>
                            </View>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_ticket.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>{ i18n.t('onlineBooking') }</Text>
                            </View>
                            <Text style={[Styles.eventText ,{fontSize:15, top:-2}]}>{this.state.ticket.desc}ا</Text>
                        </View>
                    </View>

                    <View style={[Styles.modalLine ]}></View>
                    <View style={{ paddingLeft:10, paddingBottom:10 ,paddingRight:40 }}>
                        <Text style={[Styles.eventText , { fontSize:16 , marginBottom:100 , writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('process') }</Text>
                    </View>
                </Content>
                <View style={[Styles.btnParent ,{marginTop:0 , backgroundColor:'#fff' , height:45}]} >
                    <TouchableOpacity onPress={ () => this.deleteTicket()} style={[Styles.confirmBtn , {backgroundColor:'#fff' , borderColor:'#e51d6f' , borderWidth:1 , borderBottomWidth:0}]}  >
                        <Text style={{color:'#e51d6f' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('deleteTicket') }</Text>
                    </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps, {})(GetTicket);