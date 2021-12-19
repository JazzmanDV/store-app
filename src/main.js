import Vue from "vue";

import router from "./router/router.js";

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router,
}).$mount("#app");
