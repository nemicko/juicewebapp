Vue.use(VuePromiseBtn);
Vue.use(VueRouter);

const router = new VueRouter({
    routes : [
        { path: '/', component: httpVueLoader('/app/landing.vue'), beforeEnter: (to, from, next) => {
                next();
            }},
        { path: '/admin', component: httpVueLoader('/app/admin.vue') },
        { path: '/voting/:id', component: httpVueLoader('/app/voting.vue') },
    ]
});

const app = new Vue({
    el: '#main',
    router,
    components: {},
    data() {
        return {}
    },
    methods: {

    }
});
