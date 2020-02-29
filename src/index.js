import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import api from "./util/axios";
import dayjs from "./util/dayjs";

Vue.use(api);
Vue.use(dayjs);

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});
