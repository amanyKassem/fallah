import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ScrollView, Animated} from "react-native";
import { Container, Content, Icon, Header  , List, ListItem , Left , Button} from 'native-base'
import Swiper from 'react-native-swiper';
import FooterSection from './Footer';
import Styles from '../../assets/styles'
import Modal from "react-native-modal";
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Video } from 'expo';
import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";


const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;

class Home extends Component {
	constructor(props){
		super(props);

		this.state={
			categories:[],
			isModalVisible: false,
			fancyModal: false,
			showDeleteMsg:false,
			adsImgs:[],
			status: null,
			mute: true,
			shouldPlay: false,
			imgUri: null,
			notifications:[],
			deleteMsg:'',
			backgroundColor: new Animated.Value(0),
			availabel: 0,
		}
	}
	handlePlayAndPause = () => {
		this.setState((prevState) => ({
			shouldPlay: !prevState.shouldPlay
		}));
	}

	handleVolume = () => {
		this.setState(prevState => ({
			mute: !prevState.mute,
		}));
	}
	componentWillMount(){
		axios.get(CONST.url+'ads').then(response=>{
			this.setState({adsImgs:response.data.data , status:response.data.status})
		})
		axios({
			url: CONST.url + 'categories',
			method: 'POST',
			data: {lang: this.props.lang}
		}).then(response => {
			this.setState({
				categories: response.data.data,
				status: response.data.status,
			})
		})
		axios({
			url: CONST.url + 'notifications',
			method: 'POST',
			headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
			data: {lang: this.props.lang}
		}).then(response => {
			this.setState({
				notifications: response.data.data,
				status: response.data.status,
			})
		})
	}

	toggleModal = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	};
	// fancyModal = () => {
	//     this.setState({ fancyModal: !this.state.fancyModal });
	// };

	static navigationOptions = () => ({
		drawerLabel: i18n.t('home') ,
		drawerIcon: (<Image source={require('../../assets/images/home.png')} style={{ height: 20, width: 20 , top:3 }} resizeMode={'contain'} /> )
	})


	_keyExtractor = (item, index) => item.id;

	renderItems = (item) => {
		return(
			<TouchableOpacity onPress={() => this.props.navigation.navigate('category', { id: item.id  , name :item.name})} style={Styles.categoryList}>
				<View style={Styles.homeViewContainer}>
					<View style={Styles.homeTextCont}>
						<Text style={Styles.homeText}>{item.name}</Text>
					</View>
					<View style={Styles.viewLine}></View>
					<Image source={{ uri: item.image }} resizeMode={'cover'} style={Styles.flatImage}/>
				</View>
			</TouchableOpacity>
		);
	}

	deleteNoti(id){
		this.setState({ showDeleteMsg: !this.state.showDeleteMsg });
		axios({
			url: CONST.url + 'delete_notification',
			method: 'POST',
			headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
			data: {lang: this.props.lang, notify_id: id}
		}).then(response => {
			this.setState({
				deleteMsg: response.data.msg,
				status: response.data.status,
			})
			this.componentWillMount()
		})
	}
	renderDeleteMsg(){
		if (this.state.showDeleteMsg){
			return(
				<Animatable.View onAnimationEnd={() => this.setState({ showDeleteMsg: !this.state.showDeleteMsg })} animation="fadeOut" duration={5000} style={[Styles.filterModal,{padding:15 , backgroundColor:'#121320' , justifyContent:'center'}]}>
					<View style={Styles.viewLine}></View>
					<Text style={{ color: '#fff', fontFamily: 'BoldFont' , fontSize:13, writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' }}>{ this.state.deleteMsg }</Text>
				</Animatable.View>
			)
		}
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


	setAnimate(availabel){
		if (availabel === 0){
			Animated.timing(
				this.state.backgroundColor,
				{
					toValue: 1,
					duration: 1000,
				},
			).start();
			this.setState({ availabel: 1 });
		}else {
			Animated.timing(
				this.state.backgroundColor,
				{
					toValue: 0,
					duration: 1000,
				},
			).start();
			this.setState({ availabel: 0 });
		}

		console.log(availabel);
	}

	headerScrollingAnimation(e){
	    if (e.nativeEvent.contentOffset.y > 90){
	    	console.log(e.nativeEvent.contentOffset.y);
            this.setAnimate(0)
        } else{
			this.setAnimate(1)
        }
    }

	render() {
		const url      = this.state.imgUri;
		let isVideo    = false;
		let imgArr     = [{url}];

		if (url){
			const splitArr = url.split('.');
			const ext      = splitArr[splitArr.length - 1].toLowerCase();
			isVideo        = ext === 'mp4' || ext === 'avi' || ext === 'm4v' || ext === 'mpg' ? true : false;
		}

		const backgroundColor = this.state.backgroundColor.interpolate({
			inputRange: [0, 1],
			outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']
		});

		return (
			<Container style={Styles.container}>
				{ this.renderLoader() }
				<Header style={[Styles.header , {marginTop:Platform.OS === 'ios' ? 10 : 40, paddingLeft: 0, paddingRight: 0}]} noShadow>
					<Animated.View style={[Styles.headerView , { backgroundColor: backgroundColor, height: 80, marginTop: -55}]}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()} style={{width:45, height:45 , justifyContent:'center' , alignItems:'center', marginTop: 35}}>
                            <Image source={require('../../assets/images/menu.png')} style={Styles.headerMenu} resizeMode={'contain'} />
                        </Button>
                        <Button transparent onPress={() => this.toggleModal() } style={{width:45, height:45 , justifyContent:'center' , alignItems:'center', marginTop: 35}}>
                            <Image source={require('../../assets/images/notification.png')} style={Styles.headerNoti} resizeMode={'contain'} />
                        </Button>
                    </Animated.View>
				</Header>
				<Content style={[Styles.homecontent , {} ]}  onScroll={e => this.headerScrollingAnimation(e) }>
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
											<TouchableOpacity onPress={() => this.setState({ fancyModal: !this.state.fancyModal, imgUri: url })} style={Styles.slide} key={i}>
												<View style={Styles.swiperLine}/>
												<Video
													source={{ uri: url }}
													rate={1.0}
													volume={1.0}
													isMuted={this.state.mute}
													resizeMode="contain"
													shouldPlay={this.state.shouldPlay}
													isLooping
													style={{ width: '100%', height: '100%' }}
												/>
												<View style={Styles.controlBar}>
													<Icon type={'AntDesign'} name={'play'} style={{ fontSize: 30, color: '#e51d6f' }} />
												</View>
												{/*</View>*/}
											</TouchableOpacity>
										)
									} else{
										return (
											<TouchableOpacity onPress={() => this.setState({ fancyModal: !this.state.fancyModal, imgUri: url })} style={Styles.slide} key={i}>
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
						<View style={[Styles.filterModal,{padding:15 , height:450}]}>
							<View style={Styles.viewLine}></View>
							<Text style={[Styles.eventboldName ,{fontSize:16 , alignSelf:'center' , marginBottom:10}]}>{ i18n.t('notifications') }</Text>
							<ScrollView style={{flexDirection:'column'}}>
								<List style={{width:'100%'}}>

									{
										this.state.notifications.map((noti, i) => {
											return(
												<ListItem key={i} style={{
													borderRadius: 5,
													borderBottomWidth: 1,
													borderColor: '#bbbcbd',
													width: '97%',
													marginLeft: 0,
													marginBottom: 15,
													paddingTop: 0,
													paddingBottom: 0,
													paddingRight: 0
												}}>
													<View style={{width: '100%', padding: 15}}>
														<View style={{width: '100%'}}>
															<View style={{
																flexDirection: 'row',
																justifyContent: 'space-between',
																width: '100%'
															}}>
																<View style={{flexDirection: 'row'}}>
																	<Image source={i % 2 === 0 ? require('../../assets/images/pink_shape.png') : require('../../assets/images/blue_shape.png')}
																		style={{width: 15, height: 15, right: 10, top: 7}}
																		resizeMode={'contain'}/>
																	<Text style={{
																		color: '#6d6c72',
																		fontFamily: 'BoldFont',
																		fontSize: 13
																	}}>{noti.title}</Text>
																</View>
																<Text style={{
																	color: '#acabae',
																	fontFamily: 'RegularFont',
																	fontSize: 13
																}}>{noti.time}</Text>
															</View>
															<View style={{width: '100%', paddingLeft: 15}}>
																<Text style={{
																	color: '#acabae',
																	fontFamily: 'RegularFont',
																	fontSize: 12,
																	writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
																	textAlign: I18nManager.isRTL ? 'right' : 'left',
																	alignSelf:'flex-start'
																}}>{noti.body}</Text>
															</View>
														</View>
													</View>
													<Left style={{position: 'absolute', right: -13, top: -13}}>
														<TouchableOpacity onPress={() => this.deleteNoti(noti.id)} style={{
															backgroundColor: 'transparent',
															alignItems: 'center',
															justifyContent: 'center',
															width: 35,
															height: 35
														}}>
															<Icon type={'AntDesign'} name={'delete'}
																style={{fontSize: 20, color: '#e51d6f'}}/>
														</TouchableOpacity>
													</Left>
												</ListItem>
											)
										})
									}
								</List>
							</ScrollView>
						</View>

						{this.renderDeleteMsg()}
					</Modal>
					<Modal style={{}} isVisible={this.state.fancyModal} onBackdropPress={()=> this.setState({ fancyModal : false, imgUri: null })}>
						<TouchableOpacity  onPress={()=> this.setState({ fancyModal : false, imgUri: null })} style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', width: 35, height: 35 , position:'absolute'
							, zIndex:20 , top:10 , left:10 , borderRadius:5}}>
							<Text style={{ color: '#e51d6f', fontSize: 20 }}>X</Text>
						</TouchableOpacity>

						{
							isVideo ? (
									<View style={Styles.slide} >
										<Video
											source={{ uri: url }}
											rate={1.0}
											volume={1.0}
											isMuted={!this.state.mute}
											resizeMode="contain"
											shouldPlay={!this.state.shouldPlay}
											isLooping
											style={{ width: '100%', height: '100%' }}
										/>
										<View style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
											<TouchableOpacity onPress={this.handleVolume} style={{width:45 , height:45}}>
												<Icon type={'FontAwesome'} name={this.state.mute ? "volume-off" : "volume-up"}
													style={{ fontSize: 30, color: '#e51d6f' }} />
											</TouchableOpacity>


											<TouchableOpacity onPress={this.handlePlayAndPause} style={{width:45 , height:45}}>
												<Icon type={'FontAwesome'} name={this.state.shouldPlay ? "pause" : "play"}
													style={{ fontSize: 30, color: '#e51d6f' }} />
											</TouchableOpacity>
										</View>
									</View>
								) :
								(
									<ImageViewer enableImageZoom={true} onSwipeDown={()=> this.setState({ fancyModal : false, imgUri: null })} enableSwipeDown={true} imageUrls={imgArr}/>
								)


						}

					</Modal>
				</Content>

				<FooterSection pageRoute={'home'} navigation={this.props.navigation}/>
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
export default connect(mapStateToProps, {})(Home);