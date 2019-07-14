import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions , I18nManager , FlatList , Slider , Platform} from "react-native";
import { Container, Content, Button, Picker, Icon, Header , Left, Right, Body , Form, Item, Input, Label  } from 'native-base'
import Modal from "react-native-modal";
import Styles from '../../assets/styles';
import DateTimePicker from "react-native-modal-datetime-picker";
import i18n from "../../local/i18n";
// import axios from 'axios'
// import CONST from '../consts'
// import { Bars } from 'react-native-loader';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const events=[
    {id:1 , name:'حفلة عمر خيرت' , date :'22/5/2019' , time : '10 مساءا' , price :'500' ,  image:require('../../assets/images/singer_pic.png')},
    {id:1 , name:'حفلة عمر خيرت' , date :'22/5/2019' , time : '10 مساءا' , price :'500' ,  image:require('../../assets/images/singer_pic.png')},
    {id:1 , name:'حفلة عمر خيرت' , date :'22/5/2019' , time : '10 مساءا' , price :'500' ,  image:require('../../assets/images/singer_pic.png')},
    {id:1 , name:'حفلة عمر خيرت' , date :'22/5/2019' , time : '10 مساءا' , price :'500' ,  image:require('../../assets/images/singer_pic.png')},
    {id:1 , name:'حفلة عمر خيرت' , date :'22/5/2019' , time : '10 مساءا' , price :'500' ,  image:require('../../assets/images/singer_pic.png')},
]
class Category extends Component {
    constructor(props){
        super(props);

        this.state={
            events,
            isModalVisible: false,
            countries: [],
            selectedCountry: null,
            location: '',
            date: '',
            time: '',
            locationStatus:0,
            dateStatus:0,
            timeStatus:0,
            value: null,
            isDatePickerVisible: false,
            isTimePickerVisible: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        this.setState({ date : formatted_date })

        this.hideDatePicker();
    };
    showTimePicker = () => {
        this.setState({ isTimePickerVisible: true });
    };

    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false });
    };

    handleTimePicked = time => {
        console.log("A time has been picked: ", time);
        let formatedTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
        this.setState({ time : formatedTime })
        this.hideTimePicker();
    };


    change(value){
        this.setState({value})
    }

    activeInput(type){
        if (type === 'location'){
            this.setState({ locationStatus: 1 })
        }else if (type === 'date') {
            this.setState({dateStatus: 1})
        }else
            this.setState({timeStatus: 1})
    }

    unActiveInput(type){
        if (type === 'location'){
            this.setState({ locationStatus: 0})
        }else if (type === 'date') {
            this.setState({dateStatus: 0})
        }else
            this.setState({timeStatus: 0})
    }

    renderInputImage(type){
        let source ='';
        if (type === 'location'){
            if (this.state.locationStatus){
                source = require('../../assets/images/blue_location.png')
            } else{
                source = require('../../assets/images/gray_location.png')
            }
        }else if (type === 'date'){
            if (this.state.dateStatus ){
                source = require('../../assets/images/blue_calender.png')
            } else{
                source = require('../../assets/images/gray_calender.png')
            }
        } else {
            if (this.state.timeStatus ){
                source = require('../../assets/images/blue_clock.png')
            } else{
                source = require('../../assets/images/gray_clock.png')
            }
        }

        return source;
    }


    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('eventDetails', { id: item.id })} style={Styles.eventTouch}>
                <View style={Styles.eventContent}>
                    <Right style={Styles.eventRight}>
                        <Image source={item.image} resizeMode={'cover'} style={Styles.categoryImg}/>
                    </Right>
                    <Left style={Styles.eventLeft}>
                        <Text style={Styles.eventboldName}>{item.name}</Text>
                        <View style={Styles.imgText}>
                            <Image source={require('../../assets/images/gray_clock.png')} style={Styles.leftImg} resizeMode={'contain'} />
                            <Text style={Styles.eventText}>{item.time}</Text>
                        </View>
                        <View style={Styles.datePrice}>
                            <View style={Styles.imgText}>
                                <Image source={require('../../assets/images/gray_calender.png')} style={Styles.leftImg} resizeMode={'contain'} />
                                <Text style={Styles.eventText}>{item.date}</Text>
                            </View>
                            <Text style={[Styles.eventText , {color:'#e51d6f'}]}>{item.price} { i18n.t('RS') }</Text>
                        </View>
                    </Left>
                </View>
            </TouchableOpacity>
        );
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
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'RegularFont' }}>فن</Text>
                    </Body>
                    <Left style={Styles.leftHeader}>
                        <Button transparent onPress={this.toggleModal}>
                            <Image source={require('../../assets/images/filter.png')} style={Styles.filterStyle} resizeMode={'contain'} />
                        </Button>
                    </Left>
                </Header>
                <Content style={Styles.content}>
                    <View style={Styles.parentView}>
                        <View style={Styles.viewLine}></View>
                        <Image source={require('../../assets/images/art_icon.png')} style={Styles.headphone} resizeMode={'contain'} />
                        <FlatList
                            data={this.state.events}
                            renderItem={({item}) => this.renderItems(item)}
                            numColumns={1}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                    <Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal()}>
                        <View style={Styles.filterModal}>
                            <View style={Styles.viewLine}></View>
                            <Form style={{width: '100%' , padding:25}}>
                                <View>
                                    <Item style={Styles.itemPicker} regular >
                                        <Picker
                                            mode="dropdown"
                                            // iosIcon={<Icon name="arrow-down" />}
                                            style={Styles.picker}
                                            placeholderStyle={{ color: "#acabae" }}
                                            placeholderIconColor="#acabae"
                                            textStyle={{ color: "#acabae" , right:Platform.OS === 'ios' ?width-115:0 , fontSize:13 }}
                                            itemTextStyle={{ color: '#acabae' }}
                                            selectedValue={this.state.selectedCountry}
                                            onValueChange={(value) => this.setState({ selectedCountry: value })}
                                        >
                                            <Picker.Item label={ i18n.t('city') } value={null} />
                                            <Picker.Item label={'الرياض'} value={"1"} />
                                            <Picker.Item label={'الامارات'} value={"2"} />
                                            <Picker.Item label={'مصر'} value={"3"} />
                                        </Picker>
                                        <Image source={require('../../assets/images/gray_dropdown.png')} style={[Styles.pickerImg , {right:Platform.OS === 'ios' ?50:10}]} resizeMode={'contain'} />
                                    </Item>
                                </View>
                                {/*<View style={[Styles.inputParent , {borderColor: this.state.locationStatus === 1 ? '#0fd1fa' : '#acabae'}]}>*/}
                                    {/*<Item floatingLabel style={Styles.item} bordered>*/}
                                        {/*<Label style={[Styles.labelItem , {color:this.state.locationStatus === 1 ? '#0fd1fa': '#acabae'}]}>الموقع</Label>*/}
                                        {/*<Input onChangeText={(location) => this.setState({ location })} auto-capitalization={false} onBlur={() => this.unActiveInput('location')} onFocus={() => this.activeInput('location')} style={Styles.itemInput}/>*/}
                                    {/*</Item>*/}
                                    {/*<Image source={this.renderInputImage('location')} style={Styles.itemImage} resizeMode={'contain'}/>*/}
                                {/*</View>*/}
                                <View style={[Styles.inputParent , {borderColor: this.state.dateStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                    <Item floatingLabel style={Styles.item} bordered onPress={this.showDatePicker}>
                                        <Label style={[Styles.labelItem , {color:this.state.dateStatus === 1 ? '#0fd1fa': '#acabae', top:-13}]}>{ i18n.t('date') }</Label>
                                        <Input disabled value={this.state.date.toString()} auto-capitalization={false} onBlur={() => this.unActiveInput('date')} onFocus={() => this.activeInput('date')} style={Styles.itemInput}/>
                                    </Item>
                                    <Image source={this.renderInputImage('date')} style={Styles.itemImage} resizeMode={'contain'}/>
                                    <DateTimePicker
                                        isVisible={this.state.isDatePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDatePicker}
                                        mode={'date'}
                                    />
                                </View>
                                <View style={[Styles.inputParent , {borderColor: this.state.timeStatus === 1 ? '#0fd1fa' : '#acabae'}]}>
                                    <Item floatingLabel style={Styles.item} bordered onPress={this.showTimePicker}>
                                        <Label style={[Styles.labelItem , {color:this.state.timeStatus === 1 ? '#0fd1fa': '#acabae', top:-13}]}>{ i18n.t('time') }</Label>
                                        <Input disabled value={this.state.time.toString()} auto-capitalization={false} onBlur={() => this.unActiveInput('time')} onFocus={() => this.activeInput('time')} style={Styles.itemInput}/>
                                    </Item>
                                    <Image source={this.renderInputImage('time')} style={Styles.itemImage} resizeMode={'contain'}/>
                                    <DateTimePicker
                                        isVisible={this.state.isTimePickerVisible}
                                        onConfirm={this.handleTimePicked}
                                        onCancel={this.hideTimePicker}
                                        mode={'time'}
                                    />
                                </View>
                                <View style={Styles.sliderParent}>
                                    <Slider
                                        step={1000}
                                        maximumValue={2500}
                                        onValueChange={(value) => this.change(value)}
                                        value={this.state.value}
                                        thumbTintColor={'#000'}
                                        style={Styles.slider}
                                        maximumTrackTintColor={"#e51d6f"}
                                        minimumTrackTintColor={'#000'}
                                    />
                                    <View style={Styles.range}>
                                        <Text style={{ color: '#acabae' }}>500</Text>
                                        <Text style={{ color: '#acabae' , marginLeft:Platform.OS === 'ios' ?'57%' : '35%'}}>1500</Text>
                                        <Text style={{ color: '#acabae' }}>2500</Text>
                                    </View>
                                </View>
                            </Form>

                            <View style={Styles.btnParent} >
                                <TouchableOpacity onPress={() => this.toggleModal()} style={Styles.confirmBtn}>
                                    <Text style={{color:'#fff' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toggleModal()} style={Styles.cancelBtn}>
                                    <Text style={{color:'#acabae' , fontFamily: 'RegularFont' , fontSize:16}}>{ i18n.t('cancel') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

export default Category;