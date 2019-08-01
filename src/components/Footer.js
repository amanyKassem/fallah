import React, { Component } from "react";
import { Image, ImageBackground, Dimensions , View } from "react-native";
import {  Button, Footer, Icon, FooterTab } from 'native-base'
import SearchModal from './SearchModal'
import SavedModal from './SavedModel'
import TicketModal from './TicketModal'
import Styles from '../../assets/styles'
import {NavigationEvents} from "react-navigation";
import {connect} from "react-redux";

class FooterSection extends Component {
    constructor(props){
        super(props);
        this.state={
            visibleSearchModal:false,
            visibleSavedModal:false,
            visibleTicketModal:false,
            type:'home',
            temp:null
        }
    }

    footer_searchModal = (type) =>{
        this.setState({ type, visibleSearchModal: !this.state.visibleSearchModal });
    }

    footer_savedModal = (type) =>{
        this.setState({ type, visibleSavedModal: !this.state.visibleSavedModal });
    }

    footer_ticketModal = (type) =>{
        this.setState({ type, visibleTicketModal: !this.state.visibleTicketModal });
    }

    setAction(type){
        console.log(type, this.state.type);
        if ( type === 'home' || type === 'profile' ){
            console.log('after clicking ...', type);
            this.setState({ type: this.props.pageRoute });
            this.props.navigation.navigate(type);
        }
        else if (type === 'ticket'){
            this.footer_ticketModal(type)
        }
        else if (type === 'search'){
            this.footer_searchModal(type)
        }
        else if (type === 'saved'){
            this.footer_savedModal(type)
        }


    }

    componentWillMount() {
        this.setState({ type: this.props.pageRoute });
        console.log('pageRoute ... ', this.state);
    }

    componentWillReceiveProps(nextProps) {
    //    console.log(nextProps)
    }

    onFocus(payload){
        this.setState({ temp:'ay btngaan'})

    }


    renderFooterTabs(type){
        // is Active
            let activePath = '';

            if (this.state.type === type){
                switch (this.state.type) {
                    case 'home': activePath = require('../../assets/images/colored_home.png');
                        break;
                    case 'ticket': activePath = require('../../assets/images/colored_ticket.png');
                        break;
                    case 'search': activePath = require('../../assets/images/colored_search.png');
                        break;
                    case 'saved': activePath = require('../../assets/images/colored_saved.png');
                        break;
                    case 'profile': activePath = require('../../assets/images/colored_profile.png');
                        break;
                }

                return(
                    <Button transparent onPress={() => this.props.user ? this.setAction(type) : this.props.navigation.navigate('login')}>
                        <View style={Styles.footerActive}></View>
                        <Image style={Styles.footerImg} resizeMode={'contain'} source={activePath}/>
                    </Button>
                );
            }


        let path = '';
        switch (type) {
            case 'home': path = require('../../assets/images/white_home.png');
                break;
            case 'ticket': path = require('../../assets/images/white_ticket.png');
                    break;
            case 'search': path = require('../../assets/images/white_search.png');
                break;
            case 'saved': path = require('../../assets/images/white_saved.png');
                break;
            case 'profile': path = require('../../assets/images/white_profile.png');
                break;
           
        }

        return(
            <Button transparent onPress={() => this.props.user ? this.setAction(type) : this.props.navigation.navigate('login')} style={{ }}>
                <Image style={Styles.footerImg} resizeMode={'contain'} source={path}/>
            </Button>
        );
    }


    render() {

        return (
            <View>
                <NavigationEvents onWillFocus={(payload) => this.onFocus(payload)} />
                <Footer style={Styles.footer}>
                    
                    <FooterTab style={Styles.footerTab}>
                        
                        {  this.renderFooterTabs('home') }
                        
                        {  this.renderFooterTabs('ticket') }

                        {  this.renderFooterTabs('search') }
                        
                        {  this.renderFooterTabs('saved') }
                        
                        {  this.renderFooterTabs('profile') }

                    </FooterTab>
                </Footer>
                <SearchModal footer_searchModal={(type) => this.footer_searchModal(type)}  isModalVisible={this.state.visibleSearchModal} navigation={this.props.navigation}/>
                <SavedModal footer_savedModal={(type) => this.footer_savedModal(type)}  isModalVisible={this.state.visibleSavedModal} navigation={this.props.navigation}/>
                <TicketModal footer_ticketModal={(type) => this.footer_ticketModal(type)}  isModalVisible={this.state.visibleTicketModal} navigation={this.props.navigation}/>
            </View>
        );
    }
}

const mapStateToProps = ({ lang , profile}) => {
	return {
		lang: lang.lang,
		user: profile.user,
	};
};
export default connect(mapStateToProps, {})(FooterSection);