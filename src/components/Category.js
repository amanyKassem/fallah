import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions , I18nManager , FlatList , Slider , Platform} from "react-native";
import { Container, Content, Button, Picker, Icon, Header , Left, Right, Body , Form, Item, Input, Label  } from 'native-base'
import Modal from "react-native-modal";
import Styles from '../../assets/styles';
import DateTimePicker from "react-native-modal-datetime-picker";
import i18n from "../../locale/i18n";
import axios from "axios";
import CONST from "../consts";
import {NavigationEvents} from "react-navigation";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


class Category extends Component {
    constructor(props){
        super(props);

        this.state={
            events:[],
            isModalVisible: false,
            countries: [],
            selectedCity: null,
            selectedOrganizations: undefined,
            location: '',
            date: '',
            time: '',
            locationStatus:0,
            dateStatus:0,
            timeStatus:0,
            value: null,
            max: null,
            step: null,
            min: null,
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            category:[],
            status:null,
            cities:[],
            organizations:[]
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount(){
        const categoryId = this.props.navigation.state.params.id;
        axios({
            url: CONST.url + 'category_events',
            method: 'POST',
            data: {category_id: categoryId , lang: this.props.lang}
        }).then(response => {
            this.setState({
                category: response.data.data.category,
                events: response.data.data.events,
                status: response.data.status,
                value: response.data.data.min,
                min: response.data.data.min,
                max: response.data.data.max,
                step: response.data.data.step,
            })
        })

        axios.post(CONST.url + 'cities', { lang: this.props.lang }).then(response => {
            this.setState({ cities: response.data.data , status: response.data.status,})
        });
        axios.post(CONST.url + 'organizations', { lang: this.props.lang }).then(response => {
            this.setState({ organizations: response.data.data , status: response.data.status, })
        });
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        let formatted_date = date.getFullYear() + "-" + ("0"+(date.getMonth() + 1)).slice(-2) + "-" + ("0" +date.getDate()).slice(-2);
        this.setState({ date : formatted_date });

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

    filter = () => {
        this.setState({ status: null });
        const categoryId = this.props.navigation.state.params.id;
        axios({
            url: CONST.url + 'events_filter',
            method: 'POST',
            data: {category_id: categoryId , lang: this.props.lang ,city_id:this.state.selectedCity , org_id : this.state.selectedOrganizations , date: this.state.date , price : this.state.value}
        }).then(response => {
            this.setState({
                events: response.data.data,
                status: response.data.status,
            })
        })
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

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
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height + 100, alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
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
        const categoryName = this.props.navigation.state.params.name;
        return (

            <Container style={Styles.container}>
                <Header style={[Styles.altHeaader , {paddingTop:Platform.OS === 'ios' ?0: 'auto' , paddingBottom: Platform.OS === 'ios' ?25:0} ]} noShadow>
                    <Right style={Styles.rightHeader}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/white_right.png')} style={Styles.backStyle} resizeMode={'contain'} />
                        </Button>
                    </Right>
                    <Body style={Styles.bodyHeadrt}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'RegularFont' }}>{ categoryName }</Text>
                    </Body>
                    <Left style={Styles.leftHeader}>
                        <Button transparent onPress={this.toggleModal}>
                            <Image source={require('../../assets/images/filter.png')} style={Styles.filterStyle} resizeMode={'contain'} />
                        </Button>
                    </Left>
                </Header>
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Content style={Styles.content}>
                    { this.renderLoader() }
                    <View style={Styles.parentView}>
                        <View style={Styles.viewLine}></View>
                        <Image source={{ uri: this.state.category.icon }}  style={Styles.headphone} resizeMode={'contain'} />
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
                                            placeholder={i18n.t('city')}
                                            placeholderIconColor="#acabae"
                                            textStyle={{ color: "#acabae" , right:Platform.OS === 'ios' ?width-115:0 , fontSize:13 }}
                                            itemTextStyle={{ color: '#acabae' }}
                                            selectedValue={this.state.selectedCity}
                                            onValueChange={(value) => this.setState({ selectedCity: value })}
                                        >
                                            <Picker.Item label={ i18n.t('city') } value={null} />
                                            {
                                                this.state.cities.map((city, i) => (
                                                    <Picker.Item key={i} label={city.name} value={city.id} />
                                                ))
                                            }
                                        </Picker>
                                        <Image source={require('../../assets/images/gray_dropdown.png')} style={[Styles.pickerImg , {right:Platform.OS === 'ios' ?50:10}]} resizeMode={'contain'} />
                                    </Item>
                                </View>
                                <View>
                                    <Item style={Styles.itemPicker} regular >
                                        <Picker
                                            mode="dropdown"
                                            // iosIcon={<Icon name="arrow-down" />}
                                            style={Styles.picker}
                                            placeholder={i18n.t('organizations')}
                                            placeholderStyle={{ color: "#acabae" }}
                                            placeholderIconColor="#acabae"
                                            textStyle={{ color: "#acabae" , right:Platform.OS === 'ios' ?width-115:0 , fontSize:13 }}
                                            itemTextStyle={{ color: '#acabae' }}
                                            selectedValue={this.state.selectedOrganizations}
                                            onValueChange={(value) => this.setState({ selectedOrganizations: value })}
                                        >
                                            <Picker.Item label={ i18n.t('organizations') } value={null} />
                                            {
                                                this.state.organizations.map((org, i) => (
                                                    <Picker.Item key={i} label={org.name} value={org.id} />
                                                ))
                                            }
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
                                {/*<View style={[Styles.inputParent , {borderColor: this.state.timeStatus === 1 ? '#0fd1fa' : '#acabae'}]}>*/}
                                    {/*<Item floatingLabel style={Styles.item} bordered onPress={this.showTimePicker}>*/}
                                        {/*<Label style={[Styles.labelItem , {color:this.state.timeStatus === 1 ? '#0fd1fa': '#acabae', top:-13}]}>{ i18n.t('time') }</Label>*/}
                                        {/*<Input disabled value={this.state.time.toString()} auto-capitalization={false} onBlur={() => this.unActiveInput('time')} onFocus={() => this.activeInput('time')} style={Styles.itemInput}/>*/}
                                    {/*</Item>*/}
                                    {/*<Image source={this.renderInputImage('time')} style={Styles.itemImage} resizeMode={'contain'}/>*/}
                                    {/*<DateTimePicker*/}
                                        {/*isVisible={this.state.isTimePickerVisible}*/}
                                        {/*onConfirm={this.handleTimePicked}*/}
                                        {/*onCancel={this.hideTimePicker}*/}
                                        {/*mode={'time'}*/}
                                    {/*/>*/}
                                {/*</View>*/}
                                <View style={Styles.sliderParent}>
                                    <Slider
                                        step={this.state.step}
                                        maximumValue={this.state.max}
                                        onValueChange={(value) => this.change(value)}
                                        // value={this.state.value}
                                        thumbTintColor={'#000'}
                                        style={Styles.slider}
                                        maximumTrackTintColor={"#e51d6f"}
                                        minimumTrackTintColor={'#000'}
                                    />
                                    <View style={Styles.range}>
                                        <Text style={{ color: '#acabae' }}>{this.state.max}</Text>
                                        <Text style={{ color: '#acabae' }}>{this.state.value}</Text>
                                        <Text style={{ color: '#acabae' }}>{this.state.min}</Text>
                                    </View>
                                </View>
                            </Form>

                            <View style={Styles.btnParent} >
                                <TouchableOpacity onPress={() => this.filter()} style={Styles.confirmBtn}>
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

const mapStateToProps = ({ lang }) => {
    return {
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {})(Category);