import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions , I18nManager} from "react-native";
import { Container, Content} from 'native-base'
import Swiper from 'react-native-swiper';
import Styles from '../../assets/styles'
import i18n from '../../local/i18n'
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Intro extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }


    render() {
        return (

            <Container style={Styles.container}>
                <Content style={{}}>
                    <View>
                        <Swiper dotStyle={[Styles.doteStyle , {backgroundColor: '#fff', width:10 , borderRadius:1 , height:3, left:0 , bottom:60}]}
                                activeDotStyle={[Styles.activeDot, {backgroundColor: '#e51d6f',borderColor: 'transparent', width:20 , left:0 , borderRadius:5 , height:7, bottom:60}]}
                                containerStyle={[Styles.swiper, {height , borderRadius:0}]} showsButtons={false} autoplay={true}>
                            <View style={{flex:1}}>
                                <View style={[Styles.eventswiper ,  {backgroundColor:'#fff' , height:'60%' , justifyContent:'center' , alignItems:'center'}]}>
                                    <Image source={require('../../assets/images/intro_one.png')} style={[Styles.eventswiper , {height:270 , width:270}]} resizeMode={'contain'} />

                                </View>

                                <View style={[Styles.parentViewEvent , {height:'auto' , paddingHorizontal:30 , marginTop:-70 , borderTopLeftRadius:75,backgroundColor: '#121320' }]}>
                                    <Text style={{fontFamily:'RegularFont' , color:'#0fd1fa', alignSelf:'center' , marginVertical:30}}>{ i18n.t('occasions') }</Text>
                                    <Text style={{fontFamily:'RegularFont' , color:'#fff', alignSelf:'center' , textAlign:'center'}}>نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص</Text>
                                </View>
                                <View style={[Styles.btnParent ,{marginTop:0 , backgroundColor:'#121320'}]} >
                                    <TouchableOpacity  style={Styles.registerBtn}  onPress={() => this.props.navigation.navigate('login')}>
                                        <Text style={Styles.registerTxt}>{ i18n.t('skip') }</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <View style={[Styles.eventswiper ,  {backgroundColor:'#fff' , height:'60%', justifyContent:'center' , alignItems:'center'}]}>
                                    <Image source={require('../../assets/images/intro_two.png')} style={[Styles.eventswiper , {height:270 , width:270}]} resizeMode={'contain'} />

                                </View>

                                <View style={[Styles.parentViewEvent , {height:'auto' , paddingHorizontal:30 , marginTop:-70 , borderTopLeftRadius:75,backgroundColor: '#121320' }]}>

                                    <Text style={{fontFamily:'RegularFont' , color:'#0fd1fa', alignSelf:'center' , marginVertical:30}}>{ i18n.t('concerts') }</Text>
                                    <Text style={{fontFamily:'RegularFont' , color:'#fff', alignSelf:'center' , textAlign:'center'}}>نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص</Text>
                                </View>
                                <View style={[Styles.btnParent ,{marginTop:0 , backgroundColor:'#121320'}]} >
                                    <TouchableOpacity  style={Styles.registerBtn}  onPress={() => this.props.navigation.navigate('login')}>
                                        <Text style={Styles.registerTxt}>{ i18n.t('skip') }</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <View style={[Styles.eventswiper ,  {backgroundColor:'#fff' , height:'60%', justifyContent:'center' , alignItems:'center'}]}>
                                    <Image source={require('../../assets/images/intro_three.png')} style={[Styles.eventswiper , {height:270 , width:270}]} resizeMode={'contain'} />

                                </View>

                                <View style={[Styles.parentViewEvent , {height:'auto' , paddingHorizontal:30 , marginTop:-70 , borderTopLeftRadius:75,backgroundColor: '#121320' }]}>

                                    <Text style={{fontFamily:'RegularFont' , color:'#0fd1fa', alignSelf:'center' , marginVertical:30}}>{ i18n.t('matches') }</Text>
                                    <Text style={{fontFamily:'RegularFont' , color:'#fff', alignSelf:'center' , textAlign:'center'}}>نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص</Text>
                                </View>
                                <View style={[Styles.btnParent ,{marginTop:0 , backgroundColor:'#121320'}]} >
                                    <TouchableOpacity  style={Styles.registerBtn}  onPress={() => this.props.navigation.navigate('login')}>
                                        <Text style={Styles.registerTxt}>{ i18n.t('loginButton') }</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Swiper>
                    </View>
                </Content>
            </Container>

        );
    }
}

export default Intro;