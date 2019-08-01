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

import Modal from "react-native-modal";

import Styles from '../../assets/styles'
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import i18n from '../../locale/i18n'

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

      //  console.log(this.props)
    }

    componentWillMount() {

        console.log('user dataaaaaaaa....', this.props.user);
		AsyncStorage.getItem('deviceID').then(deviceID => {

			axios({
                url: CONST.url + 'my_bookings',
                method: 'POST',
                headers: {Authorization: this.props.user.token},
                data: { lang: this.props.lang}
            }).then(response => {
            this.setState({
                events: response.data.data.events,
                dates: response.data.data.dates,
                status: response.data.status
            })

			})
        })
    }

    componentWillReceiveProps(nextProps){
     //   console.log(nextProps)
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
    renderNoData(){
        if (this.state.events.length === 0 && this.state.status != null){
            return(
                <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', height:height-200}}>
                    <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ width: 200, height: 200 }}/>
                    <Text style={{ fontFamily: 'RegularFont', fontSize: 16, textAlign: "center", marginTop: 10, color: '#6d6c72' }}>{ i18n.t('noData') }</Text>
                </View>
            );
        }
    }

    componentDidMount() {
        this.amany = [
            this.props.navigation.addListener('willFocus', () => this.componentWillMount()),
        ];
    }

    componentWillUnmount() {
        this.amany.forEach((sub) => {
            sub.remove();
        });
    }



    render() {
        console.log('events', this.state.events);
        return (
            <Modal avoidKeyboard={true} coverScreen={false} style={{}} deviceHeight={height-140} isVisible={this.state.visibleModal} onBackdropPress={() => this.setState({ visibleModal: this.props.footer_ticketModal('home') })}>
                <View style={[Styles.searchModal , {height:height-200 , paddingHorizontal:10}]}>
					<View style={Styles.viewLine}></View>
					<Text style={[Styles.eventboldName ,{fontSize:16 , alignSelf:'center' , marginBottom:15, marginTop: -20}]}>{ i18n.t('myTickets') }</Text>
                    <View style={Styles.viewLine}></View>
                    { this.renderNoData() }
                    <View style={{flexDirection:'row' , width:'100%' }}>
                       <View>
                           <ScrollView style={{ marginRight:10 }}>
                               {
                                   this.state.dates.map((date, i) => {
                                       return(
                                           <TouchableOpacity onPress={() => this.scroll.scrollTo({x: 0, y: 200, animated: true}) } style={{ borderRadius:5 , padding:5 , width:37 , height:37 , backgroundColor:this.state.activeDate === date ?  '#0fd1fa' : '#ffffffb3', justifyContent: 'center', alignItems: 'center' }} onPress={ () => this.pressedDate(date)} key={i}>
                                               <Text style={[Styles.date, {color:this.state.activeDate === date ? '#fff' : '#6d6c72', marginTop: 5}]}>{date}</Text>
                                           </TouchableOpacity>
                                       )
                                   }
                                   )
                               }
                           </ScrollView>
                       </View>
                        <ScrollView ref={(ticket) => this.scroll = ticket} style={{}}>
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