import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions , I18nManager , FlatList} from "react-native";
import { Container, Content, Button, Footer, Icon, Item , Input } from 'native-base'
import Modal from "react-native-modal";

import Styles from '../../assets/styles'

const height = Dimensions.get('window').height;
const tickets=[
    {id:1 , name:'حفلة عمر خيرت' , image:require('../../assets/images/pic_two.png') , date:'15 مايو'},
    {id:2 , name:'حفلة عمر خيرت' , image:require('../../assets/images/pic_three.png'), date:'15 مايو'},
    {id:1 , name:'حفلة عمر خيرت' , image:require('../../assets/images/pic_six.png'), date:'15 مايو'},
    {id:1 , name:'حفلة عمر خيرت' , image:require('../../assets/images/pic_two.png') , date:'15 مايو'},
    {id:2 , name:'حفلة عمر خيرت' , image:require('../../assets/images/pic_three.png'), date:'15 مايو'},
    {id:1 , name:'حفلة عمر خيرت' , image:require('../../assets/images/pic_six.png'), date:'15 مايو'},
]


class TicketModal extends Component {
    constructor(props){
        super(props);

        this.state={
            visibleModal:false,
            tickets
        }

        console.log(this.props)
    }


    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({visibleModal:nextProps.isModalVisible})
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('eventDetails', { id: item.id }, this.setState({visibleModal:this.state.isModalVisible}))}  style={[Styles.eventTouch , {height:110 , borderRadius:5}]}>
                <Image source={item.image} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:5}}/>
                <View style={[Styles.eventCont , {backgroundColor: '#00000060' , position:'absolute' , top:0 , height:'100%' , flexDirection:'column' , padding:10, borderRadius:5} ]}>
                    <View style={{flexDirection:'row' , justifyContent:'flex-end' , flex:1 , width:'100%'}}>
                        <View style={{backgroundColor:'#ffffffb3'
                            , padding:5 , width:35 , height:37 , borderRadius:5 }}>

                            <Text style={[Styles.eventName , {color:'#fff', fontSize:12
                                ,textAlign:'center' , lineHeight:14 , height:35}]}>{item.date}</Text>
                        </View>
                    </View>
                    <Text style={[Styles.eventName , {color:'#fff' , alignSelf:"flex-start"}]}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <Modal avoidKeyboard={true} coverScreen={false} style={{}} deviceHeight={height-140} isVisible={this.state.visibleModal} onBackdropPress={() => this.setState({ visibleModal: this.props.footer_ticketModal('home') })}>
                <View style={[Styles.searchModal , {height:height-200 , paddingHorizontal:10}]}>
                    <View style={Styles.viewLine}></View>
                    <View style={{flexDirection:'row' , width:'100%' }}>
                       <View>
                           <ScrollView style={{ marginRight:10 }}>
                               <TouchableOpacity>
                                    <Text style={[Styles.date , {color:'#fff' , backgroundColor:'#0fd1fa'}]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                               <TouchableOpacity>
                                    <Text style={[Styles.date]}>15 مايو</Text>
                               </TouchableOpacity>
                           </ScrollView>
                       </View>
                        <ScrollView style={{}}>
                            <FlatList
                                data={this.state.tickets}
                                renderItem={({item}) => this.renderItems(item)}
                                numColumns={1}
                                keyExtractor={this._keyExtractor}
                            />
                        </ScrollView>
                    </View>
                </View>
            </Modal>


        );
    }
}


export default TicketModal;