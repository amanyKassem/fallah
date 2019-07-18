import {Dimensions , I18nManager} from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = ({
    transform:{
        transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]
    },
    //language
    imageBackgroundStyle: {
        width: null,
        height: null,
        flex: 1,
        alignItems: 'center',
    },
    logoStyle: {
        width: 130,
        height: 130,
        marginTop: (height*11)/100
    },
    langContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: (height*15)/100,
        alignItems: 'center'
    },
    langStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    // Login Screen Styles
    loginFormContainerStyle: {
        width: '100%',
        // height: (height*60)/100,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center'
    },
    itemView : {
        borderRadius: 35,
        borderWidth: 1,
        height: 50,
        padding: 5,
        flexDirection: 'row'
    },
    loginItem : {
        borderBottomWidth: 0,
        top: -20,
        marginTop: 0,
        position:'absolute',
        width:'88%',
        paddingHorizontal: 10
    },
    label:{
        top:6,
        backgroundColor: '#121320',
        alignSelf: 'flex-start',
        fontFamily: 'RegularFont',
        fontSize: 15
    },
    input:{
        width: 200,
        color: '#0fd1fa',
        textAlign:I18nManager.isRTL ?  'right':'left',
        fontSize: 15,
        top: 17,
        fontFamily: 'RegularFont',
    },
    img:{
        width: 25,
        height: 25,
        right: 15,
        top: 10,
        position: 'absolute',
        flex: 1
    },
    forgetVisitor:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 17,
        width: '100%',
        paddingHorizontal: 15
    },
    forget:{
        color: '#bbbcbd',
        fontSize: 16,
        fontFamily: 'RegularFont'
    },
    loginBtn:{
        borderRadius: 25,
        width: 130,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center' ,
        backgroundColor:'#0fd1fa'
    },
    btnTxt:{
        color:'#fff' ,
        fontSize:16,
        fontFamily: 'RegularFont',
        top:-4
    },
    registerBtn:{
        backgroundColor:'transparent' ,
        borderColor:'#0fd1fa' ,
        borderWidth:1,
        borderTopRightRadius:30 ,
        width:'40%' ,
        height:45 ,
        justifyContent:'center' ,
        alignItems:'center',
        borderLeftWidth:0,
        borderBottomWidth:0
    },
    registerTxt:{
        color:'#0fd1fa' ,
        fontFamily: 'RegularFont' ,
        fontSize:16
    },
    //drawer icon style
    draweIcon: {
        fontSize: 23,
        top:2,
        color: '#1da1f2'
    },
    //container
    container:{
        backgroundColor:'#121320'
    },
    //header
    header : {
        zIndex: 9999999,
        marginTop: 40,
        height: 50,
        backgroundColor: 'transparent',
        borderBottomWidth:0
    },
    headerView : {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    headerMenu:{
        width: 25,
        height: 25,
        top: 3
    },
    headerNoti:{
        width: 25,
        height: 25,
        alignSelf:'center'
    },
    //home
    categoryList: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        margin: 5 ,
        borderRadius:3
    },

    homeViewContainer: { flex: 1,
        width: '100%' ,
        borderRadius:3
    },
    homeTextCont: {
        width:'100%' ,
        height:40 ,
        backgroundColor: '#00000060' ,
        justifyContent:'center' ,
        alignItems:'center' ,
        position: 'absolute',
        zIndex:1,
        bottom:0
    },

    homeText: {
        color:'#bbbcbd' ,
        fontFamily: 'BoldFont' ,
        fontSize:15
    },
    viewLine:{
        width:55 ,
        alignSelf:'center',
        height:2 ,
        backgroundColor:'#e51d6f' ,
        position:'absolute' ,
        top:0,
        zIndex:10
    },
    flatImage: {
        width: '100%',
        height: 150 ,
        borderRadius:3
    },
    flatContainer:{
        flexDirection: 'row',
        justifyContent: 'center' ,
        marginBottom:30 ,
        marginTop:10,
        paddingLeft:15 ,
        paddingRight:15
    },

    //content
    homecontent:{
        zIndex: -99,
        marginTop: -90
    },
    //swiper
    doteStyle:{
        backgroundColor: '#121320',
        borderRadius: 50,
        left: 120,
        bottom: -10
    },
    activeDot:{
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#0fd1fa',
        backgroundColor: 'transparent',
        width: 12,
        height: 12,
        left: 120,
        bottom: -10
    },
    swiper:{
        width: '100%',
        height: 200 ,
        borderRadius:25 ,
        backgroundColor: 'transparent'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderBottomRightRadius:I18nManager.isRTL ?45:0,
        borderBottomLeftRadius:I18nManager.isRTL ?0:45,
        overflow: 'hidden'
    },
    swiperLine : {
        backgroundColor: '#000',
        opacity: 0.2,
        width: '100%',
        height: 300,
        position: 'absolute',
        zIndex: 999
    },
    swiperimage : {
        width: '100%',
        height: 200,
        position: 'absolute',
        zIndex: 1,
        borderBottomLeftRadius:45
    },
    //footer
    footer:{
        backgroundColor: 'transparent' ,
        width: width+7 ,
        left :-3.5,
        borderTopWidth:0
    },
    footerTab:{
        backgroundColor: '#121320',
        borderWidth:2,
        borderColor:'#2b2b2b'  ,
        width: width ,
        height: 130,
        flexDirection: 'row',
        justifyContent: 'space-between' ,
        paddingBottom:70  ,
        borderTopRightRadius:25  ,
        borderTopLeftRadius:25,
        overflow:'hidden'
    },
    footerActive: {
        width:50 ,
        alignSelf:'center',
        height:2 ,
        backgroundColor:'#0fd1fa' ,
        position:'absolute' ,
        top:-1,
        zIndex:10
    },
    footerImg : {
        width: 24,
        height: 24
    },
    //modal
    searchModal:{
        padding:25,
        width: '110%',
        position: 'absolute',
        bottom: 35,
        backgroundColor: '#fff',
        height: 300,
        alignSelf: 'center' ,
        borderTopRightRadius:25  ,
        borderTopLeftRadius:25
    },
    filterModal:{
        width: '110%',
        position: 'absolute',
        bottom: -18,
        backgroundColor: '#fff',
        alignSelf: 'center' ,
        borderTopRightRadius:25  ,
        borderTopLeftRadius:25
    },
    filterPayModal:{
        width: '110%',
        borderColor:'#eee',
        borderWidth:2,
        backgroundColor: '#fff',
        alignSelf: 'center' ,
        borderTopRightRadius:25  ,
        borderTopLeftRadius:25,
        borderBottomWidth:0,
        padding:20,
        bottom:-18
    },
    inputView : {
        borderRadius: 35,
        borderWidth: 1,
        borderColor: '#acabae',
        height: 45,
        padding: 5,
        flexDirection: 'row'
    },
    inputItem :{
        borderBottomWidth: 0,
        width:'100%',
        paddingHorizontal: 10
    },
    modalInput:{
        alignSelf: 'center',
        paddingLeft: 35,
        backgroundColor: 'transparent',
        color: '#6d6c72',
        fontFamily: 'RegularFont',
        paddingBottom:5,
        textAlign: 'right'
    },
    searchImg : {
        width: 24,
        height: 24,
        left: 15,
        top: 9,
        position: 'absolute',
        flex: 1
    },
    modalLine : {
        backgroundColor :'#eee',
        width:'100%',
        height:1,
        marginVertical : 20
    },
    eventTouch:{
        flex:1,
        marginBottom: 15,
        width:'100%',
        flexDirection:'row',
        justifyContent : 'flex-start',
    },
    eventCont : {
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent : 'flex-start',

    },
    eventImg: {
        width: 35 ,
        height: 35,
        marginRight:15
    },
    eventName : {
        color: '#6d6c72',
        fontFamily: 'RegularFont',

    },
    date:{
        fontFamily: 'RegularFont',
        color:'#6d6c72' ,
        backgroundColor:'#ffffffb3' ,
        fontSize:12,
        padding:5 ,
        width:35 ,
        height:37 ,
        borderRadius:5 ,
        textAlign:'center' ,
        lineHeight:14 ,
        marginBottom:10
    },
    // category page

    altHeaader : {
        height: 80,
        backgroundColor: '#121320',
        paddingLeft: 0,
        paddingRight: 15,
        borderBottomWidth:0,
    },
    backStyle: {
        width: 25,
        height: 25
    },
    filterStyle: {
        width: 25,
        height: 25,
        top: 3
    },
    rightHeader : {
        flex: 0,
        alignSelf: 'flex-start',
        top: 30
    },
    bodyHeadrt : {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'flex-start',
        top: 30
    },
    leftHeader : {
        flex: 0,
        alignSelf: 'flex-start',
        top: 30
    },
    parentView : {
        flex:1,
        backgroundColor:'#fff',
        width:'100%',
        height:height,
        borderTopRightRadius:30  ,
        borderTopLeftRadius:30,
        padding:10
    },
    headphone: {
        width:70,
        height:70,
        alignSelf:'center',
        marginBottom:20
    },
    eventContent: {
        borderColor:'#bbbcbd',
        borderWidth:1,
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent : 'flex-start',
        borderRadius:3
    },
    categoryImg : {
        width:130,
        height:'100%',
        borderRadius:3
    },
    eventRight : {
        flex:0,
        height:'100%'
    },
    eventLeft : {
        flex:1,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        padding :10,
        paddingTop :0
    },
    datePrice:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
        width:'100%'
    },
    eventText:{
        color:'#bbbcbd',
        fontSize:14,
        fontFamily: 'RegularFont'
    },
    eventboldName: {
        fontFamily: 'BoldFont',
        color:'#6d6c72'
    },
    imgText : {
        flexDirection:'row'
    },
    leftImg : {
        width:15,
        height : 15,
        top:6,
        marginRight:3
    },
    itemPicker : {
        borderWidth: 1,
        paddingRight: 0,
        paddingLeft: 10,
        borderColor: '#acabae',
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        width: '100%',
        paddingHorizontal: 5,
        padding: 5,
    },
    picker:{
        width: undefined,
        backgroundColor: 'transparent',
        color: "#c5c5c5" ,
        fontFamily: 'RegularFont',
        fontWeight: 'normal',
    },
    inputParent:{
        borderRadius: 35,
        borderWidth: 1,
        height: 50,
        padding: 5,
        flexDirection: 'row' ,
        marginTop:29
    },
    item:{
        borderBottomWidth: 0,
        // top: -18,
        marginTop: 0,
        position: 'absolute',
        width: '88%',
        paddingHorizontal: 10,
    },
    labelItem:{
        top: -14,
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        fontFamily: 'RegularFont',
        fontSize: 13
    },
    itemInput:{
        width: 200,
        color: '#acabae',
        textAlign: 'right',
        fontSize: 15,
        top: 0,
        fontFamily: 'RegularFont',
    },
    itemImage:{
        width: 20,
        height: 20,
        right: 15,
        top: 14,
        position: 'absolute',
        flex: 1
    },
    pickerImg:{
        width: 20,
        height: 20,
        right:I18nManager.isRTL ? 10 :'auto',
        left:I18nManager.isRTL ? 'auto' :10,
    },
    //event details page
    eventdoteStyle:{
        backgroundColor: '#fff',
        borderRadius: 50,
        left: 0,
        bottom: 60
    },
    eventactiveDot:{
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#0fd1fa',
        backgroundColor: '#fff',
        width: 12,
        height: 12,
        left: 0,
        bottom: 60
    },
    eventswiper:{
        width: '100%',
        height: 300 ,
        backgroundColor: 'transparent'
    },
    swiperimageEvent : {
        width: '100%',
        height: 430,
        position: 'absolute',
        zIndex: 1,
    },
    parentViewEvent : {
        flex:1,
        backgroundColor:'#fff',
        width:'100%',
        height:height,
        borderTopRightRadius:75  ,
        padding:10
    },
    sliderParent:{
        width: '100%',
        marginTop: 20
    },
    slider:{
        width: (width * 85) / 100  ,
        height:35 ,
        // borderWidth:1 ,
        borderColor:'#acabae',
        borderWidth:0
    },
    range:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        width: (width * 85) / 100,
        alignItems: 'center'
    },
    btnParent:{
        flexDirection:'row' ,
        marginTop: 20,
        height:45
    },
    confirmBtn:{
        backgroundColor:'#0fd1fa' ,
        borderTopRightRadius:30 ,
        width:'50%' ,
        height:45 ,
        justifyContent:'center' ,
        alignItems:'center'
    },
    cancelBtn:{
        backgroundColor:'#fff' ,
        height:45 ,
        justifyContent:'center' ,
        alignItems:'center' ,
        width:'50%',
        alignSelf:'flex-end'
    },
    greenCircle:{
        borderRadius:50 ,
        backgroundColor:"#a6d958" ,
        width:10,
        height:10,
        top:13 ,
        marginHorizontal:5
    },
    blackCircle:{
        borderRadius:50 ,
        backgroundColor:"#6d6c72" ,
        width:7,
        height:7,
        top:13 ,
        marginHorizontal:5
    },
    QR :{
        width:80 ,
        height:80 ,
        position:'absolute' ,
        bottom:0 ,
        left:10
    },
    dateHours:{
        flexDirection:'row' ,
        position:'absolute' ,
        bottom :110 ,
        left:10
    },
    dateView:{
        width:60,
        height:60 ,
        justifyContent:'center' ,
        alignItems:'center' ,
        borderRadius:5
    },
    dateText:{
        color:'#fff' ,
        fontFamily: 'RegularFont',
        width:40,
        textAlign:'center'
    },
    rightShape:{
        width: 15,
        height: 15 ,
        right:10 ,
        top:10
    },
    settings:{
        marginBottom:10 ,
        flexDirection:'row' ,
        height:45 ,
        alignItems:'center' ,
        width:'90%' ,
        alignSelf:'center'
    },
    setImg:{
        width:15 ,
        height:15 ,
        marginRight:10,
        top:11
    },
    setText:{
        fontFamily:'RegularFont' ,
        fontSize:17 ,
        color:'#6d6c72'
    },
    controlBar: {
        position: 'absolute',
        bottom: '40%',
        left: 0,
        right: 0,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "transparent",
    }

})

export default styles