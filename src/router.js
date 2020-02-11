import Vue from "vue";
import Router from "vue-router";

import "heyui/themes/index.less";
import HeyUI from "heyui";

Vue.use(Router);
Vue.use(HeyUI);

import Index from "./page/HelloWorld";
import Login from "./page/Login";

const Register = () => import("./page/Register");

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
        },
        {
            path: "/register",
            name: "Register",
            component: Register
        }
    ],
    mode: "history"
};

export default new Router(router);
