import I18n from 'ex-react-native-i18n';
import { AsyncStorage } from 'react-native'
import ar from './ar'
import en from './en'

I18n.fallbacks = true;

I18n.translations = {
    en,
    ar
};



I18n.locale = 'ar';

AsyncStorage.getItem('lang').then(lang => {
    console.log('i18n ...', lang);
    I18n.locale = lang;
});


export default I18n;