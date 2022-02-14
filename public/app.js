Vue.use(VuePromiseBtn);
Vue.use(VueRouter);

const router = new VueRouter({
    routes : [
        { path: '/', component: httpVueLoader('/app/landing.vue'), beforeEnter: (to, from, next) => {
                next();
            }},
        { path: '/admin', component: httpVueLoader('/app/admin.vue'), name:'Admin' },
        { path: '/voting', component: httpVueLoader('/app/voting.vue'), name:'Voting' },
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