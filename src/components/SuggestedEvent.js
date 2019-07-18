import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions , I18nManager , FlatList , Slider , Platform} from "react-native";
import { Container, Content, Button, Picker, Icon, Header , Left, Right, Body , Form, Item, Input, Label  } from 'native-base'
import Modal from "react-native-modal";
import Styles from '../../assets/styles';
import DateTimePicker from "react-native-modal-datetime-picker";
import i18n from "../../local/i18n";
import axios from "axios";
import CONST from "../consts";
import {NavigationEvents} from "react-navigation";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


class SuggestedEvent extends Component {
    constructor(props){
        super(props);

        this.state={
            events:[],
            status:null,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount(){
        axios({
            url: CONST.url + 'suggested_events',
            method: 'POST',
            data: {lang: this.props.lang}
        }).then(response => {
            this.setState({
                events: response.data.data,
                status: response.data.status,
            })
        })

    }






    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('eventDetails', { id: item.id , name :item.title })} style={Styles.eventTouch}>
                <View style={Styles.eventContent}>
                    <Right style={Styles.eventRight}>
                        <Image source={{ uri: item.image }} resizeMode={'cover'} style={Styles.categoryImg}/>
                    </Right>
                    <Left style={Styles.eventLeft}>
                        <Text style={Styles.eventboldName}>{item.title}</Text>
                        <View style={Styles.imgText}>
                            <Image source={require('../../assets/images/gray_clock.png')} style={Styles.leftImg} resizeMode={'contain'} />
                            <Text style={Styles.eventText}>{item.time}</Text>
                        </View>
                        <View style={Styles.datePrice}>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_calender.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={Styles.eventText}>{item.date}</Text>
                            </View>
                            <Text style={[Styles.eventText , {color:'#e51d6f'}]}>{item.price}</Text>
                        </View>
                    </Left>
                </View>
            </TouchableOpacity>
        );
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
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'RegularFont' }}>{i18n.t('proposedEvents')}</Text>
                    </Body>
                    <Left style={Styles.leftHeader}>

                    </Left>
                </Header>
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Content style={Styles.content}>
                    { this.renderLoader() }
                    <View style={Styles.parentView}>
                        <View style={Styles.viewLine}></View>
                        <Image source={require('../../assets/images/suggestion_events.png')}  style={Styles.headphone} resizeMode={'contain'} />
                        <FlatList
                            data={this.state.events}
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

const mapStateToProps = ({ lang }) => {
    return {
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {})(SuggestedEvent);