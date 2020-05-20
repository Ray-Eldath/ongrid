import Vue from "vue";
import Router from "vue-router";

import store from "./store";

import "./var.less";
import HeyUI from "heyui";
HeyUI.config("modal.hasDivider", true);

import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/google.css";
import "tippy.js/themes/translucent.css";
import VueTippy, { TippyComponent } from "vue-tippy";

Vue.component("tippy", TippyComponent);
Vue.use(VueTippy);
Vue.use(Router);
Vue.use(HeyUI);

import Home from "./page/Home";
import Login from "./page/Login";



const Register = () => import("./page/Register");
const Confirm = () => import("./page/Confirm");
const User = () => import("./page/User");
const UserApplication = () => import("./page/UserApplication");
const Graph = () => import("./page/Graph");

const OAuthLogin = () => import("./page/OAuthLogin");
const OAuthConsent = () => import("./page/OAuthConsent");


const routes = {
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: { title: "主页" }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: { plain: true, title: "登录" }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: { plain: true, title: "注册" }
        },
        {
            path: "/confirm/:token",
            name: "confirm",
            component: Confirm,
            meta: { plain: true, title: "确认您的邮箱" }
        },
        {
            path: "/users",
            name: "user",
            component: User,
            meta: { title: "用户管理" }
        },
        {
            path: "/applications",
            name: "application",
            component: UserApplication,
            meta: { title: "用户申请" }
        },
        {
            path: "/oauth/login",
            component: OAuthLogin,
            meta: { plain: true, title: "开放平台：使用您的 Offgrid 账户登录" }
        },
        {
            path: "/oauth/consent",
            component: OAuthConsent,
            meta: { plain: true, title: "开放平台：授权第三方应用" }
        },
        {
            path:"/graph",
            name: "graph",
            component:Graph,
            meta: { title: "运行节点管理" }
        }
    ],
    mode: "history"
};

let router = new Router(routes);

router.beforeEach((to, from, next) => {
    if (to.meta.title) document.title = "Offgrid - " + to.meta.title;
    if (to.meta.plain) next();
    else {
        next();
        if (!store.state.auth.authed) {
            HeyUI.$Message["error"]("请先登录！");
            let path = "/login";
            if (!to.meta.plain) path += `?back=true`;
            next(path);
        } else next();
    }
});

export default router;
