import axios from "axios";
import store from "../store";

import errors from "./ErrorCode";
import heyui from "heyui";

const api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000
});

api.interceptors.request.use(
    function(cfg) {
        store.commit("touchToken");
        const token = store.state.auth.authToken;

        if (token) cfg.headers.Authorization = `Bearer ${token}`;

        return cfg;
    },
    function(err) {
        return Promise.reject(err);
    }
);

api.interceptors.response.use(
    response => {
        let success = response.config.success;
        if (typeof success === "function") success(response.data);
    },
    e => globalApiErrorHandler(e)
);

function globalApiErrorHandler(e) {
    console.error(e);

    if (!e.response || !e.response.data)
        heyui.$Message["error"]("Oops! 好像网络有问题？", 5000);
    else {
        let data = e.response.data;

        if (e.status === 500)
            heyui.$Notice["error"]({
                title: "糟糕！发生了内部错误",
                content: `绝大多数情况下，这不是您的原因。请向您组织的 Offgrid 管理员报告此问题，这有助于我们改善用户体验。<br/> <code>${data}</code>`,
                timeout: 0
            });
        else {
            let failed = config.failed;
            if (typeof failed === "function") failed(data);

            let config = e.response.config;
            if (config.suppress) return;

            if (data.code === 302) state.commit("logout");
            let duration = config.duration;

            if (duration === undefined) duration = 7000;

            let error = errors[data.code];
            let diagnose =
                error === undefined
                    ? `<br/> ${data.message}`
                    : `${errors[data.code]}<br/>（${data.message}）`;

            heyui.$Message["error"](`Oops! 发生错误：${diagnose}`, duration);
        }
    }
}

export default {
    install(Vue, options) {
        Vue.prototype.$api = {
            get(...args) {
                return api.get(...args);
            },
            post(...args) {
                return api.post(...args);
            },
            put(...args) {
                return api.put(...args);
            },
            raw(...args) {
                return api(...args);
            }
        };
    }
};
