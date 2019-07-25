import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    I18nManager,
    FlatList,
    Slider,
    Platform,
    AsyncStorage
} from "react-native";
import { Container, Content, Button, Picker, Icon, Header , Left, Right, Body , Form, Item, Input, Label  } from 'native-base'
import Modal from "react-native-modal";
import Styles from '../../assets/styles';
import DateTimePicker from "react-native-modal-datetime-picker";
import i18n from "../../locale/i18n";
import axios from "axios";
import CONST from "../consts";
import {NavigationEvents} from "react-navigation";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


class SavedEvent extends Component {
    constructor(props){
        super(props);

        this.state={
            savedItems:[],
            status:null,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'saves',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: {device_id: deviceID, lang: this.props.lang}
            }).then(response => {
                this.setState({
                    savedItems: response.data.data,
                    status: response.data.status
                })
            })
        })
    }


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('eventDetails', { id: item.id }, this.setState({visibleModal:this.state.isModalVisible}))}  style={[Styles.eventTouch , {height:130 , borderRadius:5}]}>
                <Image source={{ uri: item.image }} resizeMode={'cover'} style={{width:'100%' , height:'100%', borderRadius:5}}/>
                <View style={[Styles.eventCont , {backgroundColor: '#00000060' , position:'absolute' , top:0 , height:'100%' , flexDirection:'column' , padding:10, borderRadius:5} ]}>
                    <View style={{flexDirection:'row' , justifyContent:'space-between' , flex:1 , width:'100%'}}>
                        <Image source={require('../../assets/images/saved.png')} resizeMode={'cover'} style={{width:20 , height:25 , top:-12}}/>
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
    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height + 100, alignSelf:'center' , backgroundColor:'#121320' , width:'100%'  , position:'absolute' , zIndex:1 }}>
                    <DoubleBounce size={20} color="#0fd1fa" />
                </View>
            );
        }
    }

    onFocus(payload){
        console.log('this is onWillFocus', payload)
        this.setState({ status: null });

        this.componentWillMount()
    }

    render() {
        return (

            <Container style={Styles.container}>
                <Header style={[Styles.altHeaader , {paddingTop:Platform.OS === 'ios' ?0: 'auto' , paddingBottom: Platform.OS === 'ios' ?25:0} ]} noShadow>
                    <Right style={Styles.rightHeader}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={Styles.backStyle} resizeMode={'contain'} />
                        </Button>
                    </Right>
                    <Body style={Styles.bodyHeadrt}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'RegularFont' }}>{i18n.t('favoriteEvents')}</Text>
                    </Body>
                    <Left style={Styles.leftHeader}>

                    </Left>
                </Header>
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Content style={Styles.content}>
                    { this.renderLoader() }
                    <View style={Styles.parentView}>
                        <View style={Styles.viewLine}></View>
                        <Image source={require('../../assets/images/fav_events.png')}  style={Styles.headphone} resizeMode={'contain'} />
                        <FlatList
                            data={this.state.savedItems}
                            renderItem={({item}) => this.renderItems(item)}
                            numColumns={1}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>

                </Content>
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

export default connect(mapStateToProps, {})(SavedEvent);