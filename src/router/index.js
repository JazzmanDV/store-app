import Vue from "vue";
import VueRouter from "vue-router";

import AboutUs from "../views/AboutUs.vue";
import Goods from "../views/Goods.vue";
import Cart from "../views/Cart.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    linkExactActiveClass: "link--active",
    routes: [
        {
            path: "/",
            component: AboutUs,
        },
        {
            path: "/goods",
            component: Goods,
        },
        {
            path: "/cart",
            component: Cart,
        },
    ],
});

export default router;
