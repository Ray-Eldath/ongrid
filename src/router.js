import Vue from "vue";
import Router from "vue-router";

import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
dayjs.locale("zh-cn");

import "heyui/themes/index.less";
import HeyUI from "heyui";

Vue.use(Router);
Vue.use(HeyUI);

import Index from "./page/HelloWorld";
import Login from "./page/Login";

const router = {
    routes: [
        {
            path: "/",
            name: "Index",
            component: Index
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        }
    ],
    mode: "history"
};

export default new Router(router);
