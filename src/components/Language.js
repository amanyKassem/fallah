import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Dimensions, I18nManager} from "react-native";
import { Container, Content } from 'native-base'
import styles from '../../assets/styles'
import { connect } from 'react-redux';
import { chooseLang } from '../actions';

const height = Dimensions.get('window').height;
class Language extends Component {
    constructor(props){
        super(props);
        this.onChooseLang = this.onChooseLang.bind(this)
    }

    onChooseLang(lang) {
        this.props.chooseLang(lang);
        this.props.navigation.navigate('intro');
    };


    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={styles.imageBackgroundStyle}>
                        <Image source={require('../../assets/images/big_logo.png')} style={styles.logoStyle} resizeMode={'contain'} />

                        <View style={styles.langContainer}>
                            <TouchableOpacity onPress={() => this.onChooseLang('en')} style={styles.langStyle}>
                                <Image source={require('../../assets/images/en_language.png')} style={{ width: 100, height:  100, top: 7, left: 7 }} resizeMode={'contain'}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onChooseLang('ar')} style={[styles.langStyle , {top:70}]}>
                                <Image source={require('../../assets/images/arabic_language.png')} style={{ width: 100, height:  100, top: 7, left: 7 }} resizeMode={'contain'}/>

                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Content>

            </Container>
        );
    }
}


const mapStateToProps = ({lang }) => {
    return {
        lang: lang.lang
    };
};

export default connect(mapStateToProps, { chooseLang })(Language);