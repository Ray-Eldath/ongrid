import Vue from "vue";
import App from "./App.vue";

import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
dayjs.locale("zh-cn");

import router from "./router";
import store from "./store";
import api from "./util/axios";

Vue.use(api);

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});
