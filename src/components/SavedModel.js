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
    Platform,
    AsyncStorage
} from "react-native";
import { Container, Content, Button, Footer, Icon, Item , Input } from 'native-base'
import Modal from "react-native-modal";

import Styles from '../../assets/styles'
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import i18n from "../../locale/i18n";

const height = Dimensions.get('window').height;



class SavedModel extends Component {
    constructor(props){
        super(props);

        this.state={
            visibleModal:false,
            savedItems:[]
        }

     //   console.log(this.props)
    }

    componentWillMount() {
        AsyncStorage.getItem('deviceID').then(deviceID => {
            console.log('saves device id & token ..', deviceID, this.props.user.token);
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

    componentWillReceiveProps(nextProps){
        this.setState({visibleModal:nextProps.isModalVisible})
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

    renderNoData(){
        if (this.state.savedItems.length === 0 && this.state.status != null){
            return(
                <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', height:height-200}}>
                    <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ width: 200, height: 200 }}/>
                    <Text style={{ fontFamily: 'RegularFont', fontSize: 16, textAlign: "center", marginTop: 10, color: '#6d6c72' }}>{ i18n.t('noData') }</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <Modal avoidKeyboard={true} coverScreen={false} style={{}} deviceHeight={height-140} isVisible={this.state.visibleModal} onBackdropPress={() => this.setState({ visibleModal: this.props.footer_savedModal('home') })}>
                <View style={[Styles.searchModal , {height:height-200}]}>
					<View style={Styles.viewLine}></View>
					<Text style={[Styles.eventboldName ,{fontSize:16 , alignSelf:'center' , marginBottom:15, marginTop: -20}]}>{ i18n.t('saves') }</Text>
                    <View style={Styles.viewLine}></View>
                        { this.renderNoData() }
                    <FlatList
                        data={this.state.savedItems}
                        renderItem={({item}) => this.renderItems(item)}
                        numColumns={1}
                        keyExtractor={this._keyExtractor}
                    />

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

export default connect(mapStateToProps, {})(SavedModel);