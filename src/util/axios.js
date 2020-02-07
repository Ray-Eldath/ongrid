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
        let s = response.config.success;
        if (typeof s === "function") s(response.data);
    },
    e => globalApiErrorHandler(e)
);

function globalApiErrorHandler(e) {
    let data = e.response.data;

    if (!data) heyui.$Message["error"]("Oops! 好像网络有问题？", 5000);
    else {
        if (e.status === 500)
            heyui.$Notice["error"]({
                title: "糟糕！发生了内部错误",
                content: `绝大多数情况下，这不是您的原因。请向您组织的 Offgrid 管理员报告此问题，这有助于我们改善用户体验。\n${data}`,
                timeout: 0
            });
        else {
            console.debug("Server response with: ");
            console.debug(data);

            heyui.$Message["error"](
                `Oops! 发生请求时错误：${errors[data.code]}<br/>（${
                    data.message
                }）`,
                7000
            );
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
