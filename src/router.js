import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Index from "./page/HelloWorld";

const router = {
    routes: [
        {
            path: "/",
            name: "Index",
            component: Index
        }
    ]
};

export default new Router(router);
