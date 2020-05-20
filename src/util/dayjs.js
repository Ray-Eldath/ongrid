import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import localizedFormat from "dayjs/plugin/localizedFormat";

export default {
    install(Vue, options) {
        dayjs.locale("zh-cn");
        dayjs.extend(localizedFormat);

        Vue.prototype.$dayjs = dayjs;
    }
};
