import React from "react";
import { createStackNavigator, createAppContainer , createDrawerNavigator } from "react-navigation";
import {I18nManager} from "react-native";

import Home from "../components/Home";
import Category from "../components/Category";
import EventDetails from "../components/EventDetails";
import BankPay from "../components/BankPay";
import DrawerCustomization from "./DrawerCustomization";
import ConfirmPayment from "../components/ConfirmPayment";
import GetTicket from "../components/GetTicket";
import ConfirmTicket from "../components/ConfirmTicket";
import Cash from "../components/Cash";
import Language from "../components/Language";
import Login from "../components/Login";
import ForgetPassword from "../components/ForgetPassword";
import Register from "../components/Register";
import Verify from "../components/Verify";
import RePassword from "../components/RePassword";
import AboutApp from "../components/AboutApp";
import Conditions from "../components/Conditions";
import ContactUs from "../components/ContactUs";
import Settings from "../components/Settings";
import ShareApp from "../components/ShareApp";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";
import Intro from "../components/Intro";
import SuggestedEvent from "../components/SuggestedEvent";
import CommonEvent from "../components/CommonEvent";
import SavedEvent from "../components/SavedEvent";
import RNParallax from "../components/RNParallax";

const drawerCust = (props) => (<DrawerCustomization {...props} />)
const DrawerNavigator = createDrawerNavigator({
    home:Home,
    aboutApp:AboutApp,
    shareApp:ShareApp,
    conditions:Conditions,
    contactUs:ContactUs,
    settings:Settings,
    bankPay:BankPay,
    cash:Cash,
    category:Category,
    confirmPayment:ConfirmPayment,
    confirmTicket:ConfirmTicket,
    editProfile:EditProfile,
    eventDetails:EventDetails,
    getTicket:GetTicket,
    profile:Profile,
    suggestedEvent:SuggestedEvent,
    commonEvent:CommonEvent,
    savedEvent:SavedEvent,

},{
    initialRouteName:'home',
    drawerPosition:I18nManager.isRTL ?'right' : 'left',
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    gesturesEnabled:false,
    drawerToggleRoute:'DrawerToggle',
    contentComponent:drawerCust
})
const AppNavigator = createStackNavigator({


    // RNParallax: {
    //     screen: RNParallax,
    //     navigationOptions: {
    //         header: null
    //     }
    // },

    // language: {
    //     screen: Language,
    //     navigationOptions: {
    //         header: null
    //     }
    // },

    drawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    editProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null
        }
    },
    suggestedEvent: {
        screen: SuggestedEvent,
        navigationOptions: {
            header: null
        }
    },
    savedEvent: {
        screen: SavedEvent,
        navigationOptions: {
            header: null
        }
    },
    commonEvent: {
        screen: CommonEvent,
        navigationOptions: {
            header: null
        }
    },

    intro: {
        screen: Intro,
        navigationOptions: {
            header: null
        }
    },



    profile: {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    },
    contactUs: {
        screen: ContactUs,
        navigationOptions: {
            header: null
        }
    },
    settings: {
        screen: Settings,
        navigationOptions: {
            header: null
        }
    },

    conditions: {
        screen: Conditions,
        navigationOptions: {
            header: null
        }
    },
    register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    }
    ,
    rePassword: {
        screen: RePassword,
        navigationOptions: {
            header: null
        }
    }
    ,
    verify: {
        screen: Verify,
        navigationOptions: {
            header: null
        }
    }
    ,
    login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    forgetPassword: {
        screen: ForgetPassword,
        navigationOptions: {
            header: null
        }
    },

    cash: {
        screen: Cash,
        navigationOptions: {
            header: null
        }
    },
    eventDetails: {
        screen: EventDetails,
        navigationOptions: {
            header: null
        }
    },
    confirmTicket: {
        screen: ConfirmTicket,
        navigationOptions: {
            header: null
        }
    },
    getTicket: {
        screen: GetTicket,
        navigationOptions: {
            header: null
        }
    },
    confirmPayment: {
        screen: ConfirmPayment,
        navigationOptions: {
            header: null
        }
    },

    bankPay: {
        screen: BankPay,
        navigationOptions: {
            header: null
        }
    },

    category: {
        screen: Category,
        navigationOptions: {
            header: null
        }
    },
    aboutApp: {
        screen: AboutApp,
        navigationOptions: {
            header: null
        }
    },
});

export default createAppContainer(AppNavigator);