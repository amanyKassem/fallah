import React, { Component } from "react";
import {View, Text,Image, TouchableOpacity, Dimensions, I18nManager, Platform} from "react-native";
import {Container, Content, Header, Body} from 'native-base'
import Styles from '../../assets/styles'
import i18n from "../../local/i18n";
import {connect} from "react-redux";
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";


const height = Dimensions.get('window').height;
class Conditions extends Component {
    constructor(props){
        super(props);

        this.state={
            roles_title:'',
            roles: '',
            status: null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('terms'),
        drawerIcon: ( <Image source={require('../../assets/images/terms.png')} style={{ height: 20, width: 20 , top:5 }} resizeMode={'contain'} />  )
    });

    componentWillMount() {
        axios({
            url: CONST.url + 'roles',
            method: 'POST',
            data: {lang: this.props.lang}
        }).then(response => {
            this.setState({
                roles_title :response.data.data.roles_title,
                roles: response.data.data.roles,
                status: response.data.status,
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



    render() {
        return (

            <Container style={{backgroundColor:'#fff'}}>
                <Header style={[Styles.header , {height:Platform.OS === 'ios' ?50:10}]} noShadow>
                    <View style={[Styles.headerView , {flexDirection:'row' , paddingHorizontal:10}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Body style={[Styles.bodyHeadrt , {top:Platform.OS === 'ios' ? -9:-13}]}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'RegularFont' }}>{ i18n.t('terms') }</Text>
                        </Body>
                    </View>
                </Header>
                <Content style={Styles.homecontent}>
                    { this.renderLoader() }
                    <View style={[Styles.eventswiper ,  {backgroundColor:'#121320' , height:400}]}>
                        <Image source={require('../../assets/images/bg_color_vectors.png')} style={[Styles.eventswiper , { height: 400 }]} resizeMode={'cover'} />
                        <View style={[Styles.dateHours , {bottom:'55%' , textAlign:'center' , left:0 , paddingHorizontal:15}]}>
                            <Text style={[Styles.dateText  , {textAlign:'center', width:'100%'}]}>{ this.state.roles_title }</Text>
                        </View>
                    </View>

                    <View style={[Styles.parentViewEvent , {height:'auto' , paddingRight:40 , marginTop:-105 , flexDirection:'column' , paddingTop:20 , paddingLeft:20}]}>
                        <View style={{flexDirection:'row' , marginBottom:5}}>
                            <Image source={require('../../assets/images/pink_shape.png')} style={Styles.rightShape} resizeMode={'contain'}/>
                            <Text style={{ color: '#6d6c72', fontFamily: 'RegularFont' , fontSize:15 , writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}}>{ this.state.roles }</Text>
                        </View>
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
export default connect(mapStateToProps, {})(Conditions);