import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions , I18nManager, AsyncStorage} from "react-native";
import { Container, Content} from 'native-base'
import Swiper from 'react-native-swiper';
import Styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Intro extends Component {
	constructor(props){
		super(props);

		this.state={
			status:null,
			intro:[]
		}
	}
	componentWillMount(){
		axios({
			url: CONST.url + 'intro',
			method: 'POST',
			data: {lang: this.props.lang}
		}).then(response => {
			this.setState({
				intro: response.data.data,
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

	navigateToLogin(){
		AsyncStorage.setItem( 'intro', 'true' );
		this.props.navigation.navigate('login');
	}

	render() {
		return (

			<Container style={Styles.container}>
				<Content style={{}}>
					{ this.renderLoader() }
					<View>
						<Swiper dotStyle={[Styles.doteStyle , {backgroundColor: '#fff', width:10 , borderRadius:1 , height:3, left:0 , bottom:60}]}
							activeDotStyle={[Styles.activeDot, {backgroundColor: '#e51d6f',borderColor: 'transparent', width:20 , left:0 , borderRadius:5 , height:7, bottom:60}]}
							containerStyle={[Styles.swiper, {height , borderRadius:0}]} showsButtons={false} autoplay={false} loop={false}>

							{
								this.state.intro.map((int,i) =>{
									return(
										<View style={{flex:1}}>
											<View style={[Styles.eventswiper ,  {backgroundColor:'#fff' , height:'60%' , justifyContent:'center' , alignItems:'center'}]}>
												<Image source={{uri:int.image}} style={[Styles.eventswiper , {height:270 , width:270}]} resizeMode={'contain'} />

											</View>

											<View style={[Styles.parentViewEvent , {height:'auto' , paddingHorizontal:30 , marginTop:-70 , borderTopLeftRadius:75,backgroundColor: '#121320' }]}>
												<Text style={{fontFamily:'RegularFont' , color:'#0fd1fa', alignSelf:'center' , marginVertical:30}}>{ int.name }</Text>
												<Text style={{fontFamily:'RegularFont' , color:'#fff', alignSelf:'center' , textAlign:'center'}}>{int.desc}</Text>
											</View>
											<View style={[Styles.btnParent ,{marginTop:0 , backgroundColor:'#121320'}]} >
												<TouchableOpacity  style={Styles.registerBtn}  onPress={() => this.navigateToLogin()}>
													<Text style={Styles.registerTxt}>{ i18n.t('skip') }</Text>
												</TouchableOpacity>
											</View>
										</View>
									)
								} )
							}
						</Swiper>
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
export default connect(mapStateToProps, {})(Intro);