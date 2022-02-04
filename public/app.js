Vue.use(VuePromiseBtn);
Vue.use(VueRouter);

const router = new VueRouter({
    routes : [
        { path: '/', component: httpVueLoader('/app/landing.vue'), beforeEnter: (to, from, next) => {
                next();
            }},
        { path: '/admin', component: httpVueLoader('/app/admin.vue') },
        { path: '/voting', component: httpVueLoader('/app/voting.vue') },
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
        async request(jurl, params) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authentication": localStorage.getItem("token")
                },
                body: JSON.stringify(params)
            };
            const response = await fetch(window.location.protocol + '/gateway/' + jurl, requestOptions);
            return await response.json();
        },
        authenticate() {

        }
    }
});
