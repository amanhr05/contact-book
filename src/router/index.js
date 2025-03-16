import { createRouter, createWebHistory } from 'vue-router';
import ContactList from '@/views/ContactList.vue';
import ContactForm from '@/views/ContactForm.vue';
import ContactDetails from '@/views/ContactDetails.vue';

const routes = [
    { path: '/', component: ContactList },
    { path: '/add', component: ContactForm },
    { path: '/edit/:id', component: ContactForm },
    { path: '/contact/:id', component: ContactDetails }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
