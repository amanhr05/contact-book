import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import './style.css';

import {
    VContainer,
    VCard,
    VForm,
    VTextField,
    VBtn,
    VRow,
    VCol,
    VTable,
    VList,
    VIcon,
    VCardTitle,
    VListItem,
    VCardActions,
    VCardText,
    VDivider,
} from 'vuetify/components';


const vuetify = createVuetify({
    components: {
        VContainer,
        VCard,
        VForm,
        VTextField,
        VBtn,
        VRow,
        VCol,
        VTable,
        VList,
        VIcon,
        VCardTitle,
        VListItem,
        VCardActions,
        VCardText,
        VDivider
    }
});
createApp(App).use(router).use(vuetify).mount('#app');
