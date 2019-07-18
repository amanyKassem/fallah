import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    I18nManager,
    FlatList,
    AsyncStorage
} from "react-native";
import { Container, Content, Button, Footer, Icon, Item , Input } from 'native-base'
import Modal from "react-native-modal";

import Styles from '../../assets/styles'
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;

class TicketModal extends Component {
    constructor(props){
        super(props);

        this.state={
            visibleModal:false,
            events:[],
            dates:[],
            activeDate:null
        }

        console.log(this.props)
    }

    componentWillMount() {
            axios({
                url: CONST.url + 'my_bookings',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: { lang: this.props.lang}
            }).then(response => {
            this.setState({
                events: response.data.data.events,
                dates: response.data.data.dates,
                status: response.data.status
            })
        })
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({visibleModal:nextProps.isModalVisible})
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('getTicket', { id: item.booking_id , name:item.title }, this.setState({visibleModal:this.state.isModalVisible}))}  style={[Styles.eventTouch , {height:110 , borderRadius:5}]}>
                <Image source={{ uri: item.image }} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:5}}/>
                <View style={[Styles.eventCont , {backgroundColor: '#00000060' , position:'absolute' , top:0 , height:'100%' , flexDirection:'column' , padding:10, borderRadius:5} ]}>
                    <View style={{flexDirection:'row' , justifyContent:'flex-end' , flex:1 , width:'100%'}}>
                        <View style={{backgroundColor:'#ffffffb3'
                            , padding:5 , width:35 , height:37 , borderRadius:5 }}>

                            <Text style={[Styles.eventName , {color:'#fff', fontSize:12
                                ,textAlign:'center' , lineHeight:14 , height:35}]}>{item.date}</Text>
                        </View>
                    </View>
                    <Text style={[Styles.eventName , {color:'#fff' , alignSelf:"flex-start"}]}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    pressedDate(date){
        this.setState({activeDate :date})
    }

    onFocus(){
        this.componentWillMount()
    }

    render() {
        console.log('events', this.state.events);
        return (
            <Modal avoidKeyboard={true} coverScreen={false} style={{}} deviceHeight={height-140} isVisible={this.state.visibleModal} onBackdropPress={() => this.setState({ visibleModal: this.props.footer_ticketModal('home') })}>
                <NavigationEvents onWillFocus={payload => this.onFocus()} />
                <View style={[Styles.searchModal , {height:height-200 , paddingHorizontal:10}]}>
                    <View style={Styles.viewLine}></View>
                    <View style={{flexDirection:'row' , width:'100%' }}>
                       <View>
                           <ScrollView style={{ marginRight:10 }}>
                               {
                                   this.state.dates.map((date, i) => {
                                       return(
                                           <TouchableOpacity onPress={ () => this.pressedDate(date)} key={i}>
                                               <Text style={[Styles.date, {color:this.state.activeDate === date ? '#fff' : '#6d6c72', backgroundColor:this.state.activeDate === date ?  '#0fd1fa' : '#ffffffb3'}]}>{date}</Text>
                                           </TouchableOpacity>
                                       )
                                   }
                                   )
                               }
                           </ScrollView>
                       </View>
                        <ScrollView style={{}}>
                            <FlatList
                                data={this.state.events}
                                renderItem={({item}) => this.renderItems(item)}
                                numColumns={1}
                                keyExtractor={this._keyExtractor}
                            />
                        </ScrollView>
                    </View>
                </View>
            </Modal>


        );
    }
}

const mapStateToProps = ({ lang , profile}) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};
export default connect(mapStateToProps, {})(TicketModal);