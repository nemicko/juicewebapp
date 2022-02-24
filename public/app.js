Vue.use(VuePromiseBtn);
Vue.use(VueRouter);

const router = new VueRouter({
    routes : [
        { path: '/', component: httpVueLoader('/app/landing.vue'), name:'Landing',beforeEnter: (to, from, next) => {
                next();
            }},
        { path: '/admin', component: httpVueLoader('/app/admin.vue'), name:'Admin' },
        { path: '/voting', component: httpVueLoader('/app/voting.vue'), name:'Voting' },
        { path: '/vote/:id', component: httpVueLoader('/app/vote.vue'), name:'votingDetails' },
    ]
});

const app = new Vue({
    el: '#main',
    router,
    components: {},
    data() {
        return {}
    },
    methods: {}
});
