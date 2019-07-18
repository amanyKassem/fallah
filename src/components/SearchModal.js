import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions , I18nManager , FlatList} from "react-native";
import { Container, Content, Button, Footer, Icon, Item , Input } from 'native-base'
import Modal from "react-native-modal";

import Styles from '../../assets/styles'
import i18n from "../../local/i18n";
import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";

const height = Dimensions.get('window').height;


class SearchModal extends Component {
    constructor(props){
        super(props);

        this.state={
            visibleModal:false,
            status:null,
            searchResult:[],
            loader:false
        }
    }


    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({visibleModal:nextProps.isModalVisible})
    }



    search(search){
        axios({
            url: CONST.url + 'search',
            method: 'POST',
            data: { lang: this.props.lang , search }
        }).then(response => {
            this.setState({
                searchResult: response.data.data,
                status: response.data.status,
                loader:false
            })
        })
    }

    renderSearchResult(){
        if(this.state.loader){
            <DoubleBounce size={20} color="#0fd1fa" />
        }
        else{
            this.state.searchResult.map((event , i) => {
                return(
                    <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('eventDetails', { id: event.id  , name:event.title} , this.setState({visibleModal:this.state.isModalVisible}))}  style={Styles.eventTouch}>
                        <View style={Styles.eventCont}>
                            <Image source={{uri :event.image}} resizeMode={'cover'} style={Styles.eventImg}/>
                            <Text style={Styles.eventName}>{event.title}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })

        }
    }

    render() {
        return (
            <Modal avoidKeyboard={true} coverScreen={false} style={{}} deviceHeight={height-140} isVisible={this.state.visibleModal} onBackdropPress={() => this.setState({ visibleModal: this.props.footer_searchModal('home') })}>
                <View style={[Styles.searchModal ]}>
                    <View style={Styles.viewLine}></View>
                    <View style={Styles.inputView}>
                        <Item  style={Styles.inputItem} bordered>
                            <Input onChangeText={(search) => this.search(search)} placeholder={ i18n.t('search') } placeholderTextColor={'#acabae'} style={Styles.modalInput}   />
                        </Item>
                        <Image source={require('../../assets/images/gray_search.png')} style={Styles.searchImg} resizeMode={'contain'}/>
                    </View>
                    {/*<ScrollView style={{flex:1 , width:'100%' }}>*/}
                        {/*{this.renderSearchResult()}*/}
                    {/*</ScrollView>*/}
                    <View style={Styles.modalLine}></View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('suggestedEvent', this.setState({visibleModal:this.state.isModalVisible}))}  style={Styles.eventTouch}>
                        <View style={Styles.eventCont}>
                            <Image source={require('../../assets/images/suggestion_events.png')} resizeMode={'cover'} style={Styles.eventImg}/>
                            <Text style={Styles.eventName}>{i18n.t('proposedEvents')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('commonEvent' , this.setState({visibleModal:this.state.isModalVisible}))}  style={Styles.eventTouch}>
                        <View style={Styles.eventCont}>
                            <Image source={require('../../assets/images/most_seen_events.png')} resizeMode={'cover'} style={Styles.eventImg}/>
                            <Text style={Styles.eventName}>{i18n.t('commonEvents')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('savedEvent' , this.setState({visibleModal:this.state.isModalVisible}))}  style={Styles.eventTouch}>
                        <View style={Styles.eventCont}>
                            <Image source={require('../../assets/images/fav_events.png')} resizeMode={'cover'} style={Styles.eventImg}/>
                            <Text style={Styles.eventName}>{i18n.t('favoriteEvents')}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </Modal>


        );
    }
}

const mapStateToProps = ({ lang }) => {
    return {
        lang: lang.lang,
    };
};

export default connect(mapStateToProps, {})(SearchModal);