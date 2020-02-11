import Vue from "vue";
import Router from "vue-router";

import "heyui/themes/index.less";
import HeyUI from "heyui";

Vue.use(Router);
Vue.use(HeyUI);

import Index from "./page/HelloWorld";
import Login from "./page/Login";

const Register = () => import("./page/Register");
const Confirm = () => import("./page/Confirm");

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
        },
        {
            path: "/confirm/:token",
            name: "Confirm",
            component: Confirm
        }
    ],
    mode: "history"
};

export default new Router(router);
