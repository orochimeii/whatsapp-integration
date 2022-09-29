import { createRouter, createWebHistory } from 'vue-router';
import Form from '/src/components/Form.vue';
import Contacts from '/src/components/Contacts.vue';

const routes = [
    {
        path: '/',
        name: 'contacts',
        component: Contacts,
    },
    {
        path: '/message',
        name: 'message',
        component: Form,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;