import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import auth from "./auth";
import meta from "./meta";

export default new Vuex.Store({
    modules: {
        auth,
        meta
    },
    plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !== "production"
});
