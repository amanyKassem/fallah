import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions} from "react-native";
import { Container, Content, Icon, Header  , List, ListItem , Left , Button} from 'native-base'
import Swiper from 'react-native-swiper';
import FooterSection from './Footer';
import Styles from '../../assets/styles'
import Modal from "react-native-modal";
import i18n from '../../local/i18n'
import * as Animatable from 'react-native-animatable';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Video } from 'expo-av';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';


const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 70;
const categories=[
    {id:1 , name:'أعياد ميلاد' , image:require('../../assets/images/pic_one.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_four.png')},
    {id:1 , name:'أعياد ميلاد' , image:require('../../assets/images/pic_five.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_one.png')},
    {id:1 , name:'أعياد ميلاد' , image:require('../../assets/images/pic_four.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_five.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_five.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_five.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_five.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_five.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_five.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_five.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_five.png')},
    {id:2 , name:'حفلات' , image:require('../../assets/images/pic_five.png')},
]


class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            categories,
            isModalVisible: false,
            fancyModal: false,
            showDeleteMsg:false,
            navbarColor: 'transparent',
            scrollY: 0,
            adsImgs:[],
            status: null,
        }
    }

    componentWillMount(){
        axios.get(CONST.url+'ads').then(response=>{
            this.setState({adsImgs:response.data.data , status:response.data.status})
        })

    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    fancyModal = () => {
        this.setState({ fancyModal: !this.state.fancyModal });
    };

    static navigationOptions = () => ({
        drawerLabel: i18n.t('home') ,
        drawerIcon: (<Image source={require('../../assets/images/home.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
    })

   
    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('category', { id: item.id })} style={Styles.categoryList}>
                <View style={Styles.homeViewContainer}>
                    <View style={Styles.homeTextCont}>
                        <Text style={Styles.homeText}>{item.name}</Text>
                    </View>
                    <View style={Styles.viewLine}></View>
                    <Image source={item.image} resizeMode={'cover'} style={Styles.flatImage}/>
                </View>
            </TouchableOpacity>
        );
    }

    deleteNoti(){
        this.setState({ showDeleteMsg: !this.state.showDeleteMsg });
    }
    renderDeleteMsg(){
        if (this.state.showDeleteMsg){
            return(
                <Animatable.View onAnimationEnd={() => this.setState({ showDeleteMsg: !this.state.showDeleteMsg })} animation="fadeOut" duration={5000} style={[Styles.filterModal,{padding:15 , backgroundColor:'#121320' , justifyContent:'center'}]}>
                    <View style={Styles.viewLine}></View>
                    <Text style={{ color: '#fff', fontFamily: 'BoldFont' , fontSize:13, writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' }}>{ i18n.t('notificationDeleted') }</Text>
                </Animatable.View>
            )
        }
    }


    renderNavBar = () => (

        <View style={[Styles.headerView , {marginTop:Platform.OS === 'ios' ?15:25, backgroundColor: 'transparent'}]}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()} style={{width:45, height:45 , justifyContent:'center' , alignItems:'center'}}>
                <Image source={require('../../assets/images/menu.png')} style={Styles.headerMenu} resizeMode={'contain'} />
            </Button>
            <Button transparent onPress={() => this.toggleModal() } style={{width:45, height:45 , justifyContent:'center' , alignItems:'center'}}>
                <Image source={require('../../assets/images/notification.png')} style={Styles.headerNoti} resizeMode={'contain'} />
            </Button>
        </View>
    )
    renderContent = () => {

        return(
        <Content style={[Styles.homecontent , {} ]} onScroll={e => console.log('ppppppppp...',e.nativeEvent.contentOffset.y)}>
            <View>
                <Swiper key={this.state.adsImgs.length} dotStyle={Styles.doteStyle} activeDotStyle={Styles.activeDot}
                        containerStyle={Styles.swiper} showsButtons={false} autoplay={true}>
                    {
                        this.state.adsImgs.map((img,i) =>{
                            let url  = img.url;
                            const splitArr = url.split('.');
                            const ext  = splitArr[splitArr.length - 1].toLowerCase();

                            if (ext === 'mp4' || ext === 'avi' || ext === 'm4v' || ext === 'mpg'){
                                return (
                                    <TouchableOpacity onPress={() => this.fancyModal()} style={Styles.slide} key={i}>
                                        <View style={Styles.swiperLine}/>
                                        <Video
                                            source={{ uri: url }}
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={false}
                                            resizeMode="contain"
                                            shouldPlay
                                            isLooping
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </TouchableOpacity>
                                )
                            } else{
                                return (
                                    <TouchableOpacity onPress={() => this.fancyModal()} style={Styles.slide} key={i}>
                                        <View style={Styles.swiperLine}/>
                                        <Image source={{ uri: img.url }} style={Styles.swiperimage}
                                               resizeMode={'cover'}/>
                                    </TouchableOpacity>
                                )
                            }



                        } )


                    }
                </Swiper>
            </View>
            <View style={Styles.flatContainer}>
                <FlatList
                    data={this.state.categories}
                    renderItem={({item}) => this.renderItems(item)}
                    numColumns={2}
                    keyExtractor={this._keyExtractor}
                />
            </View>
            <Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal()}>
                <View style={[Styles.filterModal,{padding:15}]}>
                    <View style={Styles.viewLine}></View>
                    <Text style={[Styles.eventboldName ,{fontSize:16 , alignSelf:'center' , marginBottom:10}]}>{ i18n.t('notifications') }</Text>
                    <View style={{flexDirection:'column'}}>
                        <List style={{width:'100%'}}>
                            <ListItem style={{ borderRadius: 5, borderBottomWidth: 1, borderColor: '#bbbcbd', width: '97%', marginLeft: 0, marginBottom: 15 , paddingTop:0, paddingBottom:0 , paddingRight:0 }}>
                                <View  style={{ width:'100%' , padding:15}}>
                                    <View style={{ width:'100%' }}>
                                        <View style={{flexDirection:'row' , justifyContent:'space-between' , width:'100%'}}>
                                            <View style={{flexDirection:'row'}}>
                                                <Image source={require('../../assets/images/pink_shape.png')} style={{ width: 15, height: 15 , right:10 , top:7}} resizeMode={'contain'}/>
                                                <Text style={{ color: '#6d6c72', fontFamily: 'BoldFont' , fontSize:13 }}>رسالة من لوحة التحكم</Text>
                                            </View>
                                            <Text style={{ color: '#acabae', fontFamily: 'RegularFont', fontSize:13 }}>3:00 مساءا</Text>
                                        </View>
                                        <View style={{width:'100%' , paddingLeft:15}}>
                                            <Text style={{ color: '#acabae', fontFamily: 'RegularFont' , fontSize:12 , writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , textAlign:I18nManager.isRTL ?  'right':'left' }}>نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص</Text>
                                        </View>
                                    </View>
                                </View>
                                <Left style={{ position: 'absolute', right: -13, top: -13 }}>
                                    <TouchableOpacity  onPress={() => this.deleteNoti()} style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', width: 35, height: 35 }}>
                                        <Icon type={'AntDesign'} name={'delete'} style={{ fontSize: 20, color: '#e51d6f' }} />
                                    </TouchableOpacity>
                                </Left>
                            </ListItem>
                        </List>
                    </View>
                </View>

                {this.renderDeleteMsg()}
            </Modal>
            <Modal style={{}} isVisible={this.state.fancyModal} onBackdropPress={() => this.fancyModal()}>
                <TouchableOpacity  onPress={() => this.fancyModal()} style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', width: 35, height: 35 , position:'absolute'
                    , zIndex:20 , top:10 , left:10 , borderRadius:5}}>
                    <Icon name={'close'} type={'EvilIcons'} style={{ color: '#e51d6f', fontSize: 30 }} />
                </TouchableOpacity>
                <ImageViewer enableImageZoom={true} onSwipeDown={() => this.fancyModal()} enableSwipeDown={true} imageUrls={this.state.adsImgs}/>
            </Modal>
        </Content>
    )}

    render() {
        console.log('scrolling.....', this.state.scrollY);

        return (

            <Container style={Styles.container}>
            {/*<Header style={[Styles.header , {marginTop:Platform.OS === 'ios' ?15:40}]} noShadow>*/}

            {/*</Header>*/}
                <ReactNativeParallaxHeader
                    headerMinHeight={HEADER_HEIGHT}
                    headerMaxHeight={100}
                    extraScrollHeight={20}
                    navbarColor={this.state.scrollY >= 220 ? '#121320' : 'transparent'}
                    backgroundColor='transparent'
                    statusBarColor='red'
                    headerTitleStyle={{ backgroundColor: 'transparent' }}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    scrollViewStyle={{ backgroundColor: 'transparent' }}
                    innerContainerStyle={{ backgroundColor: 'transparent' }}
                    backgroundImage={'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'}
                    titleStyle={{ backgroundColor: 'transparent' }}
                    renderNavBar={this.renderNavBar}
                    renderContent={this.renderContent}
                    containerStyle={Styles.container}
                />

            <FooterSection pageRoute={'home'} navigation={this.props.navigation}/>
        </Container>

        );
    }
}

export default Home;