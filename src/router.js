import Vue from "vue";
import Router from "vue-router";

import store from "./store";

import "heyui/themes/index.less";
import HeyUI from "heyui";

Vue.use(Router);
Vue.use(HeyUI);

import Home from "./page/Home";
import Login from "./page/Login";

const Register = () => import("./page/Register");
const Confirm = () => import("./page/Confirm");
const UserApplication = () => import("./page/UserApplication");

const routes = {
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: { plain: true }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: { plain: true }
        },
        {
            path: "/confirm/:token",
            name: "confirm",
            component: Confirm,
            meta: { plain: true }
        },
        {
            path: "/applications",
            name: "application",
            component: UserApplication
        }
    ],
    mode: "history"
};

let router = new Router(routes);

router.beforeEach((to, from, next) => {
    if (to.meta.plain) next();
    else {
        if (!store.state.auth.authed) {
            HeyUI.$Message["error"]("请先登录！");
            next({
                path: `/login?redirectTo=${from.name}`
            });
        } else next();
    }
});

export default router;
